function catChange(num:any){
    const names = ['Программирование', 'Офисное ПО','Архитектура','Сварка','Механика','Графическое ПО']
    const catName:any = document.getElementById('cat-name')
    catName.innerHTML = names[num]
}

function deleteQuest(num:any){
    const quests:any = document.getElementsByClassName('question')
    quests[num].remove()
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
}

function deleteAnswer(num:any){
    const answers:any = document.getElementsByClassName('answer')
    answers[num].remove()
    const da:any = document.getElementsByClassName('delete-answer')
    for (let i = 0; i < answers.length; i++) {
        da[i].setAttribute('onclick', 'deleteAnswer(' + i + ')')
    }
}

function createAnswer(num:any){
    const answersBlocks:any = document.getElementsByClassName('answers')
    const answers:any = document.getElementsByClassName('answer')
    const anAm:any = answers.length
    const qsAm:any = num
    const answ:any = answersBlocks.getElementsByClassName('answer')
    let answer = document.createElement('div');
    answer.setAttribute('class','answer');
    answer.innerHTML = `
        input(type="text", name="answer_`+ answ.length +`_` + qsAm + `" placeholder="Ответ")
        input(type="radio", name="right-answer_` + qsAm + `" value="` + answ.length + `" id="answer_` + answ.length + `_` + qsAm + `")
        label(for="answer_` + answ.length + `_` + qsAm + `")
        .delete-answer(onclick="deleteAnswer(` + anAm +`)")
        `;
    answersBlocks[num].append(answer);
}