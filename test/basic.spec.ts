///<reference path='../typings/bundle.d.ts' />

import {toTenji} from '../lib/index';

describe('Basic conversion to Tenji', ()=>{
    describe('Hiragana',()=>{
        it('清音',()=>{
            expect(toTenji('あいうえお')).toBe('⠁⠃⠉⠋⠊');
            expect(toTenji('かきくけこ')).toBe('⠡⠣⠩⠫⠪');
            expect(toTenji('さしすせそ')).toBe('⠱⠳⠹⠻⠺');
            expect(toTenji('たちつてと')).toBe('⠕⠗⠝⠟⠞');
            expect(toTenji('なにぬねの')).toBe('⠅⠇⠍⠏⠎');
            expect(toTenji('はひふへほ')).toBe('⠥⠧⠭⠯⠮');
            expect(toTenji('まみむめも')).toBe('⠵⠷⠽⠿⠾');
            expect(toTenji('やゆよ')).toBe('⠌⠬⠜');
            expect(toTenji('らりるれろ')).toBe('⠑⠓⠙⠛⠚');
            expect(toTenji('わゐゑをん')).toBe('⠄⠆⠖⠔⠴');
        });
        it('濁音',()=>{
            expect(toTenji('がぎぐげご')).toBe('⠐⠡⠐⠣⠐⠩⠐⠫⠐⠪');
            expect(toTenji('ざじずぜぞ')).toBe('⠐⠱⠐⠳⠐⠹⠐⠻⠐⠺');
            expect(toTenji('だぢづでど')).toBe('⠐⠕⠐⠗⠐⠝⠐⠟⠐⠞');
            expect(toTenji('ばびぶべぼ')).toBe('⠐⠥⠐⠧⠐⠭⠐⠯⠐⠮');
            expect(toTenji('ゔ')).toBe('⠐⠉');
        });
        it('半濁音',()=>{
            expect(toTenji('ぱぴぷぺぽ')).toBe('⠠⠥⠠⠧⠠⠭⠠⠯⠠⠮');
        });
        it('撥音',()=>{
            expect(toTenji('こっとん')).toBe('⠪⠂⠞⠴');
        });
        it('basic 拗音',()=>{
            expect(toTenji('きゃきゅきょ')).toBe('⠈⠡⠈⠩⠈⠪');
            expect(toTenji('しゃしゅしょ')).toBe('⠈⠱⠈⠹⠈⠺');
            expect(toTenji('ちゃちゅちょ')).toBe('⠈⠕⠈⠝⠈⠞');
            expect(toTenji('にゃにゅにょ')).toBe('⠈⠅⠈⠍⠈⠎');
            expect(toTenji('ひゃひゅひょ')).toBe('⠈⠥⠈⠭⠈⠮');
            expect(toTenji('みゃみゅみょ')).toBe('⠈⠵⠈⠽⠈⠾');
            expect(toTenji('りゃりゅりょ')).toBe('⠈⠑⠈⠙⠈⠚');
            expect(toTenji('ぎゃぎゅぎょ')).toBe('⠘⠡⠘⠩⠘⠪');
            expect(toTenji('じゃじゅじょ')).toBe('⠘⠱⠘⠹⠘⠺');
            expect(toTenji('ぢゃぢゅぢょ')).toBe('⠘⠕⠘⠝⠘⠞');
            expect(toTenji('びゃびゅびょ')).toBe('⠘⠥⠘⠭⠘⠮');
            expect(toTenji('ぴゃぴゅぴょ')).toBe('⠨⠥⠨⠭⠨⠮');
        });
        describe('advanced 拗音',()=>{
            it('開拗音',()=>{
                expect(toTenji('いぇきぇしぇちぇにぇひぇみぇりぇ')).toBe('⠈⠋⠈⠫⠈⠻⠈⠟⠈⠏⠈⠯⠈⠿⠈⠛');
                expect(toTenji('ぎぇじぇぢぇびぇぴぇ')).toBe('⠘⠫⠘⠻⠘⠟⠘⠯⠨⠯');
                expect(toTenji('すぃてぃずぃでぃ')).toBe('⠈⠳⠈⠗⠘⠳⠘⠗');
            });
            it('合拗音',()=>{
                expect(toTenji('うぁうぃうぇうぉ')).toBe('⠢⠁⠢⠃⠢⠋⠢⠊');
                expect(toTenji('くぁくぃくぇくぉ')).toBe('⠢⠡⠢⠣⠢⠫⠢⠪');
                expect(toTenji('つぁつぃつぇつぉ')).toBe('⠢⠕⠢⠗⠢⠟⠢⠞');
                expect(toTenji('ふぁふぃふぇふぉ')).toBe('⠢⠥⠢⠧⠢⠯⠢⠮');
                expect(toTenji('ぐぁぐぃぐぇぐぉ')).toBe('⠲⠡⠲⠣⠲⠫⠲⠪');
                expect(toTenji('ゔぁゔぃゔぇゔぉ')).toBe('⠲⠥⠲⠧⠲⠯⠲⠮');
            });
            it('その他',()=>{
                expect(toTenji('とぅどぅ')).toBe('⠢⠝⠲⠝');
                expect(toTenji('てゅふゅふょ')).toBe('⠨⠝⠨⠬⠨⠜');
                expect(toTenji('でゅゔゅゔょ')).toBe('⠸⠝⠸⠬⠸⠜');

            });
        });
    });
});
