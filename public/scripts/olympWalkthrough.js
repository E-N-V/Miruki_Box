function generateOlymp(questAmount){
    let code = `function getCurrentBlockNum(){
    var qstBlocks = document.getElementsByClassName('question');
    for(qstBlock = 0; qstBlock <= qstBlocks.length; qstBlock-=-1){
        if(qstBlocks[qstBlock].className == 'question current'){
            return qstBlock;
        }
    }
}
    `;
    let example = `<>`;
    let img ='/images/затычка.png';
    let answersTest = ['Никак', 'Учи философию', 'Тыж программист!', 'AVE MARIA'];
    let tagsTest = ['4'];
    generateHead('Имя олимпиады', 'prog');
    for (let k = 0; k < questAmount; k++) {
        generateQuest('Как жить?', 'radio', 'code', code, answersTest, tagsTest);
    }
}

function getCurrentBlockNum(){
    var qstBlocks = document.getElementsByClassName('question');
    for(qstBlock = 0; qstBlock <= qstBlocks.length; qstBlock-=-1){
        if(qstBlocks[qstBlock].className === 'question current'){
            return qstBlock;
        }
    }
}

function currentBlock(){
    return document.getElementsByClassName('current')[0];
}

function countBlocks(){
    return document.getElementsByClassName('question').length;
}

function targetBlock(num){
    return document.getElementsByClassName('question')[num];
}

function countAnswers(num){
    return targetBlock(num).getElementsByTagName('li').length;
}

function generateHead(olympName, olympCat){
    block = document.getElementsByClassName('olymp-head')[0];
    block.getElementsByTagName('h1')[0].innerText = olympName;
    block.getElementsByTagName('img')[0].setAttribute('src', '/images/'+ olympCat +'.png');
}

function generateQuest(questText, questType, optType, optContent, answersText, answersRightTags){
    let generatedBlockNum = countBlocks();
    generateBody(generatedBlockNum, questText);
    generateOpt(generatedBlockNum, optType, optContent);
    generateAnswers(generatedBlockNum, questType, answersText, answersRightTags);
    generateAnswBut(generatedBlockNum);
}

function generateBody(num, questText){
    let quest = document.createElement('div');
    let questNum = num + 1;
    num === 0 ? quest.setAttribute('class', 'question current') : quest.setAttribute('class', 'question');
    quest.innerHTML = (`
        <div class="olymp-question">
            <h2>Вопрос номер <span id="questNum">`+ questNum +`</span></h2>
            <h3 id="questionText">`+ questText +`</h2>
        </div>
        <div class="olymp-answers">
            <ul>
            </ul>
        </div>
    `);
    document.getElementsByClassName('olymp-body')[0].append(quest);
}

function generateOpt(num, optType, optContent){
    let block = targetBlock(num).getElementsByClassName('olymp-question')[0];
    let optBlock;
    if(optType !== 'nothing'){
        switch (optType) {
            case 'image':
                optBlock = document.createElement('img');
                optBlock.setAttribute('src', optContent);
                break;
            case 'code':
                optBlock = document.createElement('code');
                optBlock.innerHTML =`<pre>`+ codeEater(optContent) +`</pre>`;
                break;
            default:
                break;
        }
        block.append(optBlock)
    }
}

function generateAnswers(num, questType, answersText, answersRightTags){
    let block = targetBlock(num).getElementsByTagName('ul')[0];
    let answer;
    let answTag;
    switch (questType) {
        case 'radio':
            for (let i = 0; i < answersText.length; i-=-1) {
                answer = document.createElement('li');
                answTag = countAnswers(num) + 1;
                answer.innerHTML = (`
                    <span id="answTag">`+ answTag +`)</span>`+ answersText[i] +`<input type="radio" name="answer`+ num +`" id="answer`+ countAnswers(num) + '' + num +`" value="`+ countAnswers(num) +`">
                    <label for="answer`+ countAnswers(num) + '' + num +`">
                `);
                block.append(answer);
            }
            break;
        case 'checkbox':
            for (let i = 0; i < answersText.length; i-=-1) {
                answer = document.createElement('li');
                answTag = countAnswers(num) + 1;
                answer.innerHTML = (`
                    <span id="answTag">`+ answTag +`)</span>`+ answersText[i] +`<input type="checkbox" name="answer`+ num +`" id="answer`+ countAnswers(num) + '' + num +`" value="`+ countAnswers(num) +`">
                    <label for="answer`+ countAnswers(num) + '' + num +`">
                `);
                block.append(answer);
            }
            break;
        case 'textbox':
            answer = document.createElement('input');
            answer.name= 'answer' + num;
            answer.className= 'oneAnswer';
            block.append(answer);
            break;
        default:
            break;
    }
}

