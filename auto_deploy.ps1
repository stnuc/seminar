npm run build
Copy-Item -Path ./build, .git -Destination C:\autodeploy -recurse -Force
cd C:\autodeploy
git checkout -b page
git checkout page
git add .
git commit -m "page"
git push -u origin page --force