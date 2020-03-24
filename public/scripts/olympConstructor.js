/*TODO:  Неумею в js*/
/*изменение обработки клавишь */

function formPass(){
    check = (window.key != 13);
    window.key = 0;
    return check;
}

function readInputsKeys(){
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i-=-1){
        inputs[i].onkeypress = function() {
            window.key = event.keyCode;
        };
    }
}

function readTAKeys(){
    let opt = document.getElementsByClassName('optional');
    
    for (let l = 0; l < opt.length; l++) {
        textareas = opt[l].getElementsByTagName('textarea');
        for(let i = 0; i < textareas.length; i-=-1){
            textareas[i].onkeydown = function(){
                if(event.keyCode==9 || event.which==9){
                    event.preventDefault();
                    var s = this.selectionStart;
                    this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                    this.selectionEnd = s+1; 
                }
            }
        }
    }
}

/**/

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
    let boxes = current.getElementsByClassName('checkBox');
    let input = document.createElement('input');
    let checkdiv = current.getElementsByClassName('checkbox');//some ninja code )0))
    checkdiv = checkdiv[checkdiv.length - 1]
    input.setAttribute("class", 'checkBox');
    input.type = 'checkbox';
    input.name = ''; 
    input.id = 'inpId' + getCurrentBlockNum()+ '' + boxes.length;
    input.value = boxes.length;    
    checkdiv.append(input);
    let label = document.createElement('label');
    label.setAttribute("for", input.id );
    checkdiv.append(label);
}

function RadioChpok(){
    let current = document.getElementsByClassName('current')[0];
    let boxes = current.getElementsByClassName('Radio');
    let input = document.createElement('input');
    let checkdiv = current.getElementsByClassName('radio');//some ninja code )0))
    checkdiv = checkdiv[checkdiv.length - 1]
    input.setAttribute("class", 'Radio');
    input.type = 'radio';
    input.name = 'radios' + getCurrentBlockNum();
    input.id = 'inpId' + getCurrentBlockNum()+ '' + boxes.length;
    input.value = boxes.length;    
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
                            <li onclick="optModeSwap(0)"><input value='nothing' class='opt-mode nothing-opt' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode0`+ getCurrentBlockNum() +`" checked>
                            <label for="opt-mode0`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(1)"><input value='image' class='opt-mode image-opt' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode1`+ getCurrentBlockNum() +`">
                            <label for="opt-mode1`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(2)"><input value='code' class='opt-mode code-opt' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode2`+ getCurrentBlockNum() +`">
                            <label for="opt-mode2`+ getCurrentBlockNum() +`"></li>
                        </ul>
                    </div>
                    <div class="answersContainer" id="AnswerContainer">
                        <div class="answer">
                            <span>1)</span>
                            <input type="text" name="answer0`+ getCurrentBlockNum() +`" id="text" class="input" placeholder="Ответ">
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
                            <li onclick="optModeSwap(0)"><input value='nothing' class='opt-mode nothing-opt' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode0`+ getCurrentBlockNum() +`" checked>
                            <label for="opt-mode0`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(1)"><input value='image' class='opt-mode image-opt' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode1`+ getCurrentBlockNum() +`">
                            <label for="opt-mode1`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(2)"><input value='code' class='opt-mode code-opt' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode2`+ getCurrentBlockNum() +`">
                            <label for="opt-mode2`+ getCurrentBlockNum() +`"></li>
                        </ul>
                    </div>
                    <div class="answersContainer" id="AnswerContainer">
                        <div class="answer">
                            <span>1)</span>
                            <input type="text" name="answer0`+ getCurrentBlockNum() +`" id="text" class="input" placeholder="Ответ">
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
                            <li onclick="optModeSwap(0)"><input value='nothing' class='opt-mode nothing-opt' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode0`+ getCurrentBlockNum() +`" checked>
                            <label for="opt-mode0`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(1)"><input value='image' class='opt-mode image-opt' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode1`+ getCurrentBlockNum() +`">
                            <label for="opt-mode1`+ getCurrentBlockNum() +`"></li>
                            <li onclick="optModeSwap(2)"><input value='code' class='opt-mode code-opt' type="radio" name="opt-mode`+ getCurrentBlockNum() +`" id="opt-mode2`+ getCurrentBlockNum() +`">
                            <label for="opt-mode2`+ getCurrentBlockNum() +`"></li>
                        </ul>
                    </div>
                    <input type="text" name="answer`+ getCurrentBlockNum() +`" id="" class="input oneAnswerInput" placeholder="Ответ">
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
            <input type="text" name="answer`+ getCurrentBlockNum() +`" id="text" class="input" placeholder="Ответ">
            <div class="radio"></div>
            <div class="controls delete">-</div>
            `;
            block.append(div);
            break;
        case "checkbox":
            div.className = 'answer';
            div.innerHTML = `
            <span>`+ (document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName('answer').length + 1) +`)</span>
            <input type="text" name="answer`+ document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName('answer').length + '' + getCurrentBlockNum() +`" id="text" class="input" placeholder="Ответ">
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
            <input type="text" name="answer`+ document.getElementsByClassName('question')[getCurrentBlockNum()].getElementsByClassName('answer').length + '' + getCurrentBlockNum() +`" id="text" class="input" placeholder="Ответ">
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
        document.getElementsByClassName('questBlock')[qstb].className = 'questBlock';
    }

