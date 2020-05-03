//document.getElementById('preLoader').style.display = 'none';

function preLoaderOut(){
    document.getElementsByClassName('preLoader')[0].setAttribute('class', 'preLoader hideLoader');
}

window.onload = () =>{
    
    preLoaderOut();
    
    let title = document.getElementsByTagName('title')[0];
    switch (title.innerText) {
        case 'Создание тестов':
            readInputsKeys();
            readTAKeys()
            break;
        case 'Выбор олимпиад':
            //catPlay('prog');
            default:
            break;
    }
}

window.onclick = () =>{
    let title = document.getElementsByTagName('title')[0];
    switch (title.innerText) {
        case 'Создание тестов':
            readInputsKeys();
            readTAKeys()
            break;
    
        default:
            break;
    }
}


function navOpen(){
    let menuButton = document.getElementsByClassName('nav-main');
    let menuContent = document.getElementsByClassName('nav-content');
    if(menuContent[0].value == '1'){
        menuContent[0].style.display = 'none'
        menuContent[0].value = '0'
    }else{
        menuContent[0].style.display = 'flex'
        menuContent[0].value = '1'
    }
}


function openNote(){
    noteWind = document.getElementsByClassName("noteWindow")[0]
    if(noteWind.value == 1){
        noteWind.style.transform = 'translate(0,-100%)'
        noteWind.value = 2        
    }else{
        noteWind.style.transform = 'translate(0,45px)'
        noteWind.value = 1    
    }
}
