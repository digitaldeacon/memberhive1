rsync -az --force --delete --progress -e ssh ./dist/ memberhive@148.251.133.116:hives/data/dist/
git push memberhive@148.251.133.116:hives/data/git :master # first delete master branch
git push memberhive@148.251.133.116:hives/data/git master # now push everything
