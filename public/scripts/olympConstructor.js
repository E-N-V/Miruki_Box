/*TODO:  Неумею в js*/

function getCurrentBlockNum(){
    var qstBlocks = document.getElementsByClassName('question');
    for(qstBlock = 0; qstBlock <= qstBlocks.length; qstBlock-=-1){
        if(qstBlocks[qstBlock].className == 'question current'){
            return qstBlock;
        }
    }
}


function checkBoxChpok(){
    let current = document.getElementsByClassName('current')[0];
    let boxes = document.getElementsByClassName('checkBox');
    let input = document.createElement('input');
    let checkdiv = current.getElementsByClassName('checkbox');//some ninja code )0))
    checkdiv = checkdiv[checkdiv.length - 1]
    input.setAttribute("class", 'checkBox');
    input.type = 'checkbox';
    input.name = ''; 
    input.id = 'inpId' + getCurrentBlockNum()+ '' + boxes.length;
    checkdiv.append(input);
    let label = document.createElement('label');
    label.setAttribute("for", input.id );
    checkdiv.append(label);
}

function RadioChpok(){
    let current = document.getElementsByClassName('current')[0];
    let boxes = document.getElementsByClassName('Radio');
    let input = document.createElement('input');
    let checkdiv = current.getElementsByClassName('radio');//some ninja code )0))
    checkdiv = checkdiv[checkdiv.length - 1]
    input.setAttribute("class", 'Radio');
    input.type = 'radio';
    input.name = 'radios' + getCurrentBlockNum();
    input.id = 'inpId' + getCurrentBlockNum()+ '' + boxes.length;
    checkdiv.append(input);
    let label = document.createElement('label');
    label.setAttribute("for", input.id );
    checkdiv.append(label);
}

