function pawPoof(catName,cats){
    for(cat = 0; cat < cats.length; cat-=-1){
        if (cats[cat].id === catName) {
            cats[cat].style.display = 'block';
        } else {
            cats[cat].style.display = 'none'
        }
    }
}

function catPillow(catName){
    let catsBox = document.getElementsByClassName('olympCategories')[0];
    switch (catName) {
        case 'arch':
            catsBox.style.backgroundColor = 'orange';
            break;
        case 'prog':
            catsBox.style.backgroundColor = 'dodgerblue';
            break;
        case 'weld':
            catsBox.style.backgroundColor = 'greenyellow';
            break;
        case 'mech':
            catsBox.style.backgroundColor = 'red';
        break;
        case 'office':
            catsBox.style.backgroundColor = 'blue';
        break;
        case 'art':
            catsBox.style.backgroundColor = 'deeppink';
            break;
        default:
            catsBox.style.backgroundColor = 'blueviolet';
            break;
    }
}

function catBallOfWool(target,olympName,olympDiscription,olympUrl){
    let olymp = document.createElement('div');
    olymp.setAttribute('class','olymp');
    olymp.innerHTML = `
        <h3>`+ olympName +`</h3>
        <p>`+ olympDiscription +`</p>
        <a href="`+ olympUrl +`"><div>Участвовать</div></a>
        `;
    target.append(olymp);
}

function catPlay(catName){
    let olympContainer = document.getElementsByClassName('olympSelect')[0];
    //чистим старые олимпиады
    let olymps = document.getElementsByClassName('olymp');
        for(i = 0; i < olymps.length; i++){
            olymps[i].remove();
        }
        //TODO: ХЗ как но надо из бдшки достовать олимпиады их описания и тд.
        //тип если они найденны просто добовляешь их функцией catBallOfWool
    if(true){
        catBallOfWool(olympContainer,'Затычка','Описание затычки ','/olympList/walk')
        document.getElementById('nothingMassage').style.display = 'none';
    }else{
        document.getElementById('nothingMassage').style.display = 'block';
    }
}

function catBlush(catName){
    let shyCats = document.getElementsByClassName('cat-nav')[0].getElementsByTagName('img');
    for (i = 0; i < shyCats.length; i++) {
        if (shyCats[i].name === catName) {
            shyCats[i].style.boxShadow = '15px 15px 0 -14px white,-15px -15px 0 -14px white';
        } else {
            shyCats[i].style.boxShadow = '0 0 0 0 white';
        }
    }
}

function catSelect(catName){    
    let cats = document.getElementsByClassName('cat-kit');
    pawPoof(catName,cats);
    catPillow(catName);
    catPlay(catName);
    catBlush(catName);
}