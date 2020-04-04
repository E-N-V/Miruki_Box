
function beautifulMeow(word){
    let beautiWord = '';
    for(let j = 0; j < word.length; j-=-1){
        if(word[j] == '_'){
            beautiWord += ' ';
        } else {
            beautiWord += word[j];
        }
    }
    return beautiWord;
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
    block.getElementsByTagName('h1')[0].innerText = beautifulMeow(olympName);
    block.getElementsByTagName('img')[0].setAttribute('src', '/images/'+ translateCat(olympCat) +'.png');
}

function generateQuest(questText, questType, optType, optContent, answersText){
    let generatedBlockNum = countBlocks();
    generateBody(generatedBlockNum, questText);
    generateOpt(generatedBlockNum, optType, optContent);
    generateAnswers(generatedBlockNum, questType, answersText);
    generateAnswBut(generatedBlockNum, questText);
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
    if(optType !== ''){
        switch (optType) {
            case 'image':
                optBlock = document.createElement('img');
                optBlock.setAttribute('src', '/images/tests/' + optContent);
                break;
            case 'code':
                optBlock = document.createElement('code');
                optBlock.innerHTML =`<pre>`+  testShot(optContent) +`</pre>`;
                break;
            default:
                break;
        }
        block.append(optBlock)
    }
}

function generateAnswers(num, questType, answersText){
    let block = targetBlock(num).getElementsByTagName('ul')[0];
    let answer;
    let answTag;
    switch (questType) {
        case 'radio':
            for (let i = 0; i < answersText.length; i-=-1) {
                answer = document.createElement('li');
                answTag = countAnswers(num) + 1;
                if( answTag % 2 == 0){
                    answer.style.backgroundColor = 'rgba(000,000,255,.2)'
                }else{
                    answer.style.backgroundColor = 'white'
                }
                answer.innerHTML = (`
                    <span id="answTag">`+ answTag +`)</span><p>`+ answersText[i] +`</p><input type="radio" name="answer_`+ num +`" id="answer`+ countAnswers(num) + '' + num +`" value="`+ countAnswers(num) +`">
                    <label for="answer`+ countAnswers(num) + '' + num +`">
                `);
                block.append(answer);
            }
            break;
        case 'checkbox':
            for (let i = 0; i < answersText.length; i-=-1) {
                answer = document.createElement('li');
                answTag = countAnswers(num) + 1;
                if( answTag % 2 == 0){
                    answer.style.backgroundColor = 'rgba(000,000,255,.2)'
                }else{
                    answer.style.backgroundColor = 'white'
                }
                answer.innerHTML = (`
                    <span id="answTag">`+ answTag +`)</span><p>`+ answersText[i] +`</p><input type="checkbox" name="answer_`+ num +`" id="answer`+ countAnswers(num) + '' + num +`" value="`+ countAnswers(num) +`">
                    <label for="answer`+ countAnswers(num) + '' + num +`">
                `);
                block.append(answer);
            }
            break;
        case 'textbox':
            textstring = document.createElement('p');
            textstring.innerText = 'Ответ:';
            block.append(textstring);

            answer = document.createElement('input');
            answer.type = 'text';
            answer.name= 'answer_' + num;
            answer.className= 'oneAnswer';
            block.append(answer);
            break;
        default:
            break;
    }
}

