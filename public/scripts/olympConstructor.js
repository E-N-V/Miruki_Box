function scanDoc(){
var inputs = document.getElementsByClassName('input');
    for(let scan = 0; scan < inputs.length; scan-=-1){
        inputs[scan].addEventListener('keyup', log)      
        function log(){
            var s = inputs[scan].value;
            inputs[scan].value = inputs[scan].value 
            console.clear();
            s == ''? false : console.log('key press! Now', s);
        }
    }
}

function loopaAndPoopa(){
    let question = document.getElementsByClassName('question');
    let delBut = question[tyChort].getElementsByClassName('delete');
    for(let k = 0; k < delBut.length; k-=-1){
        delBut[k].onclick = () => {
            let answer = question[tyChort].getElementsByClassName('answer');
            answer[k].remove();
            for(let j = k; j < delBut.length; j-=-1){
                let tag = answer[j].getElementsByTagName('span');
                tag[0].innerHTML = arr_en[j]+')';
                //ПОПЫТКА РЕШЕНИЯ
                scanDoc()
                loopaAndPoopa();
            }
        }
    }
}
    
function butHole(){
    //плюсы
    let question = document.getElementsByClassName('question');
    let addBut = question[tyChort].getElementsByClassName('append');
    addBut[0].onclick = () => {
        let container = question[tyChort].getElementsByClassName('answersContainer');
        let answer = question[tyChort].getElementsByClassName('answer');
        let tag = answer[answer.length-1].getElementsByTagName('span');
        tag = arr_en.indexOf(tag[0].innerHTML[0]);
        container[0].innerHTML +=`
        <div class="answer">
            <span>`+ arr_en[tag+1] +`)</span>
            <input type="text" name="" id="" class="input">
            <div class="checkbox"></div>
            <button class="controls delete">-</button>
        </div>
        `;
        scanDoc()
        //минусы
        loopaAndPoopa();
    }
    loopaAndPoopa();    
}

let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let tyChort = 0;
window.onload = function lol(){
    scanDoc()
    let question = document.getElementsByClassName('question');
    questMode = question[tyChort].getElementsByClassName('questMode');
    for(let i = 0; i < questMode.length; i-=-1){
        questMode[i].onclick = () => {
            //один ответ
            if(questMode[i].id == 'radio'){
                question[tyChort].innerHTML =`
                    <button class="goBack controls"><</button>
                    <textarea name="" id="testArea" cols="30" rows="10"></textarea>
                    <div class="answersContainer">
                        <div class="answer">
                            <span>a)</span>
                            <input type="text" name="" id="texta" class="input">
                            <div class="radio"></div>
                            <button class="controls delete" style="display:none">-</button>
                        </div>
                    </div>
                    <button class="controls append">+</button>
                `
                scanDoc()
                /* КОД НА СЧИТЫВАНИЯ VALUE В ИНПУТАХ 
                var d = document.getElementById('texta')
                d.addEventListener('keyup', log)
                function log(){
                    var s = document.getElementById('texta').value
                    console.clear()
                    s == ''? false : console.log('key press! Now', s)
                }
                /* КОНЕЦ КОДА */

                //плюсы
                butHole()
            }else if(questMode[i].id == 'checkbox'){
                //не один ответ
                question[tyChort].innerHTML =`
                    <button class="goBack controls"><</button>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <div class="answersContainer">
                        <div class="answer">
                            <span>a)</span>
                            <input type="text" name="" id="" class="input">
                            <div class="checkbox"></div>
                            <button class="controls delete" style="display:none">-</button>
                        </div>
                    </div>
                    <button class="controls append">+</button>
                `;
                scanDoc()
                //плюсы
                butHole();
            }else if(questMode[i].id == 'textbox'){
                //письменный ответ
                question[tyChort].innerHTML =`
                    <button class="goBack controls"><</button>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <input type="text" name="" id="">
                `;
            }
            goBack = question[tyChort].getElementsByClassName('goBack');
            goBack[0].onclick = () =>{
                question[tyChort].innerHTML = `
                    <h2>Выбирете тип вопроса:</h2>
                        <button class="questMode" id="radio"><img src="../../public/images/radio.svg" alt=""><span>Вопрос имеющий один ответ</span></button>
                        <button class="questMode" id="checkbox"><img src="../../public/images/checkbox.svg" alt=""><span>Вопрос имеющий несколько ответов</span></button>
                       <button class="questMode" id="textbox"><img src="../../public/images/textbox.svg" alt=""><span>Вопрос на который нужно дать письменный ответ (точное число или слово)</span></button>
                `;
                lol();
            }
            questMode[2].remove();
            questMode[1].remove();
            questMode[0].remove();
        }
    }

    //ЗДЕСЬ НАЧНЁКЕПОАОАЖДЛЬПУЫ Чжол  МСМСУКА
    let questCreate = document.getElementsByClassName('questCreate');
    questCreate[0].onclick = () =>{
        let questions = document.getElementsByClassName('questions');
        let question = document.getElementsByClassName('question');
        tyChort = question.length;
        let redacAre = document.getElementsByClassName('redactorArea');
        for(let i = 0; i < question.length;i-=-1){
            question[i].style.display = 'none'
        } 
        redacAre[0].innerHTML += `
            <div class="question">
                <h2>Выбирете тип вопроса:</h2>
                <button class="questMode" id="radio" function=""><img src="../../public/images/radio.svg" alt=""><span>Вопрос имеющий один ответ</span></button>
                <button class="questMode" id="checkbox"><img src="../../public/images/checkbox.svg" alt=""><span>Вопрос имеющий несколько ответов</span></button>
                <button class="questMode" id="textbox"><img src="../../public/images/textbox.svg" alt=""><span>Вопрос на который нужно дать письменный ответ (точное число или слово)</span></button>
            </div>
        `
        let questBlock = document.getElementsByClassName('questBlock'); 
        for(let l = 0; l < questBlock.length;l-=-1){
            questBlock[l].style.backgroundColor = 'blueviolet';
            questBlock[l].style.outlineColor = 'blueviolet';
        }
        questions[0].innerHTML += `
        <div class="questBlock" style="background-color:deeppink;outline-color:deeppink;"><span>ВОПРОС НАМБА</span><span class="JOPA">`+ (1+tyChort) +`</span></div>
        `; 
        lol();
    }
    let questBlock = document.getElementsByClassName('questBlock');
    for(let i = 0; i < questBlock.length;i-=-1){
        questBlock[i].onclick = () => {
            for(let l = 0; l < question.length;l-=-1){
                question[l].style.display ='none';
            }
            for(let l = 0; l < questBlock.length;l-=-1){
                questBlock[l].style.backgroundColor = 'blueviolet';
                questBlock[l].style.outlineColor = 'blueviolet';
            }
            questBlock[i].style.backgroundColor = 'deeppink';
            questBlock[i].style.outlineColor = 'deeppink';
            question[i].style.display ='block';
            tyChort = i;
            butHole();
            lol();
        }
    }
}