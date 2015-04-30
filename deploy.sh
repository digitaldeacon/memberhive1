rsync -az --force --delete --progress -e ssh ./dist/ mh_deploy@148.251.133.116:demo.memberhive.com/
rsync -az --force --delete --progress -e ssh ./jspm_packages mh_deploy@148.251.133.116:demo.memberhive.com/
