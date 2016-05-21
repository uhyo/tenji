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

//Braille Kanji is supported!
tenji.toTenji('漢点字', {kanji: true}); // '⢱⢚⠷⣸⠓⢜'
```

### tenji.toTenji(text [, options])
Returns converted string.

#### options
- **preserveSpaces** (boolean): Preserves any space characters in text. Otherwise all spaces are converted into U+2800 (⠀). Defaults to false.
- **lowerDots** (boolean): Use lower 6 dots instead of upper 6 dots. Defaults to false. This option is force to be true if **kanji** option is enabled.
- **kanji** (boolean): Enables 漢点字 support. 
- **noNormalize** (boolean): Prevents text from being `text.normalize('NFKC')`.

# References
- http://www.yoihari.net/tenji/kantenji
- http://www.yoihari.net/tenji/tkigo.htm
