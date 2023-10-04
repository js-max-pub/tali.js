mkdir build
deno bundle mod.js > build/tali.js
terser  --mangle --module build/tali.js > build/tali.min.js

deno bundle csv.js > build/csv.js
terser  --mangle --module build/csv.js > build/csv.min.js