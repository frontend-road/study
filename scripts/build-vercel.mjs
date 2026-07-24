import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cp, mkdir, rm } from 'node:fs/promises'
import { spawn } from 'node:child_process'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePublic = path.join(projectRoot, 'docs', '.vuepress', 'public')
const vercelPublic = path.join(projectRoot, 'docs', '.vuepress', 'public-vercel')
const columnIds = (process.env.VERCEL_COLUMN_IDS || '100772701')
  .split(',')
  .map(id => id.trim())
  .filter(Boolean)

await rm(vercelPublic, { recursive: true, force: true })
await mkdir(vercelPublic, { recursive: true })

await cp(
  path.join(sourcePublic, 'fonts'),
  path.join(vercelPublic, 'fonts'),
  { recursive: true },
)

await mkdir(path.join(vercelPublic, 'geektime', 'column'), { recursive: true })
await cp(
  path.join(sourcePublic, 'geektime', 'column', 'columns.json'),
  path.join(vercelPublic, 'geektime', 'column', 'columns.json'),
)

for (const columnId of columnIds) {
  await cp(
    path.join(sourcePublic, 'geektime', 'column', 'list', columnId),
    path.join(vercelPublic, 'geektime', 'column', 'list', columnId),
    { recursive: true },
  )
}

await cp(
  path.join(sourcePublic, 'geektime', 'video'),
  path.join(vercelPublic, 'geektime', 'video'),
  { recursive: true },
)

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const build = spawn(npmCommand, ['run', 'docs:build'], {
  cwd: projectRoot,
  env: { ...process.env, VERCEL: '1' },
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

await new Promise((resolve, reject) => {
  build.once('error', reject)
  build.once('exit', code => {
    if (code === 0) {
      resolve()
    } else {
      reject(new Error(`VuePress build exited with code ${code ?? 'unknown'}`))
    }
  })
})
