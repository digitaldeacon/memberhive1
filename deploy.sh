git add dist/ -f
git commit -am "deploy"
git push memberhive@148.251.133.116:hives/data/git :master # delete master
git push memberhive@148.251.133.116:hives/data/git master # now push everything
