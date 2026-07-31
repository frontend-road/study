#!/usr/bin/env sh

# VuePress 部署: https://vuepress.vuejs.org/zh/guide/deployment.html

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# git init 后没有显式创建分支，Git 会自动使用默认分支名（通常为 master 或 main，取决于 Git 配置）
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages # git push -f [remote] [local-branch]:[remote-branch]
# git push -f git@github.com:frontend-road/study.git master:gh-pages
# git push -f git@github.com:frontend-road/study.git main:gh-pages

# 如果实际默认分支是 master，这条命令会失败，因为本地不存在 main 分支。更健壮的写法是使用 HEAD:gh-pages，直接推送当前所在提交。
git push -f git@github.com:frontend-road/study.git HEAD:gh-pages

cd -