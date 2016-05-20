import {
    hiraganaTable,
    dakuonList,
    handakuonList,
    yoonTable,
    goyoonTable,
} from './table';

export interface ToTenjiOptions {
}
export function toTenji(text:string, options:ToTenjiOptions={}):string{
    const code:Array<number> = [];

    for(let i=0, l=text.length; i<l; i++){
        let c = katakanaToHiragana(text.charAt(i));
        if(/^[\u3041-\u3094]$/.test(c)){
            //前につける符号
            let sub = 0;
            const c2 = katakanaToHiragana(text.charAt(i+1));
            if((c2==='ゃ' || c2==='ゅ' || c2==='ょ' || c2==='ぇ') && (c in yoonTable)){
                //拗音
                sub = 8;
                c = yoonTable[c].charAt('ゃゅょぇ'.indexOf(c2));
                i++;
            }else if((c2==='ぁ' || c2==='ぃ' || c2==='ぇ' || c2==='ぉ') && (c in goyoonTable)){
                //合拗音
                sub = 0x22;
                c = goyoonTable[c].charAt('ぁぃぇぉ'.indexOf(c2));
                i++;
            }else if(c2==='ぇ' && c==='い'){
                //特例処理
                sub = 8;
                c = 'え';
                i++;
            }else if(c2==='ぃ' && (c==='す' || c==='て')){
                sub = 8;
                c = (c==='す' ? 'し' : 'ち');
                i++;
            }else if(c2==='ぃ' && (c==='ず' || c==='で')){
                sub = 0x18;
                c = (c==='ず' ? 'じ' : 'ぢ');
                i++;
            }else if(c2==='ぅ' && (c==='と' || c==='ど')){
                //トゥットゥルー
                sub = c==='と' ? 0x22 : 0x32;
                c = 'つ';
                i++;
            }else if(c2==='ゅ' && c==='て'){
                sub = 0x28;
                c = 'つ';
                i++;
            }else if(c2==='ゅ' && c==='で'){
                sub = 0x38;
                c = 'つ';
                i++;
            }else if(c2==='ゅ' && c==='ふ'){
                sub = 0x28;
                c = 'ゆ';
                i++;
            }else if(c2==='ゅ' && c==='ゔ'){
                sub = 0x38;
                c = 'ゆ';
                i++;
            }else if(c2==='ょ' && c==='ふ'){
                sub = 0x28;
                c = 'よ';
                i++;
            }else if(c2==='ょ' && c==='ゔ'){
                sub = 0x38;
                c = 'よ';
                i++;
            }else if(c==='ゔ'){
                sub = 0x10;
                c = 'う';
            }
            //conversion of Hiragana
            if(dakuonList.indexOf(c)>=0){
                //濁音 mark
                code.push(sub | 0x10, hiraganaTable[String.fromCharCode(c.charCodeAt(0)-1)]);
            }else if(handakuonList.indexOf(c)>=0){
                //濁音 mark
                code.push(sub | 0x20, hiraganaTable[String.fromCharCode(c.charCodeAt(0)-2)]);
            }else if(c in hiraganaTable){
                if(sub !== 0){
                    code.push(sub);
                }
                code.push(hiraganaTable[c]);
            }
        }
    }
    return codeToTenjiString(code);
}

function katakanaToHiragana(c:string):string{
    if(/^[\u30a1-\u30f4]$/.test(c)){
        //detect katakana
        return String.fromCharCode(c.charCodeAt(0) - 0x60);
    }
    return c;
}


function codeToTenjiString(code:Array<number>):string{
    let result = '';
    for(let i=0, l=code.length; i<l; i++){
        result += String.fromCharCode(0x2800 + code[i]);
    }
    return result;
}
