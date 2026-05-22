@ECHO OFF
SETLOCAL

SET "WRAPPER_DIR=%~dp0.mvn\wrapper"
SET "PROPERTIES_FILE=%WRAPPER_DIR%\maven-wrapper.properties"

IF NOT EXIST "%PROPERTIES_FILE%" (
	ECHO Missing Maven Wrapper properties file: %PROPERTIES_FILE%
	EXIT /B 1
)

FOR /F "tokens=1,2 delims==" %%A IN ('findstr /B /C:"distributionUrl=" "%PROPERTIES_FILE%"') DO SET "DISTRIBUTION_URL=%%B"

IF NOT DEFINED DISTRIBUTION_URL (
	ECHO Missing distributionUrl in %PROPERTIES_FILE%
	EXIT /B 1
)

SET "CACHE_ROOT=%LOCALAPPDATA%\maven-wrapper"
IF NOT EXIST "%CACHE_ROOT%" MKDIR "%CACHE_ROOT%" >NUL 2>NUL

FOR %%I IN ("%DISTRIBUTION_URL%") DO SET "ZIP_NAME=%%~nxI"
SET "ZIP_PATH=%CACHE_ROOT%\%ZIP_NAME%"
SET "INSTALL_DIR_NAME=%ZIP_NAME:-bin.zip=%"
SET "INSTALL_DIR=%CACHE_ROOT%\%INSTALL_DIR_NAME%"
SET "MAVEN_CMD=%INSTALL_DIR%\bin\mvn.cmd"

IF NOT EXIST "%MAVEN_CMD%" (
	ECHO Downloading Maven from %DISTRIBUTION_URL%
	powershell -NoProfile -ExecutionPolicy Bypass -Command "$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -Uri '%DISTRIBUTION_URL%' -OutFile '%ZIP_PATH%'"
	IF ERRORLEVEL 1 EXIT /B 1
	IF EXIST "%INSTALL_DIR%" RMDIR /S /Q "%INSTALL_DIR%"
	powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -Path '%ZIP_PATH%' -DestinationPath '%CACHE_ROOT%' -Force"
	IF ERRORLEVEL 1 EXIT /B 1
)

CALL "%MAVEN_CMD%" %*
EXIT /B %ERRORLEVEL%
