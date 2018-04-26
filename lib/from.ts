import {
  hiraganaTable,
  kigouTable,
  numberTable,
  alphabetTable,
  kanjiTable,
} from './table';
const NORMAL_MODE = 0;
const NUMBER_MODE = 1;
const ALPHABET_MODE = 2;

const NO_MODIFIER = 0;
const DAKUON_MODIFIER = 1;
const HANDAKUON_MODIFIER = 2;
const YOON_MODIFIER = 4;
const MODIFIER_2 = 8; //2の点のmodifier
const KATAKANA_MODIFIER = 16; //カタカナ状態

//ALPHABET_MODE用
const CAPITAL_MODIFIER = 1;
const CAPITAL_SEQ_MODIFIER = 2;
const ALPHABET_QUOTE_MODIFIER = 4;

const invKanjiTable = require('./inv-kanji.json');
//inverse tableはchacheしておく
let invHiraganaTable = null;

export interface FromTenjiOptions {
  space?: string;
  kanji?: boolean;
  漢点字?: boolean;
}
export function fromTenji(
  text: string,
  options: FromTenjiOptions = {},
): string {
  const space = options.space || ' ';
  const kanji = options.kanji || options['漢点字'] || false;
  const invh = getInvHiraganaTable();

  //flags
  let mode = NORMAL_MODE;
  let modifier = NO_MODIFIER;
  //漢点字のときにカタカナモードのフラグ
  let katakana_flg = false;

  let skipSpaces = 0;

  let result = '';
  f: for (let i = 0, l = text.length; i < l; i++) {
    const cc = text.charCodeAt(i);
    const cc2 = text.charCodeAt(i + 1);
    if (0x2800 <= cc && cc <= 0x28ff) {
      //点字だ
      let code = cc - 0x2800;

      if (code === 0) {
        //スペースだ
        if (skipSpaces > 0) {
          skipSpaces--;
        } else {
          result += space;
        }
        if (mode === ALPHABET_MODE && !(modifier & ALPHABET_QUOTE_MODIFIER)) {
          //スペースがあると外字モードが消える
          mode = NORMAL_MODE;
          modifier = NO_MODIFIER;
        }
        continue;
      }

      if (kanji) {
        if (code & 0x09) {
          //これ漢字っぽくなーい？？？？？？？？
          let t = invKanjiTable;
          let j = i;
          while (t) {
            if ('string' === typeof t) {
              result += t;
              i = j - 1;
              continue f;
            }
            const c = text.charCodeAt(j);
            if (0x2800 <= c && c <= 0x28ff) {
              t = t[c - 0x2800];
              j++;
            } else {
              //漢字にならなかった
              break;
            }
          }
        } else {
          //処理用に上にずらす
          code = nonkanji(code);
        }
      }

      if (mode === NUMBER_MODE) {
        //数字状態
        const nn = numberTable.indexOf(code);
        if (nn >= 0) {
          result += String(nn);
          continue;
        } else if (code === 0x04) {
          //位取り点
          result += ',';
          continue;
        } else if (code === 0x02) {
          //小数点
          result += '.';
          continue;
        } else if (code === 0x24) {
          //第1つなぎ符
          mode = NORMAL_MODE;
          continue;
        }
        mode = NORMAL_MODE;
      } else if (mode === ALPHABET_MODE) {
        //えいご〜〜〜〜〜〜〜
        if (code === 0x20) {
          //大文字符
          modifier |= CAPITAL_MODIFIER;
          if (0x2800 <= cc2 && cc <= 0x28ff) {
            const code2 = nonkanji(cc2 - 0x2800);
            if (code2 === 0x20) {
              //大文字符×2
              modifier |= CAPITAL_SEQ_MODIFIER;
              i++;
            }
          }
          continue;
        } else if (code === 0x24) {
          //つなぎ符
          mode = NORMAL_MODE;
          modifier = NO_MODIFIER;
          continue;
        } else if (code === 0x3c) {
          //数符
          mode = NUMBER_MODE;
          modifier = NO_MODIFIER;
          continue;
        } else if (code === 0x34 && modifier & ALPHABET_QUOTE_MODIFIER) {
          //外字引用符（おわり）
          mode = NORMAL_MODE;
          modifier = NO_MODIFIER;
          continue;
        } else {
          const al = alphabetTable.indexOf(code);
          if (al >= 0) {
            result += String.fromCharCode(
              al + 0x61 - (modifier & CAPITAL_MODIFIER ? 0x20 : 0),
            );
            if (
              modifier & CAPITAL_MODIFIER &&
              !(modifier & CAPITAL_SEQ_MODIFIER)
            ) {
              modifier ^= CAPITAL_MODIFIER;
            }
            continue;
          }
        }
        if (!(modifier & ALPHABET_QUOTE_MODIFIER)) {
          //英語にならなかったから日本語にしようっと
          mode = NORMAL_MODE;
          modifier = NO_MODIFIER;
        }
      }

      if ((code === 0x22 || code === 0x32) && 0x2800 <= cc2 && cc2 <= 0x28ff) {
        //疑問符/句点だけどmodifierかもしれない
        const code2 = nonkanji(cc2 - 0x2800);
        //次の文字の母音と子音を取得
        const boin = code2 & 0x0b;
        const shiin = code2 & 0x34;
        if (
          ((boin === 0x01 || boin === 0x03 || boin === 0x0b || boin === 0x0a) &&
            (shiin === 0 ||
              shiin === 0x20 ||
              shiin === 0x14 ||
              shiin === 0x24)) ||
          (boin === 0x09 && shiin === 0x14)
        ) {
          //意味がありそう
          modifier =
            YOON_MODIFIER | MODIFIER_2 | (code & 0x10 ? DAKUON_MODIFIER : 0);
          continue;
        }
      }

      //文字の変換
      if (code in invh && (!kanji || (code !== 0x16 && code !== 0x06))) {
        //ひらがなに変換可能
        let suffix = '';
        if (modifier & YOON_MODIFIER) {
          //母音と子音を取り出す
          let boin = code & 0x0b;
          let shiin = code & 0x34;

          if (modifier & MODIFIER_2) {
            //2点modifier（特殊な拗音）
            if (modifier & DAKUON_MODIFIER && shiin === 0x24) {
              //ゔぁ……なのでふからうに変更
              shiin = 0;
            }
            if (boin === 0x01) {
              suffix = 'ぁ';
              code = shiin | 0x09;
            } else if (boin === 0x03) {
              suffix = 'ぃ';
              code = shiin | 0x09;
            } else if (boin === 0x0b) {
              suffix = 'ぇ';
              code = shiin | 0x09;
            } else if (boin === 0x0a) {
              suffix = 'ぉ';
              code = shiin | 0x09;
            } else if (boin === 0x09) {
              //とぅ・どぅの処理
              suffix = 'ぅ';
              code = shiin | 0x0a;
            }
          } else if (modifier & HANDAKUON_MODIFIER && code === 0x1d) {
            //てゅの処理
            suffix = 'ゅ';
            code = 0x1f;
          } else if (
            modifier & HANDAKUON_MODIFIER &&
            (code === 0x2c || code === 0x1c)
          ) {
            //ふゅ・ふょの処理
            suffix = code === 0x2c ? 'ゅ' : 'ょ';
            //ふのときはゔにする
            code = modifier & DAKUON_MODIFIER ? 0x09 : 0x2d;
            //ふがぷにならないようにする
            modifier = modifier ^ HANDAKUON_MODIFIER;
          } else if (
            kanji &&
            modifier & HANDAKUON_MODIFIER &&
            (code === 0x03 || code === 0x0b)
          ) {
            //漢点字の場合のゐ・ゑ
            result += katakana(code === 0x03 ? 'ゐ' : 'ゑ');
            modifier = NO_MODIFIER;
            continue;
          } else if (
            kanji &&
            modifier & HANDAKUON_MODIFIER &&
            (code === 0x21 || code === 0x2b)
          ) {
            //漢点字のヵ・ヶ
            result += katakana(code === 0x21 ? 'ゕ' : 'ゖ');
            modifier = NO_MODIFIER;
            continue;
          } else {
            //比較的ふつうの拗音
            if (boin === 0x01) {
              //あ段
              suffix = 'ゃ';
              //い段に直す
              code = shiin | 0x03;
            } else if (boin === 0x09) {
              suffix = 'ゅ';
              code = shiin | 0x03;
            } else if (boin === 0x0a) {
              suffix = 'ょ';
              code = shiin | 0x03;
            } else if (boin === 0x0b) {
              //え段
              suffix = 'ぇ';
              code = shiin | 0x03;
            } else if (boin === 0x03) {
              //い段？？？
              if (shiin === 0x30) {
                //すぃの処理
                suffix = 'ぃ';
                code = shiin | 0x09;
              } else if (shiin === 0x14) {
                //てぃの処理
                suffix = 'ぃ';
                code = shiin | 0x0b;
              }
            }
          }
        }
        if (modifier & DAKUON_MODIFIER) {
          //濁音符

          //子音を取り出す
          const shiin = code & 0x34;
          if (
            shiin === 0x20 ||
            shiin === 0x30 ||
            shiin === 0x14 ||
            shiin === 0x24
          ) {
            //濁音化可能
            result +=
              katakana(String.fromCharCode(invh[code].charCodeAt(0) + 1)) +
              katakana(suffix);
            modifier = NO_MODIFIER;
            continue;
          } else if (code === 0x09) {
            //ゔの処理
            result += katakana('ゔ') + katakana(suffix);
            modifier = NO_MODIFIER;
            continue;
          }
        } else if (modifier & HANDAKUON_MODIFIER) {
          //半濁音
          const shiin = code & 0x34;
          if (shiin === 0x24) {
            //は行
            result +=
              katakana(String.fromCharCode(invh[code].charCodeAt(0) + 2)) +
              katakana(suffix);
            modifier = NO_MODIFIER;
            continue;
          }
        }
        modifier = NO_MODIFIER;
        result += katakana(invh[code]) + katakana(suffix);
      } else if ((code & 0x38) === code) {
        //modifierだ

        //でも記号類の可能性があるから先にチェック
        if (0x2800 <= cc2 && cc2 <= 0x28ff) {
          const code2 = cc2 - 0x2800;
          if (code === 0x30) {
            //いろいろ可能性がある
            if (code2 === 0x04) {
              result += '「';
              i++;
              modifier = NO_MODIFIER;
              continue;
            } else if (code2 === 0x06) {
              result += '」';
              i++;
              modifier = NO_MODIFIER;
              continue;
            } else if (code2 === 0x24) {
              result += '『';
              i++;
              modifier = NO_MODIFIER;
              continue;
            } else if (code2 === 0x0f) {
              result += '%';
              i++;
              modifier = NO_MODIFIER;
              continue;
            } else if (code2 === 0x2f) {
              result += '&';
              i++;
              modifier = NO_MODIFIER;
              continue;
            } else if (code2 === 0x29) {
              result += '#';
              i++;
              modifier = NO_MODIFIER;
              continue;
            } else if (code2 === 0x21) {
              result += '*';
              i++;
              modifier = NO_MODIFIER;
              continue;
            } else if (code2 === 0 || cc2 === 0x0d || cc2 === 0x0a) {
              //読点では？
              result += '、';
              skipSpaces = 1;
              continue;
            } else {
              //外字符にする
              mode = ALPHABET_MODE;
              modifier = NO_MODIFIER;
              continue;
            }
          } else if (code === 0x10) {
            if (code2 === 0x36) {
              result += '(';
              i++;
              modifier = NO_MODIFIER;
              continue;
            } else if (code2 === 0 || cc2 === 0x0d || cc2 === 0x0a) {
              result += '・';
              skipSpaces = 1;
            }
          } else if (code === 0x20) {
            if (code2 === 0x06) {
              result += '」';
              i++;
              modifier = NO_MODIFIER;
              continue;
            }
          }
        }

        modifier =
          (code & 0x10 ? DAKUON_MODIFIER : 0) |
          (code & 0x20 ? HANDAKUON_MODIFIER : 0) |
          (code & 0x08 ? YOON_MODIFIER : 0);
      } else {
        //記号類
        if (code === 0x12) {
          result += 'ー';
        } else if (code === 0x22) {
          result += '?';
        } else if (code === 0x24) {
          //第1つなぎ符とかいろいろあるが
          if (cc2 === 0x2806) {
            result += '』';
            i++;
          }
        } else if (code === 0x36) {
          //しかくい
          if (cc2 === 0x2802) {
            result += ')';
            i++;
          }
        } else if (code === 0x32) {
          //句点
          result += '。';
          skipSpaces = 2;
        } else if (code === 0x3c) {
          //数符だ
          mode = NUMBER_MODE;
        } else if (code === 0x26) {
          //外字引用符
          mode = ALPHABET_MODE;
          modifier = ALPHABET_QUOTE_MODIFIER;
          continue;
        } else if (kanji && code === 0x16) {
          //カタカナ符（漢点字）
          katakana_flg = true;
          continue;
        } else if (kanji && code === 0x06) {
          //カタカナ符（おわり）
          katakana_flg = false;
          continue;
        }
        modifier = NO_MODIFIER;
      }
    } else {
      //他はスルー
      result += text.charAt(i);
    }
  }
  return result;
  function nonkanji(code: number): number {
    if (kanji) {
      return (
        ((code & 0x06) >> 1) |
        ((code & 0x30) >> 1) |
        ((code & 0x40) >> 4) |
        ((code & 0x80) >> 2)
      );
    } else {
      return code;
    }
  }
  function katakana(char: string): string {
    if (char === '') {
      return '';
    }
    if (katakana_flg) {
      return String.fromCharCode(char.charCodeAt(0) + 0x60);
    } else {
      return char;
    }
  }
}

