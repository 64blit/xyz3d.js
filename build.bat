CALL vite build
CALL
CALL echo -------------------------
CALL echo -------------------------
CALL echo ------BUILD COMPLETED----
CALL echo -------------------------
CALL echo -------------------------
CALL move .\dist\xyz3d.es.js .\dist\xyz3d.js 
powershell.exe -Command "Get-ChildItem  -Directory -Path .\example\ | ForEach-Object {Copy-Item -Path .\dist\xyz3d.js -Destination $_.FullName -Verbose}"
CALL documentation build src\** -f html --output .\docs\
CALL documentation build src\** -f md --output .\docs\docs.md
@REM adds the docs.md content to the end of the readme.md file in the src file, then copies it to the root directory
CALL type .\src\README.md .\docs\docs.md > .\README.md 
