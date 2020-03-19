/*TODO:  Неумею в js*/

function reDraw(block, mode){
    switch (mode.id) {
        case "radio":
            block.innerHTML = `
                <div class="goBack controls" onclick="goBack(document.getElementsByClassName('current')[0],  this)"><</div>
                <textarea name="" id="testArea" cols="30" rows="10"></textarea>
                <div class="answersContainer" id="AnswerContainer">
                    <div class="answer">
                        <span>a)</span>
                        <input type="text" name="" id="text" class="input">
                        <div class="radio"></div>
                        <div class="controls delete" style="display: none">-</div>
                    </div>
                </div>
                <div class="controls append" id="radio" onclick="AddAnswer(document.getElementById('AnswerContainer'), this)">+</div>
                `;
                break;
        case "checkbox":
            block.innerHTML = `
                <div class="goBack controls" onclick="goBack(document.getElementById('redactorArea'))"><</div>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <div class="answersContainer">
                        <div class="answer">
                            <span>a)</span>
                            <input type="text" name="" id="" class="input">
                            <div class="checkbox"></div>
                            <div class="controls delete" style="display:none">-</div>
                        </div>
                    </div>
                    <div class="controls append" name="checkbox" onclick="AddAnswer(document.getElementById('AnswerContainer'), this)">+</div>
                `;
            break;
        case "textbox":
            block.innerHTML = `
                <div class="goBack controls" onclick="goBack(document.getElementById('redactorArea'))"><</div>
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <input type="text" name="" id="">
                `;
            break;
    }
}

function AddAnswer(block, mode){
    const div = document.createElement('div');
    switch (mode.id) {
        case "textbox":
            div.className = 'answer';
            div.innerHTML = `
            <span>a)</span>
            <input type="text" name="" id="text" class="input">
            <div class="radio"></div>
            <div class="controls delete">-</div>
            `;
            block.append(div);
            break;
        case "checkbox":
            div.className = 'answer';
            div.innerHTML = `
            <span>a)</span>
            <input type="text" name="" id="text" class="input">
            <div class="radio"></div>
            <div class="controls delete">-</div>
            `;
            block.append(div);
            break;
        case "radio":
            div.className = 'answer';
            div.innerHTML = `
            <span>a)</span>
            <input type="text" name="" id="text" class="input">
            <div class="radio"></div>
            <div class="controls delete" onclick="delAnswer(document.getElementsByClassName('answer')[1])">-</div>
            `;
            block.append(div);
            break;
    }
}

function delAnswer(block) {
    block.remove();
}

async function AddQuestion(block){
    document.getElementsByClassName('question')[document.getElementsByClassName('question').length - 1].className = "question";
    const div = document.createElement('div');
    const t = document.getElementsByClassName('question').length + 1;
    div.id = "q_" + t;
    div.className = "question";
    div.className += " " + "current";
    div.innerHTML = `
       <h2>Выбирете тип вопроса:</h2>
    <div class="questMode" id="radio" onclick="reDraw(document.getElementById('q_${t}'),  this)"><img src="/images/radio.svg" alt=""><span>Вопрос имеющий один ответ</span></div>
    <div class="questMode" id="checkbox" onclick="reDraw(document.getElementById('q_${t}'), this)"><img src="/images/radio.svg" alt=""><span>Вопрос имеющий несколько ответов</span></div>
    <div class="questMode" id="textbox" onclick="reDraw(document.getElementById('q_${t}'), this)"><img src="/images/radio.svg" alt=""><span>Вопрос на который нужно дать письменный ответ (точное число или слово)</span></div>
    `;
    const count = document.getElementsByClassName('questBlock').length + 1;
    document.getElementById('redactorArea').append(div);
    const but = document.createElement("div");
    but.className = "questBlock";
    but.id = "QList_" + count;
    but.setAttribute("onclick", "SwitchQuestion(this)")
    but.style = "background-color: deeppink; outline-color: deeppink; margin-top: calc(5% + 10px);";
    but.innerHTML = `
    <span>ВОПРОС НАМБА</span><span class="JOPA">` + count + `</span>
    `;
    document.getElementById('q').append(but);
}

function goBack(block) {
    block.innerHTML = `
                        <h2>Выбирете тип вопроса:</h2>
                        <div class="questMode" id="radio" onclick="reDraw(document.getElementById('q_${t}'),  this)"><img src="/images/radio.svg" alt=""><span>Вопрос имеющий один ответ</span></div>
                        <div class="questMode" id="checkbox" onclick="document.getElementById('q_${t}'), this)"><img src="/images/radio.svg" alt=""><span>Вопрос имеющий несколько ответов</span></div>
                        <div class="questMode" id="textbox" onclick="document.getElementById('q_${t}'), this)"><img src="/images/radio.svg" alt=""><span>Вопрос на который нужно дать письменный ответ (точное число или слово)</span></div>
    `;
}

function SwitchQuestion(block) {
    const cur = document.getElementsByClassName('current')[0];
    cur.className = "question";
    const id = block.id.split('_');
    document.getElementsByClassName('question')[id[1] - 1].className = "question current";
}