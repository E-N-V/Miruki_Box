/*_                ___       _.--.
\`.|\..----...-'`   `-._.-'_.-'`
/  ' `         ,       __.--'
)/' _/     \   `-_,   /
`-'" `"\_  ,_.-;_.-\_ ', 
    _.-'_./   {_.'   ; /
   {_.-``-'         {_/
*/
function pawPoof(catName,cats){
    for(cat = 0; cat < cats.length; cat-=-1){
        if (cats[cat].id === catName) {
            cats[cat].style.display = 'block';
        } else {
            cats[cat].style.display = 'none'
        }
    }
}

/*
                ,
              _/((
     _.---. .'   `\
   .'      `     ^ T=
  /     \       .--'
 |      /       )'-.
 ; ,   <__..-(   '-.)
  \ \-.__)    ``--._)
   '.'-.__.-.
     '-...-'
*/

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

/*
               /\____/\    __
             .'  """"  `,-'  `--.__
        __,- :   -  -  ;  " ::     `-. -.__
     ,-sssss `._  `' _,'"     ,'~~~::`.sssss-.
    |ssssss ,' ,_`--'_    __,' ::  `  `.ssssss|
   |sssssss `-._____~ `,,'_______,---_;; ssssss|
    |ssssssssss     `--'~{__   ____   ,'ssssss|
     `-ssssssssssssssssss ~~~~~~~~~~~~ ssss.-'
          `---.sssssssssssssssssssss.---'
*/

function catBallOfWool(olympName,olympDiscription,olympUrl){
    let target = document.getElementsByClassName('olympSelect')[0];
    let olymp = document.createElement('div');
    olymp.setAttribute('class','olymp');
    olymp.innerHTML = `
        <h3>`+ olympName +`</h3>
        <p>`+ olympDiscription +`</p>
        <a href="`+ olympUrl +`"><div>Участвовать</div></a>
        `;
    target.append(olymp);
}


/*
               .               ,.
              T."-._..---.._,-"/|
              l|"-.  _.v._   (" |
              [l /.'_ \; _~"-.`-t
              Y " _(o} _{o)._ ^.|
              j  T  ,-<v>-.  T  ]
              \  l ( /-^-\ ) !  !
               \. \.  "~"  ./  /c-..,__
                 ^r- .._ .- .-"  `- .  ~"--.
                  > \.                      \
                  ]   ^.                     \
                  3  .  ">            .       Y  
     ,.__.--._   _j   \ ~   .         ;       |
    (    ~"-._~"^._\   ^.    ^._      I     . l
     "-._ ___ ~"-,_7    .Z-._   7"   Y      ;  \        _
        /"   "~-(r r  _/_--._~-/    /      /,.--^-._   / Y
        "-._    '"~~~>-._~]>--^---./____,.^~        ^.^  !
            ~--._    '   Y---.                        \./
                 ~~--._  l_   )                        \
                       ~-._~~~---._,____..---           \
                           ~----"~       \
                                          \
*/

function translateMeow(word){
    switch (word) {
        case 'arch':
            word = window.olymps.architecture;
            break;
        case 'prog':
            word = window.olymps.programming;
            break;
        case 'weld':
            word = window.olymps.svarka;
            break;
        case 'mech':
            word = window.olymps.mechanic;
        break;
        case 'office':
            word = window.olymps.office;
        break;
        case 'art':
            word = window.olymps.graphics;
            break;
        default:
            word = window.olymps.MEEEEEOW;
            break;
    }
    return word;
}

function beautifulMeow(word){
    let beautiWord = '';
    for(let j = 0; j < word.length; j-=-1){
        if(word[j] == '_'){
            beautiWord += ' ';
        } else {
            beautiWord += word[j];
        }
    }
    return beautiWord;
}


/* 
                       A___A
           A___A       |o o|
     ____ / o o \      |='=|
___/~____   ='= /_____/    |_________
  (______)__m_m_)    /  ||||
                    |___||||]
*/

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

/*
              __..--''``---....___   _..._    __
    /// //_.-'    .-/";  `        ``<._  ``.''_ `. / // /
   ///_.-' _..--.'_    \                    `( ) ) // //
   / (_..-' // (< _     ;_..__               ; `' / ///
    / // // //  `-._,_)' // / ``--...____..-' /// / //
*/

function catSelect(catName){    
    let cats = document.getElementsByClassName('cat-kit');
    pawPoof(catName,cats);
    catPillow(catName);
    catPlay(catName);
    catBlush(catName);
}