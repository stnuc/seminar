npm run build
git checkout -t origin/page
git checkout page
git pull origin page
Copy-Item -Path ./build/* -Destination ./ -recurse -Force
git add .
git commit -m "page"
git push -u origin page
git checkout main