//caching
function getInvHiraganaTable(): any {
  if (invHiraganaTable != null) {
    return invHiraganaTable;
  }
  invHiraganaTable = {};
  for (let k in hiraganaTable) {
    invHiraganaTable[hiraganaTable[k]] = k;
  }
  return invHiraganaTable;
}
/*
function makeParser(table):Parser{
    //parserを作る
    //まず下準備でテーブル作り
    const t_base = {};
    for(let k in table){
        const arr = table[k];
        const c0 = arr[0];
        if(t_base[c0] == null){
            t_base[c0] = [];
            //配列に文字を覚えさせる
            t_base[c0];
        }
        const a2 = arr.slice(1);
        a2._char = k;
        t_base[c0].push(a2);
    }
    //parser
    return (text:string, i:number)=>{
        let t = t_base;
        const l = text.length;
        while(i < l){
            const code = text.charCodeAt(i);
            if(code < 0x2800 || 0x28FF < code){
                //点字ではない
                return {
                    char: null,
                    nextIndex: i,
                };
            }
            const cc = code - 0x2800;
            const arr = t[cc];
            if(arr == null){
                //ない
                return {
                    char: null,
                    nextIndex: i,
                };
            }
            //あったのでバース継続
            const t2 = {};
            for(let a of arr){
                if(a.length===0){
                    //パース完了
                    return {
                        char: a._char,
                        nextIndex: i+1,
                    };
                }
                const c0 = a[0];
                if(t2[c0] == null){
                    t2[c0] = [];
                }
                const a2 = a.slice(1);
                a2._char = a._char;
                t2[c0].push(a2);
            }
            t = t2;
            i++;
        }
    };
}
*/
