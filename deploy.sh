git config --global user.email "travis@memberhive.com"
git config --global user.name "Travis Build"
git fetch origin
ls dist/
git add dist/* -f
#sl-build -g --onto master
git commit -am "build: $TRAVIS_BUILD_NUMBER of $TRAVIS_COMMIT"
git push memberhive@justus.ebtc-online.org:hives/data/git $(git log -1 --format="%H"):master -f # now push everything
