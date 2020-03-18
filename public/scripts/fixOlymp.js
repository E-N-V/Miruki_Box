function reDraw(block, mode){
    switch (mode.id) {
        case "radio":
            block.innerHTML = `
                <button class="goBack controls" onclick="goBack(document.getElementById('redactorArea'))"><</button>
                <textarea name="" id="testArea" cols="30" rows="10"></textarea>
                <div class="answersContainer" id="AnswerContainer">
                    <div class="answer">
                        <span>a)</span>
                        <input type="text" name="" id="text" class="input">
                        <div class="radio"></div>
                        <button class="controls delete" style="display: none">-</button>
                    </div>
                </div>
                <button class="controls append" name="radio" onclick="AddAnswer(document.getElementById('AnswerContainer'), this)">+</button>
                `;
                break;
        case "checkbox":
            block.innerHTML = `
                <button class="goBack controls" onclick="goBack(document.getElementById('redactorArea'))"><</button>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <div class="answersContainer">
                        <div class="answer">
                            <span>a)</span>
                            <input type="text" name="" id="" class="input">
                            <div class="checkbox"></div>
                            <button class="controls delete" style="display:none">-</button>
                        </div>
                    </div>
                    <button class="controls append" name="checkbox" onclick="AddAnswer(document.getElementById('AnswerContainer'), this)">+</button>
                `;
            break;
        case "textbox":
            block.innerHTML = `
                <button class="goBack controls" onclick="goBack(document.getElementById('redactorArea'))"><</button>
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <input type="text" name="" id="">
                `;
            break;
    }
}

function AddAnswer(block, mode){
    const div = document.createElement('div');
    switch (mode.name) {
        case "textbox":
            div.className = 'answer';
            div.innerHTML = `
            <span>a)</span>
            <input type="text" name="" id="text" class="input">
            <div class="radio"></div>
            <button class="controls delete">-</button>
            `;
            block.append(div);
            break;
        case "checkbox":
            div.className = 'answer';
            div.innerHTML = `
            <span>a)</span>
            <input type="text" name="" id="text" class="input">
            <div class="radio"></div>
            <button class="controls delete">-</button>
            `;
            block.append(div);
            break;
        case "radio":
            div.className = 'answer';
            div.innerHTML = `
            <span>a)</span>
            <input type="text" name="" id="text" class="input">
            <div class="radio"></div>
            <button class="controls delete" onclick="delAnswer(document.getElementsByClassName('answer')[1])">-</button>
            `;
            block.append(div);
            break;
    }
}

function delAnswer(block) {
    block.remove();
}

function AddQuestion(block){
    const div = document.createElement('div');
    div.id = "question";
    div.className = "question";
    div.innerHTML = `
       <h2>Выбирете тип вопроса:</h2>
    <button class="questMode" id="radio" onclick="reDraw(document.getElementById('question'),  this)"><img src="/images/radio.svg" alt=""><span>Вопрос имеющий один ответ</span></button>
    <button class="questMode" id="checkbox" onclick="reDraw(document.getElementById('question'), this)"><img src="/images/radio.svg" alt=""><span>Вопрос имеющий несколько ответов</span></button>
    <button class="questMode" id="textbox" onclick="reDraw(document.getElementById('question'), this)"><img src="/images/radio.svg" alt=""><span>Вопрос на который нужно дать письменный ответ (точное число или слово)</span></button>
    `;
    const count = document.getElementsByClassName('questBlock').length;
    document.getElementById('redactorArea').append(div);
    block.style.display = "none";
    const but = document.createElement("div");
    but.className = "questBlock";
    but.id = "QList_" + count;
    but.style = "background-color: deeppink; outline-color: deeppink; margin-top: calc(5% + 10px);";
    but.innerHTML = `
    <span>ВОПРОС НАМБА</span><span class="JOPA">` + count + `</span>
    `;
    document.getElementById('q').append(but);
}

function goBack(block) {
    block.innerHTML = `
    <div class="question" id="question">
                    <h2>Выбирете тип вопроса:</h2>
                    <button class="questMode" id="radio" onclick="reDraw(document.getElementById('question'),  this)"><img src="/images/radio.svg" alt=""><span>Вопрос имеющий один ответ</span></button>
                    <button class="questMode" id="checkbox" onclick="reDraw(document.getElementById('question'), this)"><img src="/images/radio.svg" alt=""><span>Вопрос имеющий несколько ответов</span></button>
                    <button class="questMode" id="textbox" onclick="reDraw(document.getElementById('question'), this)"><img src="/images/radio.svg" alt=""><span>Вопрос на который нужно дать письменный ответ (точное число или слово)</span></button>
                </div>
    `;
}

function SwitchQuestion(block) {
    const id = block.id.split('_')[1];
    document.getElementsByClassName('')[id].style.display = "block";
    //TODO: Доделать скрытие блоков.
    // document.getElementsByClassName('').style.display = "none";
}