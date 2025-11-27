@echo off
echo ========================================
echo    GitHub Repository Setup
echo ========================================
echo.

set /p username="Enter your GitHub username: "
set /p reponame="Enter repository name (default: meltdown-report): "

if "%reponame%"=="" set reponame=meltdown-report

echo.
echo Initializing Git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: Meltdown Attack Report webpage"

echo.
echo Adding remote repository...
git remote add origin https://github.com/%username%/%reponame%.git

echo.
echo Setting main branch...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo    Repository setup complete!
echo ========================================
echo.
echo Your repository: https://github.com/%username%/%reponame%
echo.
echo Next steps:
echo 1. Install gh-pages: npm install -D gh-pages
echo 2. Deploy to GitHub Pages: npm run deploy
echo 3. Enable GitHub Pages in repository settings
echo.
pause
