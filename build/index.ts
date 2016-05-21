///<reference path='../typings/bundle.d.ts' />
'use strict';

import {
    kanjiTable,
} from '../lib/table';

import * as path from 'path';
import * as fs from 'fs';


//漢字の逆引きテーブルを作る
const table = {};

for(let k in kanjiTable){
    let t = table;
    const arr = kanjiTable[k];
    for(let i=0, l=arr.length; i<l; i++){
        const c = arr[i];
        if(i === l-1){
            t[c] = k;
        }else{
            if(t[c] == null){
                t[c] = {};
            }
            t = t[c];
        }
    }
}

fs.writeFileSync(path.resolve(__dirname, '..', 'lib', 'inv-kanji.json'), JSON.stringify(table));
