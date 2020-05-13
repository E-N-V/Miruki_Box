
function chpok(){
    const something:any = document.getElementsByClassName('profileChange')[0];
    console.log("chpok")
    something.style.display = 'flex'
    something.innerHTML+=`
        <div class="changeMenu">
            <div class="close" onclick="closeCh()">X</div>
            <p> Изменение профиля </p>
            <form action="">
                <input type="hidden", name="userId" value="">              
                <span> ученик
                    <input type="radio", name="role" value="pupil">
                </span> 
                <span> ученик + 
                    <input type="radio", name="role" value="turbopupil">
                </span>
                <span> учитель 
                    <input type="radio", name="role" value="teacher">
                </span>
                <button> Подтвердить </button>
            </form>
        </div>
    `
}


function closeCh(){
    var something:any = document.getElementsByClassName('changeMenu')[0];
    something.remove();
    something = document.getElementsByClassName('profileChange')[0];
    console.log("chpok")
    something.style.display = 'none'
}

function createReward( medalText:string, olympName:any, olympTime:any, olympPlace:any ){
    const something:any = document.getElementById("olymps");
    const cat:any = document.getElementById('cat');
    cat.style.display = 'none';
    var medRar:any = '';
    switch (olympPlace) {
        case 1:
            medRar = 'gold';
            break;
        case 2:
            medRar = 'silver';
            break;
        case 3:
            medRar = 'bronze';
            break;
        default:
            medRar = 'junk';
            break;
    }

    var medPlace:any = '';
    switch (olympPlace) {
        case 1:
            medPlace = '1 место'
            break;
        case 2:
            medPlace = '2 место'
            break;
        case 3:
            medPlace = '3 место'
            break;
        default:
            medPlace = 'участие'
            break;
    }
    something.innerHTML += `
                <div class="olymp">
                    <div class="medal ` + medRar + `"> ` + medalText + ` </div>
                    <div class="olympInfo">
                        <h3> `+ olympName +` </h3>
                        <span> `+ olympTime +` </span>
                    </div>
                    <h4> `+ medPlace +` </h4>
                </div>
    `
}