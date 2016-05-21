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
    describe('Katakana',()=>{
        it('清音',()=>{
            expect(toTenji('アイウエオ')).toBe('⠁⠃⠉⠋⠊');
            expect(toTenji('カキクケコ')).toBe('⠡⠣⠩⠫⠪');
            expect(toTenji('サシスセソ')).toBe('⠱⠳⠹⠻⠺');
            expect(toTenji('タチツテト')).toBe('⠕⠗⠝⠟⠞');
            expect(toTenji('ナニヌネノ')).toBe('⠅⠇⠍⠏⠎');
            expect(toTenji('ハヒフヘホ')).toBe('⠥⠧⠭⠯⠮');
            expect(toTenji('マミムメモ')).toBe('⠵⠷⠽⠿⠾');
            expect(toTenji('ヤユヨ')).toBe('⠌⠬⠜');
            expect(toTenji('ラリルレロ')).toBe('⠑⠓⠙⠛⠚');
            expect(toTenji('ワヰヱヲン')).toBe('⠄⠆⠖⠔⠴');
        });
        it('濁音',()=>{
            expect(toTenji('ガギグゲゴ')).toBe('⠐⠡⠐⠣⠐⠩⠐⠫⠐⠪');
            expect(toTenji('ザジズゼゾ')).toBe('⠐⠱⠐⠳⠐⠹⠐⠻⠐⠺');
            expect(toTenji('ダヂヅデド')).toBe('⠐⠕⠐⠗⠐⠝⠐⠟⠐⠞');
            expect(toTenji('バビブベボ')).toBe('⠐⠥⠐⠧⠐⠭⠐⠯⠐⠮');
            expect(toTenji('ヴ')).toBe('⠐⠉');
        });
        it('半濁音',()=>{
            expect(toTenji('パピプペポ')).toBe('⠠⠥⠠⠧⠠⠭⠠⠯⠠⠮');
        });
        it('撥音',()=>{
            expect(toTenji('ッ')).toBe('⠂');
        });
        it('basic 拗音',()=>{
            expect(toTenji('キャキュキョ')).toBe('⠈⠡⠈⠩⠈⠪');
            expect(toTenji('シャシュショ')).toBe('⠈⠱⠈⠹⠈⠺');
            expect(toTenji('チャチュチョ')).toBe('⠈⠕⠈⠝⠈⠞');
            expect(toTenji('ニャニュニョ')).toBe('⠈⠅⠈⠍⠈⠎');
            expect(toTenji('ヒャヒュヒョ')).toBe('⠈⠥⠈⠭⠈⠮');
            expect(toTenji('ミャミュミョ')).toBe('⠈⠵⠈⠽⠈⠾');
            expect(toTenji('リャリュリョ')).toBe('⠈⠑⠈⠙⠈⠚');
            expect(toTenji('ギャギュギョ')).toBe('⠘⠡⠘⠩⠘⠪');
            expect(toTenji('ジャジュジョ')).toBe('⠘⠱⠘⠹⠘⠺');
            expect(toTenji('ヂャヂュヂョ')).toBe('⠘⠕⠘⠝⠘⠞');
            expect(toTenji('ビャビュビョ')).toBe('⠘⠥⠘⠭⠘⠮');
            expect(toTenji('ピャピュピョ')).toBe('⠨⠥⠨⠭⠨⠮');
        });
        describe('advanced 拗音',()=>{
            it('開拗音',()=>{
                expect(toTenji('イェキェシェチェニェヒェミェリェ')).toBe('⠈⠋⠈⠫⠈⠻⠈⠟⠈⠏⠈⠯⠈⠿⠈⠛');
                expect(toTenji('ギェジェヂェビェピェ')).toBe('⠘⠫⠘⠻⠘⠟⠘⠯⠨⠯');
                expect(toTenji('スィティズィディ')).toBe('⠈⠳⠈⠗⠘⠳⠘⠗');
            });
            it('合拗音',()=>{
                expect(toTenji('ウァウィウェウォ')).toBe('⠢⠁⠢⠃⠢⠋⠢⠊');
                expect(toTenji('クァクィクェクォ')).toBe('⠢⠡⠢⠣⠢⠫⠢⠪');
                expect(toTenji('ツァツィツェツォ')).toBe('⠢⠕⠢⠗⠢⠟⠢⠞');
                expect(toTenji('ファフィフェフォ')).toBe('⠢⠥⠢⠧⠢⠯⠢⠮');
                expect(toTenji('グァグィグェグォ')).toBe('⠲⠡⠲⠣⠲⠫⠲⠪');
                expect(toTenji('ヴァヴィヴェヴォ')).toBe('⠲⠥⠲⠧⠲⠯⠲⠮');
            });
            it('その他',()=>{
                expect(toTenji('トゥドゥ')).toBe('⠢⠝⠲⠝');
                expect(toTenji('テュフュフョ')).toBe('⠨⠝⠨⠬⠨⠜');
                expect(toTenji('デュヴュヴョ')).toBe('⠸⠝⠸⠬⠸⠜');

            });
        });
    });
    describe('記号',()=>{
        it('basic 記号',()=>{
            expect(toTenji('んっー、。？！・あ')).toBe('⠴⠂⠒⠰⠀⠲⠀⠀⠢⠖⠐⠀⠁');
        });
        it('no spaces at the end of line',()=>{
            expect(toTenji(`あ、い、
う。`)).toBe(`⠁⠰⠀⠃⠰
⠉⠲`);
        });
    });
    describe('Numbers',()=>{
        it('basic number',()=>{
            expect(toTenji('1234567890')).toBe('⠼⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚');
        });
        it('小数点と位取り点',()=>{
            expect(toTenji('12,345.67')).toBe('⠼⠁⠃⠄⠉⠙⠑⠂⠋⠛');
        });
        it('つなぎ符',()=>{
            expect(toTenji('12ねん')).toBe('⠼⠁⠃⠏⠴');
            expect(toTenji('12えん')).toBe('⠼⠁⠃⠤⠋⠴');
        });
    });
    describe('Latin Alphabets',()=>{
        it('basic alphabets',()=>{
            expect(toTenji('abcdefghijklmnopqrstuvwxyz'))
            .toBe('⠰⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵');
            expect(toTenji('USA'))
            .toBe('⠰⠠⠥⠠⠎⠠⠁');
            expect(toTenji('Aきゅう')).toBe('⠰⠠⠁⠤⠈⠩⠉');
        });
        it('alphabet and numbers',()=>{
            expect(toTenji('B787'))
            .toBe('⠰⠠⠃⠼⠛⠓⠛');
        });
    });
    describe('Spaces',()=>{
        it('Convert spaces by default',()=>{
            expect(toTenji('きょーわ　はれ')).toBe('⠈⠪⠒⠄⠀⠥⠛');
            expect(toTenji(`あしたわ　あめ
いまわ　くもり`, {preserveSpaces: false})).toBe(`⠁⠳⠕⠄⠀⠁⠿
⠃⠵⠄⠀⠩⠾⠓`);
        });
        it('Preserve spaces by option',()=>{
            expect(toTenji('あいう え お', {preserveSpaces: true})).toBe('⠁⠃⠉ ⠋ ⠊');
        });
    });
    describe('Lower mode',()=>{
        it('Lower all',()=>{
            expect(toTenji('こんにちわ123あ、いう。',{lowerDots:true}))
            .toBe('⢔⣠⡆⡦⡀⣰⠂⠆⠒⣀⠂⢠⠀⠆⠒⢤');
        });
    });
});