function generateAnswBut(num){
    let block = document.getElementsByClassName('olymp-nav')[0];
    let AnswBut = document.createElement('span');
    AnswBut.innerText = num + 1;
    num === 0? AnswBut.className ='currentBut' : AnswBut.className = '';
    AnswBut.innerText = num + 1;
    AnswBut.setAttribute('onclick', 'questSwap('+ num +')');
    block.append(AnswBut);
}

function questSwap(num){
    let block = document.getElementsByClassName('olymp-nav')[0];
    let answbuts = block.getElementsByTagName('span');
    for (let l = 0; l < countBlocks(); l++) {
        targetBlock(l).setAttribute('class', 'question');
        answbuts[l].setAttribute('class', '');
    }
    answbuts[num].setAttribute('class', 'currentBut');
    targetBlock(num).setAttribute('class', 'question current');
}

/*
32 - пробел
123,125 {}
40,41 ()
10 энтер
40 .
58 :
61 =
39 '
34 "
43 +
45 -
61 = 
47 /
42 *
94 ^
63 ?
33 !
36 $
35 #
64 @
38 &
124 |
92 \
47 /
32*4 = TAB
60, 62 <>
*/

function nextSS(code, coord){
    let spSymb = [32,123,125,40,41,10,40,58,61,39,34,43,45,61,47,42,94,63,33,36,35,64,38,124,92,47,60,62,46];
    let keycode;
    for (let l = coord; l < code.length; l++) {
        if( spSymb.includes( code[l].charCodeAt() ) ){
            keycode = code[l].charCodeAt();
            break;
        }
    }
    return keycode
}

function prevSS(code, coord){
    let spSymb = [32,123,125,40,41,10,40,58,61,39,34,43,45,61,47,42,94,63,33,36,35,64,38,124,92,47,60,62];
    let keycode = '';
    for (let l = coord; l > -1; l--) {
        if( spSymb.includes( code[l].charCodeAt() ) ){
            keycode = code[l].charCodeAt();
            break;
        }
    }
    return keycode
}

function htmlKiller(char){
    if(char === '<'){

        char = '&lt;'
    }else if(char === '>'){

        char = '&gt;'
    }
    return char
}

