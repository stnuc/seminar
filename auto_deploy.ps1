Set-PSDebug -Off;

$PROGRAMNAME = "Auto Deploy"
$TargetBranch = "page"

$FromRemote = $false
$FromLocal = $false
$FromOrphan = $false

$ErrorActionPreference = "Stop"

& cmd /c 'npm run build'
if ($LASTEXITCODE -ne 0) {
    "${PROGRAMNAME}: npm run build failed, Error code: ${LASTEXITCODE}"
    exit $LASTEXITCODE
}

& cmd /c "git checkout -t origin/${TargetBranch}"
if ($LASTEXITCODE -eq 0) {
    "${PROGRAMNAME}: pull branch from origin/${TargetBranch} success"
    & cmd /c "git pull origin ${TargetBranch}"
    Copy-Item -Path ./build/* -Destination ./ -recurse -Force
    & cmd /c "git add ."
    & cmd /c "git commit -m '${TargetBranch}'"
    & cmd /c "git push origin ${TargetBranch}"
    & cmd /c "git checkout main"
    $FromRemote = $true
}
else {
    "${PROGRAMNAME}: pull branch from origin/${TargetBranch} failed, ErrorCode: ${LASTEXITCODE}"
}

& cmd /c "git checkout ${TargetBranch}"
if ($LASTEXITCODE -eq 0) {
    "${PROGRAMNAME}: checkout to ${TargetBranch} branch success"
    & cmd /c "git pull origin ${TargetBranch}"
    Copy-Item -Path ./build/* -Destination ./ -recurse -Force
    & cmd /c "git add ."
    & cmd /c "git commit -m '${TargetBranch}'"
    & cmd /c "git push origin -u ${TargetBranch}"
    & cmd /c "git checkout main"
    $FromLocal = $true
}
else {
    "${PROGRAMNAME}: checkout to ${TargetBranch} branch failed, ErrorCode: ${LASTEXITCODE}"
}

& cmd /c "git checkout --orphan ${TargetBranch}"
if ($LASTEXITCODE -eq 0) {
    "${PROGRAMNAME}: create orphan branch success"
    & cmd /c "git rm --cached -r ."
    Remove-Item -recurse ./* -exclude build, .git/, node_modules, .gitignore
    Copy-Item -Path ./build/* -Destination ./ -recurse -Force
    & cmd /c "git add ."
    & cmd /c "git commit -m '${TargetBranch}'"
    & cmd /c "git push origin -u ${TargetBranch}"
    & cmd /c "git checkout main"
    $FromOrphan = $true
}
else {
    "${PROGRAMNAME}: create orphan branch failed"
}

if (($FromRemote -eq $true) -or ($FromLocal -eq $true) -or ($FromOrphan -eq $true)) {
    "${PROGRAMNAME}: auto deploy success"
    exit
}
else {
    "${PROGRAMNAME}: auto deploy failed"
    exit 1
}