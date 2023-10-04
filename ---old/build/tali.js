// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function lines(string = "") {
    return string?.split('\r\n')?.flatMap((x)=>x.split('\r')
    )?.flatMap((x)=>x.split('\n')
    ) ?? [];
}
const taliT = '|T|';
const taliN = '|L|';
function parse(string = '', options) {
    let aa = str2aa(string, options);
    let dd = aa2dd(aa, options);
    return dd;
}
function str2aa(string, options = {}) {
    let aa = lines(string).filter((x)=>x.trim()
    ).map((x)=>x.split('\t').map((y)=>String(y).replaceAll('\t', taliT).replaceAll('\n', taliN).trim()
        ).map((y)=>y == options.none ? undefined : y
        )
    );
    return aa;
}
function aa2dd(aa) {
    let cols = aa[0];
    let dd = {};
    for (let row of aa.slice(1)){
        dd[row[0]] = Object.fromEntries(row.map((x, i)=>[
                cols[i],
                x
            ]
        ).slice(1));
    }
    return dd;
}
function stringify(DD = {}, options) {
    let aa = dd2aa(DD, options);
    let str = aa2str(aa, options);
    return str;
}
function dd2aa(dd, options = {}) {
    let aa = [];
    let cols = [
        ...new Set(Object.keys(dd).flatMap((row)=>Object.keys(dd[row])
        ))
    ];
    if (options.sortCols) cols = cols.sort();
    for(let row1 in dd){
        aa.push([
            row1,
            ...cols.map((col)=>dd[row1][col] ?? ''
            )
        ]);
    }
    let sortCol = -1;
    if (options.sortRows) sortCol = 0;
    if (options.sortCol && cols.indexOf(options.sortCol) != -1) sortCol = cols.indexOf(options.sortCol) + 1;
    if (sortCol != -1) {
        aa = aa.sort((a, b)=>a[sortCol] > b[sortCol] ? 1 : a[sortCol] < b[sortCol] ? -1 : 0
        );
    }
    aa.unshift([
        '',
        ...cols
    ]);
    return aa;
}
function aa2str(aa, options = {}) {
    aa[0][0] = options.title || '';
    let string = aa.map((x)=>x.map((y)=>y ? y : options.none || ''
        ).map((y)=>String(y).replaceAll('\t', taliT).replaceAll('\n', taliN).trim()
        ).join('\t')
    ).join('\n');
    if (options.none && string.startsWith(options.none)) string = string.slice(options.none.length);
    return string;
}
const __default = {
    grid: {
        parse,
        stringify
    }
};
export { __default as default };

