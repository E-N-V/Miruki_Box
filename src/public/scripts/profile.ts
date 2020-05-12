function createReward( medalType:any , medalText:string, olympName:any, olympTime:any, olympPlace:any ){
    const something:any = document.getElementById("olymps");
    something.getElementsByTagName('img')[1].style.display = 'none'
    something.innerHTML += `
                <div class="olymp">
                    <div class="medal gold"> 1 </div>
                    <div class="olympInfo">
                        <h3> Название Олимпиады</h3>
                        <span> 29.04.2020 </span>
                    </div>
                    <h4> 1 место </h4>
                </div>
    `
}