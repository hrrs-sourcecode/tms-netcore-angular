@echo off
echo 🔨 Building TMS WebAPI (.NET Core)...

cd WebAPI
call deploy-api.bat

echo 🌐 Building TMS UI (Angular)...

cd UI
call deploy-api.bat

echo ✅ All projects built successfully!
pause