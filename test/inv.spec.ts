///<reference path='../typings/bundle.d.ts' />

//Test from tenji.fromTenji
import {fromTenji} from '../lib/index';

describe('From tenji',()=>{
    describe('Basic tenji',()=>{
        describe('Hiragana',()=>{
            it('清音',()=>{
                expect(fromTenji('⠁⠃⠉⠋⠊')).toBe('あいうえお');
                expect(fromTenji('⠡⠣⠩⠫⠪')).toBe('かきくけこ');
                expect(fromTenji('⠱⠳⠹⠻⠺')).toBe('さしすせそ');
                expect(fromTenji('⠕⠗⠝⠟⠞')).toBe('たちつてと');
                expect(fromTenji('⠅⠇⠍⠏⠎')).toBe('なにぬねの');
                expect(fromTenji('⠥⠧⠭⠯⠮')).toBe('はひふへほ');
                expect(fromTenji('⠵⠷⠽⠿⠾')).toBe('まみむめも');
                expect(fromTenji('⠌⠬⠜')).toBe('やゆよ');
                expect(fromTenji('⠑⠓⠙⠛⠚')).toBe('らりるれろ');
                expect(fromTenji('⠄⠆⠖⠔⠴')).toBe('わゐゑをん');
            });
            it('濁音',()=>{
                expect(fromTenji('⠐⠡⠐⠣⠐⠩⠐⠫⠐⠪')).toBe('がぎぐげご');
                expect(fromTenji('⠐⠱⠐⠳⠐⠹⠐⠻⠐⠺')).toBe('ざじずぜぞ');
                expect(fromTenji('⠐⠕⠐⠗⠐⠝⠐⠟⠐⠞')).toBe('だぢづでど');
                expect(fromTenji('⠐⠥⠐⠧⠐⠭⠐⠯⠐⠮')).toBe('ばびぶべぼ');
                expect(fromTenji('⠐⠉')).toBe('ゔ');
            });
            it('半濁音',()=>{
                expect(fromTenji('⠠⠥⠠⠧⠠⠭⠠⠯⠠⠮')).toBe('ぱぴぷぺぽ');
            });
            it('撥音',()=>{
                expect(fromTenji('⠪⠂⠞⠴')).toBe('こっとん');
            });
            it('Basic 拗音',()=>{
                expect(fromTenji('⠈⠡⠈⠩⠈⠪')).toBe('きゃきゅきょ');
                expect(fromTenji('⠈⠱⠈⠹⠈⠺')).toBe('しゃしゅしょ');
                expect(fromTenji('⠈⠕⠈⠝⠈⠞')).toBe('ちゃちゅちょ');
                expect(fromTenji('⠈⠅⠈⠍⠈⠎')).toBe('にゃにゅにょ');
                expect(fromTenji('⠈⠥⠈⠭⠈⠮')).toBe('ひゃひゅひょ');
                expect(fromTenji('⠈⠵⠈⠽⠈⠾')).toBe('みゃみゅみょ');
                expect(fromTenji('⠈⠑⠈⠙⠈⠚')).toBe('りゃりゅりょ');
                expect(fromTenji('⠘⠡⠘⠩⠘⠪')).toBe('ぎゃぎゅぎょ');
                expect(fromTenji('⠘⠱⠘⠹⠘⠺')).toBe('じゃじゅじょ');
                expect(fromTenji('⠘⠕⠘⠝⠘⠞')).toBe('ぢゃぢゅぢょ');
                expect(fromTenji('⠘⠥⠘⠭⠘⠮')).toBe('びゃびゅびょ');
                expect(fromTenji('⠨⠥⠨⠭⠨⠮')).toBe('ぴゃぴゅぴょ');
            });
            it('Advanced 拗音',()=>{
                expect(fromTenji('⠈⠋⠈⠫⠈⠻⠈⠟⠈⠏⠈⠯⠈⠿⠈⠛')).toBe('いぇきぇしぇちぇにぇひぇみぇりぇ');
                expect(fromTenji('⠘⠫⠘⠻⠘⠟⠘⠯⠨⠯')).toBe('ぎぇじぇぢぇびぇぴぇ');
                expect(fromTenji('⠈⠳⠈⠗⠘⠳⠘⠗')).toBe('すぃてぃずぃでぃ');
                expect(fromTenji('⠢⠁⠢⠃⠢⠋⠢⠊')).toBe('うぁうぃうぇうぉ');
                expect(fromTenji('⠢⠡⠢⠣⠢⠫⠢⠪')).toBe('くぁくぃくぇくぉ');
                expect(fromTenji('⠢⠕⠢⠗⠢⠟⠢⠞')).toBe('つぁつぃつぇつぉ');
                expect(fromTenji('⠢⠥⠢⠧⠢⠯⠢⠮')).toBe('ふぁふぃふぇふぉ');
                expect(fromTenji('⠲⠡⠲⠣⠲⠫⠲⠪')).toBe('ぐぁぐぃぐぇぐぉ');
                expect(fromTenji('⠲⠥⠲⠧⠲⠯⠲⠮')).toBe('ゔぁゔぃゔぇゔぉ');
                expect(fromTenji('⠢⠝⠲⠝')).toBe('とぅどぅ');
                expect(fromTenji('⠨⠝⠨⠬⠨⠜')).toBe('てゅふゅふょ');
                expect(fromTenji('⠸⠝⠸⠬⠸⠜')).toBe('でゅゔゅゔょ');
            });
            it('記号',()=>{
                expect(fromTenji('⠰⠄⠴⠂⠒⠠⠆⠰⠀⠲⠀⠀⠢⠐⠀⠁⠰⠤⠉⠤⠆⠐⠶⠁⠶⠂')).toBe('「んっー」、。?・あ『う』(あ)');
            });
        });
        it('Number',()=>{
            expect(fromTenji('⠼⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚')).toBe('1234567890');
            expect(fromTenji('⠼⠁⠃⠄⠉⠙⠑⠂⠋⠛')).toBe('12,345.67');
            expect(fromTenji('⠼⠁⠃⠏⠴')).toBe('12ねん');
            expect(fromTenji('⠼⠁⠃⠤⠋⠴')).toBe('12えん');
        });
        it('Alphabets',()=>{
            expect(fromTenji('⠰⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵'))
            .toBe('abcdefghijklmnopqrstuvwxyz');
            expect(fromTenji('⠰⠠⠠⠥⠎⠁'))
            .toBe('USA');
            expect(fromTenji('⠰⠠⠁⠤⠈⠩⠉')).toBe('Aきゅう');
            expect(fromTenji('⠰⠠⠃⠼⠛⠓⠛'))
            .toBe('B787');
            expect(fromTenji('⠰⠠⠁⠵⠀⠱⠴')).toBe('Az さん');
            expect(fromTenji('⠁⠎⠦⠠⠎⠅⠽⠀⠠⠕⠗⠙⠑⠗⠴⠜')).toBe('あのSky Orderよ');
        });
    });

});