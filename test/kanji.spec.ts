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
    it('Spacieal わ行 characters',()=>{
        expect(toTenji('わゐうゑを', {kanji: true}))
        .toBe('⡀⢐⠆⠒⢐⠖⡠');
    });
    it('Special small か, け',()=>{
        expect(toTenji('3ヶ月ヵ', {kanji: true}))
        .toBe('⣰⠒⡤⢐⢖⡄⠫⡤⢐⢂⡄');
    });
    it('ー is both Hiragana & Katakana',()=>{
        expect(toTenji('あーす', {kanji: true}))
        .toBe('⠂⠤⢲');
        expect(toTenji('アース', {kanji: true}))
        .toBe('⡤⠂⠤⢲⡄');
    });
    it('漢点字 and 記号', ()=>{
        expect(toTenji('漢点字: 漢字の点字…', {kanji: true}))
        .toBe('⢱⢚⠷⣸⠓⢜⠤⠀⢱⢚⠓⢜⡔⠷⣸⠓⢜⠀⠄⠄⠄')
    })
});
