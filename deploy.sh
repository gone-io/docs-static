#!/bin/bash
git add . && \
git commit -am update && \
git push origin main && \
yarn build && \
git checkout gh-pages && \
rm -rf assets en zh 404.html && \
cp -R docs/.vuepress/dist/* ./  && \
git add . && \
git commit -am update && \
git push origin gh-pages && \
git checkout main