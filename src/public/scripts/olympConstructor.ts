import { type } from "os";

function refresh(){
    const qd:any = document.getElementsByClassName('delete-question')
    for (let i = 0; i < qd.length; i++) {
        qd[i].onclick = 'deleteQuest(' + i + ')';
    }
    const da:any = document.getElementsByClassName('delete-answer')
    for (let i = 0; i < da.length; i++) {
        da[i].setAttribute('onclick', 'deleteAnswer(' + i + ')')
    }
    const ca:any = document.getElementsByClassName('create-answer')
    for (let i = 0; i < ca.length; i++) {
        ca[i].setAttribute('onclick', 'createAnswer(' + i + ')')
    }
    const anty:any = document.getElementsByClassName('answ_types')
    var k:any = 0
    for (let i = 0; i < anty.length; i++) {
        k = anty[i].getElementsByTagName('input')
        k[0].setAttribute('onclick', 'changeAnswerType('+ i +',"radio")')
        k[1].setAttribute('onclick', 'changeAnswerType('+ i +',"checkbox")')
        k[2].setAttribute('onclick', 'changeAnswerType('+ i +',"text")')
    }
    const p:any = document.getElementsByClassName('p')
    let l:any = 0;
    for (let i = 0; i < p.length; i++) {
        l = i + 1
        p[i].innerHTML = l;
    }
}

function catChange(num:any){
    const names = ['Программирование', 'Офисное ПО','Архитектура','Сварка','Механика','Графическое ПО']
    const catName:any = document.getElementById('cat-name')
    catName.innerHTML = names[num]
}

function deleteQuest(num:any){
    const quests:any = document.getElementsByClassName('question')
    quests[num].remove()
    refresh()
}

function deleteAnswer(num:any){
    const answers:any = document.getElementsByClassName('answer')
    answers[num].remove()
    const da:any = document.getElementsByClassName('delete-answer')
    refresh()
}

function createAnswer(num:any){
    const answersBlocks:any = document.getElementsByClassName('answers')
    const qsAm:any = num + 1
    const type:any = document.getElementsByName('answer-type_' + qsAm)[0]
    let answ:any = answersBlocks[num].getElementsByClassName('answer')
    answ = answ.length+1
    let answer = document.createElement('div');
    answer.setAttribute('class','answer');
    answer.innerHTML = `
        <input type="text" name="answer_`+ answ +`_` + qsAm + `" placeholder="Ответ">
        <input type="`+ type.value +`" name="right-answer_` + qsAm + `" value="` + answ + `" id="answer_` + answ + `_` + qsAm + `">
        <label for="answer_` + answ + `_` + qsAm + `"></label>
        <div class="delete-answer" onclick="deleteAnswer(0)"></div>
        `;
    answersBlocks[num].append(answer);
    refresh()
}

function changeAnswerType(num:any, type:any){
    //был додиком не понял в чём пранк
    if (type == 'text') {
        const hiNum:any = num + 1
        const answerBlock:any = document.getElementsByClassName('answers')
        const answers:any = answerBlock[num].getElementsByClassName('answer')
        for (let i = answers.length - 1; i > -1; i--) {
            answers[i].remove();
        }
        const typeBlock:any = document.getElementsByName('answer-type_' + hiNum )[0]
        let answer = document.createElement('div');
        answer.setAttribute('class','answer');
        answer.innerHTML = `
            <input type="text" name="answer_`+ hiNum + `" placeholder="Ответ">
            `;
        answerBlock[num].append(answer);
    refresh()
    }else{
        const hiNum:any = num + 1
        const answerBlock:any = document.getElementsByClassName('answers')
        const answers:any = answerBlock[num].getElementsByClassName('answer')
        for (let i = answers.length - 1; i > -1; i--) {
            answers[i].remove();
        }
        const typeBlock:any = document.getElementsByName('answer-type_' + hiNum )[0]
        typeBlock.value = type
        createAnswer(num)
        refresh()
    }
    refresh()
}

