window.onload = () =>{
    document.getElementById('preLoader').style.display = 'none';
}

function navOpen(){
    let menuButton = document.getElementsByClassName('nav-main');
    let menuContent = document.getElementsByClassName('nav-content');
    menuContent[0].style.display = 'flex'
}