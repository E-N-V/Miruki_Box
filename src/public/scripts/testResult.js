
function generateResult(AnswNum,rightAnswNum,maxTime,userTime){
    B = Math.round(100 / AnswNum * rightAnswNum)

    if(maxTime < userTime){
        Bplus = B - 20 - (Math.round(userTime/60) - Math.round(maxTime/60));
    }else{
        Bplus = B;
    }

    T = Math.round(100 / maxTime * userTime)

    if(Bplus<0){
        Bplus=0
    }

    info = document.getElementsByTagName("p");
    info[1].innerText += " " + rightAnswNum + ' из ' + AnswNum;
    info[2].innerText += " " + Math.round(userTime/60) + " (минут)";
    circle = document.getElementsByClassName('train');
    overflowCircle = document.getElementsByClassName('vagon')[0];
    circle[0].style.strokeDashoffset = 'calc(190 - (190*'+ B +') / 100)';
    if(T<101){
        circle[1].style.strokeDashoffset = 'calc(190 - (190*'+ T +') / 100)';
        overflowCircle.style.strokeDashoffset = 'calc(190 - (190*'+ 0 +') / 100)';    
    }else if(T<201){
        circle[1].style.strokeDashoffset = 'calc(190 - (190*'+ 100 +') / 100)';
        overflowCircle.style.strokeDashoffset = 'calc(190 - (190*'+ (T-100) +') / 100)';
    }else{
        circle[1].style.strokeDashoffset = 'calc(190 - (190*'+ 100 +') / 100)';
        overflowCircle.style.strokeDashoffset = 'calc(190 - (190*'+ 100 +') / 100)';
    }
    circle[2].style.strokeDashoffset = 'calc(440 - (440*'+ Bplus +') / 100)';
    answersP = document.getElementsByClassName('answersP')[0];
    answersP.innerText = B + '%';
    timeP = document.getElementsByClassName('timeP')[0];
    timeP.innerText = T + '%';
    procent = document.getElementsByClassName('procent')[0];
    procent.innerText = Bplus
    rank = document.getElementsByClassName('rank')[0];
    if(Bplus<51){
        rank.innerText = 'F'
    }else if(Bplus>50 && Bplus<61){
        rank.innerText = 'D'
    }else if(Bplus>60 && Bplus<71){
        rank.innerText = 'C'
    }else if(Bplus>70 && Bplus<81){
        rank.innerText = 'B'
    }else if(Bplus>80 && Bplus<91){
        rank.innerText = 'A'
    }else if(Bplus>90){
        rank.innerText = 'S'
    }
}