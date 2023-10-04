mkdir -p dist/
deno bundle ./mod.js > dist/src.js
terser --mangle --module dist/src.js > dist/min.js