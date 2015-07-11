rsync -az --force --delete --progress -e ssh ./dist/ mh-deploy@148.251.133.116:data/dist/
git push mh-deploy@148.251.133.116:data/git master
