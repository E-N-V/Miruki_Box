window.onload = () =>{
    document.getElementById('preLoader').style.display = 'none';
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