function reDraw(block, mode){
    switch (mode.id) {
        case "radio":
            block.innerHTML = `
                <div class="goBack controls" onclick="goBack(document.getElementsByClassName('current')[0])"><</div>
                <textarea name="" id="testArea" cols="30" rows="10" placeholder="Вопрос"></textarea>
                <div class="questOptions">
                    <div class="optional">
                        <ul>
                            <li onclick="optModeSwap(0)"><input value='nothing' class='opt-mode' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode0`+ getCurrentBlockNum() +`" checked>
                            <label for="opt-mode0`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(1)"><input value='image' class='opt-mode' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode1`+ getCurrentBlockNum() +`">
                            <label for="opt-mode1`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(2)"><input value='code' class='opt-mode' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode2`+ getCurrentBlockNum() +`">
                            <label for="opt-mode2`+ getCurrentBlockNum() +`"></li>
                        </ul>
                    </div>
                    <div class="answersContainer" id="AnswerContainer">
                        <div class="answer">
                            <span>1)</span>
                            <input type="text" name="" id="text" class="input" placeholder="Ответ">
                            <div class="radio"></div>
                            <div class="controls delete" style="display: none">-</div>
                        </div>
                    </div>
                </div>
                <div class="controls append" id="radio" onclick="AddAnswer(document.getElementsByClassName('question')[`+ getCurrentBlockNum() +`].getElementsByClassName('answersContainer')[0], this)">+</div>
                `;
                RadioChpok();
                break;
        case "checkbox":
            block.innerHTML = `
                <div class="goBack controls" onclick="goBack(document.getElementsByClassName('current')[0])"><</div>
                <textarea name="" id="testArea" cols="30" rows="10" placeholder="Вопрос"></textarea>
                <div class="questOptions">
                    <div class="optional">
                        <ul>
                            <li onclick="optModeSwap(0)"><input value='nothing' class='opt-mode' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode0`+ getCurrentBlockNum() +`" checked>
                            <label for="opt-mode0`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(1)"><input value='image' class='opt-mode' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode1`+ getCurrentBlockNum() +`">
                            <label for="opt-mode1`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(2)"><input value='code' class='opt-mode' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode2`+ getCurrentBlockNum() +`">
                            <label for="opt-mode2`+ getCurrentBlockNum() +`"></li>
                        </ul>
                    </div>
                    <div class="answersContainer" id="AnswerContainer">
                        <div class="answer">
                            <span>1)</span>
                            <input type="text" name="" id="text" class="input" placeholder="Ответ">
                            <div class="checkbox"></div>
                            <div class="controls delete" style="display: none">-</div>
                        </div>
                    </div>
                </div>
                <div class="controls append" id="checkbox" onclick="AddAnswer(document.getElementsByClassName('question')[`+ getCurrentBlockNum() +`].getElementsByClassName('answersContainer')[0], this)">+</div>
                `;
                checkBoxChpok()
                break;
        case "textbox":
            block.innerHTML = `
                <div class="goBack controls" onclick="goBack(document.getElementsByClassName('current')[0])"><</div>
                <textarea name="" id="" cols="30" rows="10" placeholder="Вопрос"></textarea>
                <div class="questOptions">
                    <div class="optional">
                        <ul>
                            <li onclick="optModeSwap(0)"><input value='nothing' class='opt-mode' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode0`+ getCurrentBlockNum() +`" checked>
                            <label for="opt-mode0`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(1)"><input value='image' class='opt-mode' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode1`+ getCurrentBlockNum() +`">
                            <label for="opt-mode1`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(2)"><input value='code' class='opt-mode' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode2`+ getCurrentBlockNum() +`">
                            <label for="opt-mode2`+ getCurrentBlockNum() +`"></li>
                        </ul>
                    </div>
                    <input type="text" name="" id="" class="oneAnswerInput" placeholder="Ответ">
                </div>
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
            <span>`+ (document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName('answer').length + 1) +`)</span>
            <input type="text" name="" id="text" class="input" placeholder="Ответ">
            <div class="radio"></div>
            <div class="controls delete">-</div>
            `;
            block.append(div);
            break;
        case "checkbox":
            div.className = 'answer';
            div.innerHTML = `
            <span>`+ (document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName('answer').length + 1) +`)</span>
            <input type="text" name="" id="text" class="input" placeholder="Ответ">
            <div class="checkbox"></div>
            <div class="controls delete" onclick="delAnswer(document.getElementsByClassName('question')[`+ getCurrentBlockNum() +`].getElementsByClassName('answer')[`+ document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName('answer').length +`])">-</div>
            `;
            block.append(div);
            checkBoxChpok();
            break;
        case "radio":
            div.className = 'answer';
            div.innerHTML = `
            <span>`+ (document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName('answer').length + 1) +`)</span>
            <input type="text" name="" id="text" class="input" placeholder="Ответ">
            <div class="radio"></div>
            <div class="controls delete" onclick="delAnswer(document.getElementsByClassName('question')[`+ getCurrentBlockNum() +`].getElementsByClassName('answer')[`+ document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName('answer').length +`])">-</div>
            `;
            block.append(div);
            RadioChpok();
            break;
    }
}

function delAnswer(block) {
    block.remove();
    // моё
    let ianswers = document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName("answer");
    for(iansw = 1; iansw < ianswers.length; iansw-=-1){
        ianswers[iansw].getElementsByClassName('delete')[0].setAttribute("onclick", "delAnswer(document.getElementsByClassName('question')["+ getCurrentBlockNum() +"].getElementsByClassName('answer')["+ iansw +"])")
        ianswers[iansw].getElementsByTagName('span')[0].innerText = (iansw + 1) + ')';
        ianswers[iansw].getElementsByTagName('div')[0].getElementsByTagName('input')[0].setAttribute("id", 'inpId' + getCurrentBlockNum()+ '' + iansw);
        ianswers[iansw].getElementsByTagName('div')[0].getElementsByTagName('label')[0].setAttribute("for", 'inpId' + getCurrentBlockNum()+ '' + iansw);
    }
}

async function AddQuestion(block){
    const all = document.getElementsByClassName('current');
    for(i = 0; i < all.length; i++){
        all[i].className = "question";
    }
    const div = document.createElement('div');
    const t = document.getElementsByClassName('question').length + 1;
    div.id = "q_" + t;
    div.className = "question";
    div.className += " " + "current";
    div.innerHTML = `
       <h2>Выбирете тип вопроса:</h2>
    <div class="questMode" id="radio" onclick="reDraw(document.getElementById('q_${t}'),  this)"><img src="/images/radio.svg" alt=""><span>Вопрос имеющий один ответ</span></div>
    <div class="questMode" id="checkbox" onclick="reDraw(document.getElementById('q_${t}'), this)"><img src="/images/checkbox.svg" alt=""><span>Вопрос имеющий несколько ответов</span></div>
    <div class="questMode" id="textbox" onclick="reDraw(document.getElementById('q_${t}'), this)"><img src="/images/textbox.svg" alt=""><span>Вопрос на который нужно дать письменный ответ (точное число или слово)</span></div>
    `;
    const count = document.getElementsByClassName('questBlock').length + 1;
    document.getElementById('redactorArea').append(div);
    const but = document.createElement("div");
    but.className = "questBlock";
    but.id = "QList_" + count;
    but.setAttribute("onclick", "SwitchQuestion(this)")
//my
    for(qstb = 0; qstb < document.getElementsByClassName('questBlock').length;qstb-=-1){
        document.getElementsByClassName('questBlock')[qstb].style = "background-color: violetblue;";
    }

//????    but.style = "background-color: deeppink; outline-color: deeppink; margin-top: calc(5% + 10px);";
    but.style = "background-color: deeppink;";
    but.innerHTML = `
    <span>ВОПРОС НАМБА</span><span class="JOPA">` + count + `</span>
    `;
    document.getElementById('q').append(but);
}

function goBack(block) {
    const t = block.id.split("_");
    const count = t[1];
    block.innerHTML = `
                        <h2>Выбирете тип вопроса:</h2>
                        <div class="questMode" id="radio" onclick="reDraw(document.getElementById('q_${count}'),  this)"><img src="/images/radio.svg" alt=""><span>Вопрос имеющий один ответ</span></div>
                        <div class="questMode" id="checkbox" onclick="reDraw(document.getElementById('q_${count}'),  this)"><img src="/images/checkbox.svg" alt=""><span>Вопрос имеющий несколько ответов</span></div>
                        <div class="questMode" id="textbox" onclick="reDraw(document.getElementById('q_${count}'),  this)"><img src="/images/textbox.svg" alt=""><span>Вопрос на который нужно дать письменный ответ (точное число или слово)</span></div>
    `;
}

function SwitchQuestion(block) {
//my
    for(qstb = 0; qstb < document.getElementsByClassName('questBlock').length;qstb-=-1){
        document.getElementsByClassName('questBlock')[qstb].style = "background-color: violetblue;";
    }

    block.style = "background-color: deeppink;"

    const all = document.getElementsByClassName('current');
    for(i = 0; i < all.length; i++){
        all[i].className = "question";
    }
    const id = block.id.split('_');
    document.getElementsByClassName('question')[id[1] - 1].className = "question current";
}

/*Тута preparation*/

function MainIN(num){
    if(num == 0){
        document.getElementsByClassName('preparation')[0].style.display = 'none';
    } else {
        document.getElementsByClassName('preparation')[0].style.display = 'flex';
    }
}

/*Тута свап мода доп контента */

function optEarse(){
    let optCon = document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName('opt-content');
        if(optCon.length > 0){
            optCon[0].remove();
    }
}

function optModeSwap(num){
    if(num == 0){
        optEarse()
    }else{
        optEarse()
        let div = document.createElement('div');
        div.setAttribute('class', 'opt-content')
        switch (num) {
            case 1:
                div.innerHTML = '<input type="file">'
                break;
            case 2:
                div.innerHTML = '<textarea name="" id="testArea" cols="30" rows="10" placeholder="Код"></textarea>'
                break;        
            default:
                
                break;
        }
        document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName('optional')[0].append(div);
    }
}

/*ТУТА HELP */

function helpInst(num){
    if(num == 0){
        document.getElementsByClassName('instruction')[0].style.display = 'none';
    } else {
        document.getElementsByClassName('instruction')[0].style.display = 'block';
    }
}