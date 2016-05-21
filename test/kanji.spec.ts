///<reference path='../typings/bundle.d.ts' />

import {toTenji} from '../lib/index';

describe('漢点字',()=>{
    it('basic kanji',()=>{
        expect(toTenji('漢点字',{kanji: true})).toBe('⢱⢚⠷⣸⠓⢜');
        expect(toTenji('夏目漱石',{kanji: true})).toBe('⠕⢺⣿⡇⠤⣨⣫');
    });
    it('kanji and others',()=>{
        expect(toTenji('点字を、Unicode変換。', {kanji: true}))
        .toBe('⠷⣸⠓⢜⡠⢠⠀⢠⢀⣂⡲⠔⠒⡢⠲⠢⣀⠗⢺⡷⢌⢤');
    });
    it('Katakana handling',()=>{
        expect(toTenji('あアアあア亜亜亜ーーー', {kanji: true}))
        .toBe('⠂⡤⠂⠂⡄⠂⡤⠂⡄⠃⠊⠃⠊⠃⠊⠤⠤⠤');
    });
});