function typeChoose (num:any,type:any){
    //тут стал умным
    const hiNum:any = num + 1
    const typeBlock:any = document.getElementsByName('opt-content-type_' + hiNum )[0]
    const target:any = document.getElementsByClassName('opt-content-values')[num]
    switch (type) {
        case 'nothing':
            target.innerHTML =''
            break;
        case 'code':
            target.innerHTML='<textarea name="opt-content_2", cols="30", rows="10" placeholder="Код">'
            break;
        case 'image':
            target.innerHTML='<input type="file", name="opt-content_1">'
            break;
    
        default:
            break;
    }
}

function toddDuty(){
    let num:any = document.getElementsByClassName('question')
    num = num.length
    let hiNum:any = num +1
    const target:any = document.getElementsByClassName('olymp-body')[0]
    let quest = document.createElement('div');
    quest.setAttribute('class','question');
    quest.innerHTML = `
    <div class="question"><span>
        <p class="p">1</p>
        <div class="delete-question" onclick="deleteQuest(`+num+`)">-</div>
        <div class="answ_types"><input type="radio" name="answer-type_`+hiNum+`" value="radio" id="answer-type_1_`+hiNum+`"
                onclick="changeAnswerType(`+num+`,'radio')"><label for="answer-type_1_`+hiNum+`"></label><input type="radio"
                name="answer-type_`+hiNum+`" value="checkbox" id="answer-type_2_`+hiNum+`"
                onclick="changeAnswerType(`+num+`,'checkbox')"><label for="answer-type_2_`+hiNum+`"></label><input type="radio"
                name="answer-type_`+hiNum+`" value="text" id="answer-type_3_`+hiNum+`" onclick="changeAnswerType(`+num+`,'text')"><label
                for="answer-type_3_`+hiNum+`"></label></div>
    </span><input class="question-text" type="text" name="question_`+hiNum+`" placeholder="Вопрос">
    <div class="answers">
        <div class="answer"><input type="text" name="answer_1_`+hiNum+`" placeholder="Ответ"><input type="radio"
                name="right-answer_`+hiNum+`" value="1" id="answer_1_`+hiNum+`"><label for="answer_1_`+hiNum+`"></label>
            <div class="delete-answer" onclick="deleteAnswer(0)"></div>
        </div>
        <div class="answer"><input type="text" name="answer_2_`+hiNum+`" placeholder="Ответ"><input type="radio"
                name="right-answer_`+hiNum+`" value="2" id="answer_2_`+hiNum+`"><label for="answer_2_`+hiNum+`"></label>
            <div class="delete-answer" onclick="deleteAnswer(1)"></div>
        </div>
        <div class="answer"><input type="text" name="answer_3_`+hiNum+`" placeholder="Ответ"><input type="radio"
                name="right-answer_`+hiNum+`" value="3" id="answer_3_`+hiNum+`"><label for="answer_3_`+hiNum+`"></label>
            <div class="delete-answer" onclick="deleteAnswer(2)"></div>
        </div>
    </div>
    <div class="create-answer" onclick="createAnswer(`+num+`)"></div>
    <div class="opt-content">
        <div class="type-choose"><input type="radio" name="opt-content-type_`+hiNum+`" value="nothing" id="opt-content-type_1_`+hiNum+`"
                onclick="typeChoose(`+num+`,'nothing')" checked=""><label for="opt-content-type_1_`+hiNum+`"></label><input
                type="radio" name="opt-content-type_`+hiNum+`" value="code" id="opt-content-type_2_`+hiNum+`"
                onclick="typeChoose(`+num+`,'code')"><label for="opt-content-type_2_`+hiNum+`"></label><input type="radio"
                name="opt-content-type_`+hiNum+`" value="image" id="opt-content-type_3_`+hiNum+`" onclick="typeChoose(`+num+`,'image')"><label
                for="opt-content-type_3_`+hiNum+`"></label></div>
        <div class="opt-content-values"></div>
    </div>
</div>
        `;
    target.append(quest);
    refresh()
}
