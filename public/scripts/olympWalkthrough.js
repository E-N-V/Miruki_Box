
//TODO: Просто заполни
generateOlymp(4)

function generateOlymp(questAmount){
    let code = `function lol(){
    kek{
        fdf
    }
}`
    let img ='/images/затычка.png'
    let answersTest = ['Никак', 'Учи философию', 'Тыж программист!', 'AVE MARIA']
    let tagsTest = ['4'];
    generateHead('Имя олимпиады', 'prog');
    for (let k = 0; k < questAmount; k++) {
        generateQuest('Как жить?', 'checkbox', 'nothing', 'sideContent', answersTest, tagsTest);
    }
}

function getCurrentBlockNum(){
    var qstBlocks = document.getElementsByClassName('question');
    for(qstBlock = 0; qstBlock <= qstBlocks.length; qstBlock-=-1){
        if(qstBlocks[qstBlock].className == 'question current'){
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
    num == 0 ? quest.setAttribute('class', 'question current') : quest.setAttribute('class', 'question');
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
    if(optType != 'nothing'){
        switch (optType) {
            case 'image':
                optBlock = document.createElement('img');
                optBlock.setAttribute('src', optContent);
                break;
            case 'code':
                optBlock = document.createElement('code');
                optBlock.innerHTML =`<pre>`+ optContent +`</pre>`;
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
                answTag = countAnswers(num) + 1
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
                answTag = countAnswers(num) + 1
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
    num == 0? AnswBut.className ='currentBut' : AnswBut.className = '';
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