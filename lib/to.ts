import {
  hiraganaTable,
  dakuonList,
  handakuonList,
  yoonTable,
  goyoonTable,
  kigouTable,
  numberTable,
  alphabetTable,
  kanjiTable,
  alphabetKigouTable
} from "./table";

const NORMAL_MODE = 0;
const NUMBER_MODE = 1;
const ALPHABET_MODE = 2;
const CAPITAL_ALPHABET_MODE = 3;
//カタカナ状態（漢点字）
const KATAKANA_MODE = 4;

export interface ToTenjiOptions {
  //空白を保存
  preserveSpaces?: boolean;
  //上6点ではなく下6点を使用
  lowerDots?: boolean;
  //漢点字モード
  kanji?: boolean;
  漢点字?: boolean;
  //no normalize
  noNormalize?: boolean;
}
export function toTenji(text: string, options: ToTenjiOptions = {}): string {
  if (!options.noNormalize) {
    text = (text as any).normalize("NFKC");
  }
  //options
  const preserveSpaces = options.preserveSpaces || false;
  const kanji = options.kanji || options["漢点字"] || false;
  //漢点字のときは下を強制
  const lowerDots = kanji || options.lowerDots || false;
  const code: Array<number | string> = [];
  //空白を入れる予約
  let spaces = 0;
  //モード
  let mode = NORMAL_MODE;
  // カッコのネストレベル
  let bracketLevel = 0;
  // カギ類のネストレベル
  let quoteLevel = 0;

  for (let i = 0, l = text.length; i < l; i++) {
    let c = text.charAt(i);
    if (/\r|\n/.test(c)) {
      //行末のスペースは消す
      spaces = 0;
    }
    while (spaces > 0) {
      code.push(0);
      spaces--;
    }
    if (kanji) {
      if (/^[\u30a1-\u30f6]$/.test(c)) {
        if (mode !== KATAKANA_MODE) {
          //カタカナ符のあれ
          code.push(nonkanji(0x16));
          mode = KATAKANA_MODE;
        }
      } else if (c !== "ー" && mode === KATAKANA_MODE) {
        code.push(nonkanji(0x06));
        mode = NORMAL_MODE;
      }
    }
    c = katakanaToHiragana(c);
    if (/^[\u3041-\u3096]$/.test(c)) {
      //前につける符号
      let sub = 0;
      const c2 = katakanaToHiragana(text.charAt(i + 1));
      if (
        (c2 === "ゃ" || c2 === "ゅ" || c2 === "ょ" || c2 === "ぇ") &&
        c in yoonTable
      ) {
        //拗音
        sub = 8;
        c = yoonTable[c].charAt("ゃゅょぇ".indexOf(c2));
        i++;
      } else if (
        (c2 === "ぁ" || c2 === "ぃ" || c2 === "ぇ" || c2 === "ぉ") &&
        c in goyoonTable
      ) {
        //合拗音
        sub = 0x22;
        c = goyoonTable[c].charAt("ぁぃぇぉ".indexOf(c2));
        i++;
      } else if (c2 === "ぇ" && c === "い") {
        //特例処理
        sub = 8;
        c = "え";
        i++;
      } else if (c2 === "ぃ" && (c === "す" || c === "て")) {
        sub = 8;
        c = c === "す" ? "し" : "ち";
        i++;
      } else if (c2 === "ぃ" && (c === "ず" || c === "で")) {
        sub = 0x18;
        c = c === "ず" ? "じ" : "ぢ";
        i++;
      } else if (c2 === "ぅ" && (c === "と" || c === "ど")) {
        //トゥットゥルー
        sub = c === "と" ? 0x22 : 0x32;
        c = "つ";
        i++;
      } else if (c2 === "ゅ" && c === "て") {
        sub = 0x28;
        c = "つ";
        i++;
      } else if (c2 === "ゅ" && c === "で") {
        sub = 0x38;
        c = "つ";
        i++;
      } else if (c2 === "ゅ" && c === "ふ") {
        sub = 0x28;
        c = "ゆ";
        i++;
      } else if (c2 === "ゅ" && c === "ゔ") {
        sub = 0x38;
        c = "ゆ";
        i++;
      } else if (c2 === "ょ" && c === "ふ") {
        sub = 0x28;
        c = "よ";
        i++;
      } else if (c2 === "ょ" && c === "ゔ") {
        sub = 0x38;
        c = "よ";
        i++;
      } else if (c === "ゔ") {
        sub = 0x10;
        c = "う";
      } else if (kanji && (c === "ゐ" || c === "ゑ")) {
        //漢点字の場合変わる
        sub = 0x28;
        c = c === "ゐ" ? "い" : "え";
      } else if (kanji && (c === "ゕ" || c === "ゖ")) {
        //漢点字で新たに定義?
        sub = 0x28;
        c = c === "ゕ" ? "か" : "け";
      }
      if (mode === ALPHABET_MODE || mode === CAPITAL_ALPHABET_MODE) {
        //英語→日本語
        code.push(nonkanji(0x24));
        mode = NORMAL_MODE;
      }
      //conversion of Hiragana
      if (dakuonList.indexOf(c) >= 0) {
        //濁音 mark
        code.push(
          nonkanji(sub | 0x10),
          nonkanji(hiraganaTable[String.fromCharCode(c.charCodeAt(0) - 1)])
        );
      } else if (handakuonList.indexOf(c) >= 0) {
        //濁音 mark
        code.push(
          nonkanji(sub | 0x20),
          nonkanji(hiraganaTable[String.fromCharCode(c.charCodeAt(0) - 2)])
        );
      } else if (c in hiraganaTable) {
        if (sub !== 0) {
          code.push(nonkanji(sub));
        } else if (
          mode === NUMBER_MODE &&
          "あいうえおらりるれろ".indexOf(c) >= 0
        ) {
          //数値のあとにあ行・ら行の場合は第1つなぎ符を挿入
          code.push(nonkanji(0x24));
        }
        code.push(nonkanji(hiraganaTable[c]));
      } else {
        //だめだった
        code.push(c);
      }
      if (mode !== KATAKANA_MODE) {
        mode = NORMAL_MODE;
      }
    } else if (
      c === "." &&
      text.charAt(i + 1) === "." &&
      text.charAt(i + 2) === "."
    ) {
      // 3つの.は3点リーダ
      code.push(nonkanji(0), nonkanji(0x02), nonkanji(0x02), nonkanji(0x02));
      spaces = 1;
      i += 2;
    } else if (/^[0-9]$/.test(c)) {
      //数字
      if (mode !== NUMBER_MODE) {
        //数符
        code.push(nonkanji(0x3c));
        mode = NUMBER_MODE;
      }
      code.push(nonkanji(numberTable[c]));
    } else if (mode === NUMBER_MODE && c === ".") {
      //小数点
      code.push(nonkanji(0x02));
    } else if (mode === NUMBER_MODE && c === ",") {
      //位取り点
      code.push(nonkanji(0x04));
    } else if (c === "(") {
      // カッコ
      if (bracketLevel === 0) {
        code.push(nonkanji(0x36));
      } else {
        code.push(nonkanji(0x30), nonkanji(0x36));
      }
      bracketLevel++;
    } else if (c === ")") {
      if (bracketLevel <= 1) {
        code.push(nonkanji(0x36));
      } else {
        code.push(nonkanji(0x36), nonkanji(0x06));
      }
      bracketLevel--;
      if (bracketLevel < 0) {
        bracketLevel = 0;
      }
    } else if (c === "「") {
      if (quoteLevel === 0) {
        code.push(nonkanji(0x24));
      } else {
        code.push(nonkanji(0x30), nonkanji(0x24))
      }
      quoteLevel++;
    } else if (c === "」") {
      if (quoteLevel <= 1) {
        code.push(nonkanji(0x24));
      } else {
        code.push(nonkanji(0x24), nonkanji(0x06));
      }
      quoteLevel--;
      if (quoteLevel < 0) {
        quoteLevel = 0;
      }
    } else if (c in kigouTable) {
      code.push(...nonkanjis(kigouTable[c]));
      if (c !== "ー") {
        mode = NORMAL_MODE;
      }
    } else if (c === "、") {
      code.push(nonkanji(0x30));
      spaces = 1;
      mode = NORMAL_MODE;
    } else if (c === "。") {
      code.push(nonkanji(0x32));
      spaces = 2;
      mode = NORMAL_MODE;
    } else if (c === "・") {
      code.push(nonkanji(0x10));
      spaces = 1;
      mode = NORMAL_MODE;
    } else if (/^[a-zA-Z]$/.test(c)) {
      //アルファベット
      if (mode !== ALPHABET_MODE && mode !== CAPITAL_ALPHABET_MODE) {
        //外字符
        code.push(nonkanji(0x30));
        // アルファベットが全て大文字で連続の場合は二重大文字符を出力
        if (text.slice(i).match(/^[A-Z]{2,}(?![a-z])/)) {
          code.push(nonkanji(0x20), nonkanji(0x20));
          mode = CAPITAL_ALPHABET_MODE;
        } else {
          mode = ALPHABET_MODE;
        }
      }
      let cd = c.charCodeAt(0);
      if (cd <= 0x5a) {
        //大文字なので大文字符
        if (mode !== CAPITAL_ALPHABET_MODE) {
        code.push(nonkanji(0x20));
        }
        cd += 0x20;
      }
      code.push(nonkanji(alphabetTable[cd - 0x61]));
    } else if (c in alphabetKigouTable) {
      if (mode !== ALPHABET_MODE && mode !== CAPITAL_ALPHABET_MODE) {
        // 外字符
        code.push(nonkanji(0x30));
        mode = ALPHABET_MODE;
      }
      code.push(...nonkanjis(alphabetKigouTable[c]));
    } else if (kanji && c in kanjiTable) {
      //漢点字
      if (mode === ALPHABET_MODE || mode === CAPITAL_ALPHABET_MODE) {
        //英語→日本語
        code.push(nonkanji(0x24));
        mode = NORMAL_MODE;
      }
      code.push(...kanjiTable[c]);
    } else if (!preserveSpaces && /\s/.test(c) && !/\r|\n/.test(c)) {
      code.push(nonkanji(0));
    } else {
      code.push(text.charAt(i));
    }
  }
  //後始末
  if (kanji && mode === KATAKANA_MODE) {
    //ひらがなに戻る
    code.push(nonkanji(0x06));
  }
  return codeToTenjiString(code);

  function nonkanji(code: number): number {
    if (lowerDots) {
      return (
        ((code & 0b11) << 1) |
        ((code & 0b11000) << 1) |
        ((code & 0b100) << 4) |
        ((code & 0b100000) << 2)
      );
    } else {
      return code;
    }
  }
  function nonkanjis(code: Array<number>): Array<number> {
    return code.map(nonkanji);
  }
}

function katakanaToHiragana(c: string): string {
  if (/^[\u30a1-\u30f6]$/.test(c)) {
    //detect katakana
    return String.fromCharCode(c.charCodeAt(0) - 0x60);
  }
  return c;
}

function codeToTenjiString(code: Array<number | string>): string {
  let result = "";
  for (let i = 0, l = code.length; i < l; i++) {
    const c = code[i];
    if ("number" === typeof c) {
      result += String.fromCharCode(0x2800 + (c as number));
    } else {
      result += c;
    }
  }
  return result;
}
