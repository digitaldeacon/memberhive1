git config --global user.email "travis@memberhive.com"
git config --global user.name "Travis Build"
ls dist/
git add dist/* -f
git add bower_components/* -f
git add node_modules/* -f

git commit -am "build: $TRAVIS_BUILD_NUMBER of $TRAVIS_COMMIT"
git push memberhive@148.251.133.116:hives/data/git $(git log -1 --format="%H"):master -f # now push everything
