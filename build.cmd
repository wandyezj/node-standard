cls

call npm run prettier
if %errorlevel% neq 0 goto :error

call npm run build
if %errorlevel% neq 0 goto :error

call npm run api-extractor-run
if %errorlevel% neq 0 goto :error

call npm run api-documenter-run
if %errorlevel% neq 0 goto :error

goto :eof

:error
echo error