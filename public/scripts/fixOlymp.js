window.onload = () =>{
    const d = document;
    const button = [];
    for (const item of redactorArea.getElementsByTagName('button')) button.push(item);
    for (let i = 0; i < button.length; i++) button[i].addEventListener('click', test(button[i]))
}

function reDraw(block){
    block.innerHTML = `
    <button class="goBack controls"><</button>
    <textarea name="" id="testArea" cols="30" rows="10"></textarea>
    <div class="answersContainer" id="AnswerContainer">
        <div class="answer">
            <span>a)</span>
            <input type="text" name="" id="texta" class="input">
            <div class="radio"></div>
            <button class="controls delete" style="display:none">-</button>
        </div>
    </div>
    <button class="controls append" onclick="AddAnswer(document.getElementById('AnswerContainer'))">+</button>
`;
}

function AddAnswer(block){
    let div = document.createElement('div');
    div.className = 'answer'
    div.innerHTML = `
            <span>a)</span>
            <input type="text" name="" id="texta" class="input">
            <div class="radio"></div>
            <button class="controls delete" style="display:none">-</button>
    `;
    block.append(div);
}

function AddQuestion(){

}