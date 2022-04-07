// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function trim(string, characters = ' ') {
    let c = '\\' + characters.split('').join('\\');
    return string.replace(new RegExp(`^[${c}]+|[${c}]+$`, 'g'), '');
}
function loadCSV(text, delimiter = ';', quotes = '"') {
    let t0 = Date.now();
    let table = lines(text).map((x1)=>x1.split(delimiter).map((x)=>trim(x, quotes)
        )
    );
    table = aa2ad(table);
    log.debug('finished parsing', Object.keys(table).length, 'lines', t0);
    return table;
}
function loadTSV(text) {
    return loadCSV(text, '\t');
}
export { loadCSV as loadCSV };
export { loadTSV as loadTSV };