function generateAnswBut(num, text){
    let block = document.getElementsByClassName('olymp-nav')[0];
    let AnswBut = document.createElement('span');
    num === 0? AnswBut.className ='currentBut' : AnswBut.className = '';
    AnswBut.innerText = num + 1;
    AnswBut.innerText += ' ' + text;
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
    let spSymb = [32,123,125,40,41,10,40,58,61,39,34,43,45,61,47,42,94,63,33,36,35,64,38,124,92,47,60,62,46,93,91,96,59];
    for (let i = 0; i < code.length; i++) {
        if( spSymb.includes( code[i].charCodeAt() ) ) {
            switch (code[i].charCodeAt()) {
                case 34:
                case 39:
                case 96:
                    if ( cmntMode === 0 ) {
                        if ( quoteMode === 0 ) {
                            if(code[i].charCodeAt()===34){
                                quoteModeInitKey='0'
                            }else if(code[i].charCodeAt()===39){
                                quoteModeInitKey='1'
                            }else if(code[i].charCodeAt()===96){
                                quoteModeInitKey='2'
                            }
                            quoteMode = 1;
                            codeAfter += '<span class="cde-atreb">' + word + '</span>';
                            word = '';
                            codeAfter += '<span class="cde-qote">' + htmlKiller(code[i]); 
                        }else if(code[i].charCodeAt()===34 && quoteModeInitKey === '0' ){
                            quoteMode = 0;
                            codeAfter += word;
                            word = '';
                            codeAfter += htmlKiller(code[i]) + '</span>';
                        }else if(code[i].charCodeAt()===39 && quoteModeInitKey === '1' ){
                            quoteMode = 0;
                            codeAfter += word;
                            word = '';
                            codeAfter += htmlKiller(code[i]) + '</span>';
                        }else if(code[i].charCodeAt()===96 && quoteModeInitKey === '2' ){
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
                    if ( quoteMode == 0 ) {
                        if ( cmntMode == 0 ) {
                            if(  code[i].charCodeAt() == 47 && code[i+1].charCodeAt() == 42 || code[i].charCodeAt() == 60 && code[i+1].charCodeAt() == 33 && code[i+2].charCodeAt() == 45 && code[i+3].charCodeAt() == 45 || code[i].charCodeAt() == 47 && code[i+1].charCodeAt() == 47 ){
                                if(code[i].charCodeAt() == 47 && code[i+1].charCodeAt() == 42){
                                    cmntModeInitKey = 0;
                                }else if(code[i].charCodeAt() == 60 && code[i+1].charCodeAt() == 33 && code[i+2].charCodeAt() == 45 && code[i+3].charCodeAt() == 45){
                                    cmntModeInitKey = 1;
                                }else if(code[i].charCodeAt() == 47 && code[i+1].charCodeAt() == 47){
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
                            if(code[i-1].charCodeAt() == 42 && code[i].charCodeAt() == 47 && cmntModeInitKey == '0' ){
                                cmntMode = 0;
                                codeAfter += word;
                                word = '';
                                codeAfter += htmlKiller(code[i]) + '</span>';
                            }else if(code[i].charCodeAt() == 10 && cmntModeInitKey == '2'){
                                cmntMode = 0;
                                codeAfter += word;
                                word = '';
                                codeAfter += htmlKiller(code[i]) + '</span>';

                            }else if(i < 2 && code[i].charCodeAt() == 62){
                                if( code[i-2].charCodeAt() == 45 && code[i-1].charCodeAt() == 45 && code[i].charCodeAt() == 62 && cmntModeInitKey == '1'){
                                    cmntMode = 0;
                                    codeAfter += word;
                                    word = '';
                                    codeAfter += htmlKiller(code[i]) + '</span>';
                                }else{
                                    word += htmlKiller(code[i]);
                                }
                            }else{
                                word += htmlKiller(code[i]);
                            }
                        }
                    }
                    break;
                case 40:
                    if ( cmntMode == 0 && quoteMode == 0) {
                        codeAfter += '<span class="cde-func">'+ word +'</span>' + htmlKiller(code[i]) ;
                        word = '';
                    }else{
                        word += htmlKiller(code[i]);
                    }
                    break;
                default:
                    if ( cmntMode == 0 && quoteMode == 0) {
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

function translateCat(name){
    switch (name) {
        case 'programming':
            name = 'prog'
            break;
        case 'office':
            name = 'office'
            break;
        case 'architecture':
            name = 'arch'
            break;
        case 'graphics':
            name = 'art'
            break;
        case 'mechanic':
            name = 'mech'
            break;
        case 'svarka':
            name = 'weld'
            break;
    
        default:
            name = 'error'
            break;
    }
    return name;
}
/*
                    programming: [],
                    office: [],
                    architecture: [],
                    graphics: [],
                    mechanic: [],
                    svarka: []*/


/*Тута preparation*/

function MainIN(num){
    let prepare = document.getElementsByClassName('preparation')[0];
    if(num === 0){
        document.getElementsByTagName('body')[0].style.overflowY = 'initial';
        prepare.style.display = 'none';

    } else {
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
        prepare.style.display = 'flex';
    }
}