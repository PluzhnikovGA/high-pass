#!/usr/bin/env sh

set -e

gulp build

cd dist

git init
git add .
git commit -m 'deploy'

git push -f https://github.com/PluzhnikovGA/high-pass.git master:gh-pages

cd -