//????    but.style = "background-color: deeppink; outline-color: deeppink; margin-top: calc(5% + 10px);";
    but.className = 'questBlock choosenOne'

    but.innerHTML = `
    <span>ВОПРОС НОМЕР</span><span class="JOPA">` + count + `</span>
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
        document.getElementsByClassName('questBlock')[qstb].className = 'questBlock';
    }

    block.className = 'questBlock choosenOne'

    const all = document.getElementsByClassName('current');
    for(i = 0; i < all.length; i++){
        all[i].className = "question";
    }
    const id = block.id.split('_');
    document.getElementsByClassName('question')[id[1] - 1].className = "question current";
}

/*Тута preparation*/

function MainIN(num){
    let olympCat = document.getElementById('olympCat');
    let olympName = document.getElementById('olympName');
    let prepare = document.getElementsByClassName('preparation')[0];
    if(num == 0){
        document.getElementById('olympH1').innerText = olympName.value;
        prepare.style.display = 'none';

    } else {
        prepare.style.display = 'flex';
    }
}

function catSwap(num){
    let name = document.getElementById('olympCatH1');
    let ico = document.getElementById('olympICO');
    let style = document.getElementById('catStyle');
    switch (num) {
        case 0:
            name.innerText = 'Архитектура'
            name.style.textShadow = '2px 2px 0 orange'
            ico.setAttribute('src', '/images/arch.png')
            style.setAttribute('href', '/stylesheets/cats/arch.css');
            break;
        case 1:
            name.innerText = 'Программирование'
            name.style.textShadow = '2px 2px 0 dodgerblue'
            ico.setAttribute('src', '/images/prog.png')
            style.setAttribute('href', '/stylesheets/cats/prog.css');
            break;
        case 2:
            name.innerText = 'Сварка'
            name.style.textShadow = '2px 2px 0 green'
            ico.setAttribute('src', '/images/weld.png')
            style.setAttribute('href', '/stylesheets/cats/weld.css');
            break;
        case 3:
            name.innerText = 'Автомеханника'
            name.style.textShadow = '2px 2px 0 red'
            ico.setAttribute('src', '/images/mech.png')
            style.setAttribute('href', '/stylesheets/cats/mech.css');
            break;
        case 4:
            name.innerText = 'Офисное ПО'
            name.style.textShadow = '2px 2px 0 blue'
            ico.setAttribute('src', '/images/office.png')
            style.setAttribute('href', '/stylesheets/cats/office.css');
            break;
        case 5:
            name.innerText = 'Графическое ПО'
            name.style.textShadow = '2px 2px 0 deeppink'
            ico.setAttribute('src', '/images/art.png')
            style.setAttribute('href', '/stylesheets/cats/art.css');
            break;
        default:
            name.innerText = 'error'
            ico.setAttribute('src', '/images/ico.png')
            break;
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
        document.getElementsByTagName('body')[0].style.overflowY = 'initial';
    } else {
        document.getElementsByClassName('instruction')[0].style.display = 'block';
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    }
}

/* */