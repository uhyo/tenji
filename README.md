# tenji
Converts Japanese text to 点字 (Braille).

## Installation
```bash
$ npm install tenji
```

## Usage
```js
const tenji = require('tenji');

tenji.toTenji('こんにちわ'); // '⠪⠴⠇⠗⠄'

tenji.fromTenji('⠱⠜⠒⠅⠑'); // 'さよーなら'

//Braille Kanji is supported!
tenji.toTenji('漢点字', {kanji: true}); // '⢱⢚⠷⣸⠓⢜'

tenji.fromTenji('⠱⣎⣁⠾⡤⢲⢂⠆⡲⠦⠤⡄', {kanji: true}); //'東京スカイツリー'
```

### tenji.toTenji(text [, options])
Converts Japanese text to Tenji.

#### options
- **preserveSpaces** (boolean): Preserves any space characters in text. Otherwise all spaces are converted into U+2800 (⠀). Defaults to false.
- **lowerDots** (boolean): Use lower 6 dots instead of upper 6 dots. Defaults to false. This option is force to be true if **kanji** option is enabled.
- **kanji** (boolean): Enables 漢点字 support. 
- **noNormalize** (boolean): Prevents text from being `text.normalize('NFKC')`.

### tenji.fromTenji(text [, options])
Converts Tenji to Japanese Text.

#### options
- **space** (string): Space character generated by U+2800 (⠀). Defaults to U+0020 ( ).
- **kanji** (boolean): Enables 漢点字 support.

# License
MIT

# Changelog
- **v1.0.2**: Can now convert some more 記号s.
- **v1.0.1**: Bug fix
- **v1.0.0**

# References
- http://www.yoihari.net/tenji/kantenji
- http://www.yoihari.net/tenji/tkigo.htm
- http://www.braille.jp/\_files/00006828/kaiteian.pdf
