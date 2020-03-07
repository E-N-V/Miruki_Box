window.onload = () =>{
    let olymps = document.getElementsByClassName('olympCategory');
    let olympsContainers = document.getElementsByClassName('olympsCantainer');

    for(let i = 0; i < olymps.length; i-=-1){
        olymps[i].onclick = () =>{
            if(olymps[i].value == 1){
                olymps[i].value = 0;
                let olympsList = olympsContainers[i].getElementsByClassName('olymp');
                for(let l = 0; l < olympsList.length; l-=-1){
                    olympsList[l].style.height = '0';
                }
            }else{
                olymps[i].value = 1;
                let olympsList = olympsContainers[i].getElementsByClassName('olymp');
                for(let l = 0; l < olympsList.length; l-=-1){
                    olympsList[l].style.height = '28px';
                }
            }
        }
    }
}