function testShot(code){
    let codeAfter = '';
    let word = '';
    let cmntMode = 0;
    let cmntModeInitKey = '';
    let quoteMode = 0;
    let quoteModeInitKey = '';
    let spSymb = [32,123,125,40,41,10,40,58,61,39,34,43,45,61,47,42,94,63,33,36,35,64,38,124,92,47,60,62,46,93,91,96];
    for (let i = 0; i < code.length; i++) {
        if( spSymb.includes( code[i].charCodeAt() ) ) {
            switch (code[i].charCodeAt()) {
                case 34:
                case 39:
                case 96:
                    if ( cmntMode === 0 ) {
                        if ( quoteMode === 0 ) {
                            if(code[i].charCodeAt()===34){
                                cmntModeInitKey='0'
                            }else if(code[i].charCodeAt()===39){
                                cmntModeInitKey='1'
                            }else if(code[i].charCodeAt()===96){
                                cmntModeInitKey='2'
                            }
                            quoteMode = 1;
                            codeAfter += '<span class="cde-atreb">' + word + '</span>';
                            word = '';
                            codeAfter += '<span class="cde-qote">' + htmlKiller(code[i]); 
                        }else if(code[i].charCodeAt()===34 && cmntModeInitKey === '0' ){
                            quoteMode = 0;
                            codeAfter += word;
                            word = '';
                            codeAfter += htmlKiller(code[i]) + '</span>';
                        }else if(code[i].charCodeAt()===39 && cmntModeInitKey === '1' ){
                            quoteMode = 0;
                            codeAfter += word;
                            word = '';
                            codeAfter += htmlKiller(code[i]) + '</span>';
                        }else if(code[i].charCodeAt()===96 && cmntModeInitKey === '2' ){
                            quoteMode = 0;
                            codeAfter += word;
                            word = '';
                            codeAfter += htmlKiller(code[i]) + '</span>';
                        }
                    }else{
                        word += htmlKiller(code[i]);
                    }
                    break;
                    case 60:
                    case 62:
                    case 47:
                    case 10:
                    case 42:
                    case 45:
                    if ( quoteMode === 0 ) {

                        if ( cmntMode === 0 ) {
                            if(  code[i].charCodeAt() === 47 && code[i+1].charCodeAt() === 42 || code[i].charCodeAt() === 60 && code[i+1].charCodeAt() === 33 && code[i+2].charCodeAt() === 45 && code[i+3].charCodeAt() === 45 || code[i].charCodeAt() === 47 && code[i+1].charCodeAt() === 47 ){
                                if(code[i].charCodeAt() === 47 && code[i+1].charCodeAt() === 42){
                                    cmntModeInitKey = 0;
                                }else if(code[i].charCodeAt() === 60 && code[i+1].charCodeAt() === 33 && code[i+2].charCodeAt() === 45 && code[i+3].charCodeAt() === 45){
                                    cmntModeInitKey = 1;
                                }else if(code[i].charCodeAt() === 47 && code[i+1].charCodeAt() === 47){
                                    cmntModeInitKey = 2;
                                }
                                cmntMode = 1;
                                codeAfter += '<span class="cde-atreb">' + word + '</span>';
                                word = '';
                                codeAfter += '<span class="cde-cmnt">' + htmlKiller(code[i]);

                            }else{

                                word += htmlKiller(code[i]);
                            }
                        }else{
                            if(code[i-1].charCodeAt() === 42 && code[i].charCodeAt() === 47 && cmntModeInitKey === '0' ){

                                cmntMode = 0;
                                codeAfter += word;

                                word = '';
                                codeAfter += htmlKiller(code[i]) + '</span>';

                            }else if( code[i-2].charCodeAt() === 45 && code[i-1].charCodeAt() === 45 && code[i].charCodeAt() === 62 && cmntModeInitKey === '1'){
                                
                                cmntMode = 0;
                                codeAfter += word;

                                word = '';
                                codeAfter += htmlKiller(code[i]) + '</span>';

                            }else if(code[i].charCodeAt() === 10 && cmntModeInitKey === '2'){
                                
                                cmntMode = 0;
                                codeAfter += word;

                                word = '';
                                codeAfter += htmlKiller(code[i]) + '</span>';

                            }else{

                                word += htmlKiller(code[i]);
                            }
                        }
                    }
                    break;
                case 40:
                    if ( cmntMode === 0 && quoteMode === 0) {
                        codeAfter += '<span class="cde-func">'+ word +'</span>' + htmlKiller(code[i]) ;
                        word = '';
                    }else{
                        word += htmlKiller(code[i]);
                    }
                    break;
                default:
                    if ( cmntMode === 0 && quoteMode === 0) {
                        if(word !== ''){
                            codeAfter += '<span class="cde-atreb">'+ word +'</span>' + htmlKiller(code[i]) ;
                        }else{
                            codeAfter += htmlKiller(code[i]);
                        }
                        word = '';
                    }else{
                        word += htmlKiller(code[i]);
                    }
                    break;
            }
        }else{
            word += htmlKiller(code[i]);
        }
    }

    return codeAfter
}



function codeEater(code){
    code = testShot(code);
    return code;
}