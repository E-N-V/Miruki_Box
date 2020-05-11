"use strict"

window.onload = () =>{
    let timeToBlow = document.getElementsByClassName('blowJobAnim');
    let creationStart = document.getElementsByClassName('creationStart');
    timeToBlow[0].style.transition = '1.5s';
    timeToBlow[0].style.transform = 'translateX(-150px)';
    timeToBlow[0].style.opacity = 1;
    timeToBlow[1].style.transition = '1s';
    timeToBlow[1].style.transform = 'translateX(50px)';
    timeToBlow[1].style.opacity = 1;
    timeToBlow[2].style.transition = '1.3s';
    timeToBlow[2].style.transform = 'translateX(-150px)';
    timeToBlow[2].style.opacity = 1;

    let CourseButtons = document.getElementsByClassName('preCreationCourseButton');
    for(let i = 0; i < CourseButtons.length; i-=-1){
        CourseButtons[i].id = i;
        CourseButtons[i].onclick = () =>{
            for(let l = 0; l < CourseButtons.length; l-=-1){
                CourseButtons[l].style.backgroundColor = 'rgb(240, 240, 240)';
            }
            CourseButtons[i].style.backgroundColor = 'gray';
        }
    }
    let creationContainer = document.getElementById('creationContainer');
    let boget = document.getElementById('boget');
    boget.onclick = () =>{
        /*timeToBlow[0].style.transform = 'translate(-1000px,0)';
        timeToBlow[0].style.opacity = 0;
        timeToBlow[1].style.transform = 'translate(1000px,0)';
        timeToBlow[1].style.opacity = 0;
        timeToBlow[2].style.transform = 'translate(-1000px,0)';
        timeToBlow[2].style.opacity = 0;*/
        rideToSunShine(timeToBlow[0], 1500, 60, 0, -150,-1000);
        rideToSunShine(timeToBlow[1], 1500, 60, 0, 50, 1000);
        rideToSunShine(timeToBlow[2], 1500, 60, 0, -150,-1000);
        creationStart[0].style.transition = '1.5s';
        creationStart[1].style.transition = '1.2s';
        creationStart[2].style.transition = '1s';
        creationStart[3].style.transition = '1.8s';
        creationStart[4].style.transition = '1.5s';
        creationStart[5].style.transition = '1.3s';
        for(let i = 0; i < creationStart.length; i-=-1){
            creationStart[i].style.transitionDelay = '1.5s';
            creationStart[i].style.transform = 'translateY(0)';
            creationStart[i].style.opacity = 1;
        }
        elemFly(creationStart[0],24000,60,3000,1);
        elemFly(creationStart[1],32000,60,2700,0);
        elemFly(creationStart[4],120000,60,3000,0);
    }
    let checkboxes = document.getElementsByClassName('correctAnswer');
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].id = i;
        checkboxes[i].onclick = () =>{
            if(checkboxes[i].value != 'yes'){
                checkboxes[i].value = 'yes';
                checkboxes[i].style.backgroundColor = '#3F5EFB';
            }else{
                checkboxes[i].value = 'no';
                checkboxes[i].style.backgroundColor = 'rgb(221, 221, 221)';
            }
        }
    }
    
}

function rideToSunShine(elem, time, fps, delay,x_start,x_charge){
    elem.style.transition = 'none';
    var delay = delay / (1000 / fps);
    var steps = time / (1000 / fps); 
    let x_begin = x_start;
    let chStep = x_charge / steps;
    let opacity = 1;
    let opStep = opacity / steps;
    let check = 0 < x_charge ;
    let timer = setInterval(function(){
        if(delay<0)
        {delay--;}else{
            //ТУТ мАГИЯ
            opacity -= opStep;
            elem.style.opacity = opacity;
            if(check){
                x_begin += chStep;
                elem.style.transform = 'translateX('+ x_begin +'px)'
            }else{
                x_begin += chStep;
                elem.style.transform = 'translateX('+ x_begin +'px)'
            }
            steps--;
            if(steps <= 0){
                clearInterval(timer);
                elem.style.display = 'none';
            }
        }
    }, (1000 / fps));


}

function chpok(elem, time, fps, delay){
    var delay = delay / (1000 / fps);
    var steps = time / (1000 / fps);   
    var opacity = 1;
    var opStep = opacity / steps;
    var timer = setInterval(function(){
        if(delay<0)
        {delay--;}else{
        opacity -= opStep;
        elem.style.opacity = opacity;
        steps--;
        if(steps <= 0){
            clearInterval(timer);
            elem.style.display = 'none';
        }
    }
    }, (1000 / fps));
}

function elemFly(elem, time, fps, delay, reverse){
    let start_Y = 0;
    var delay = delay / (1000 / fps);
    var steps = time / (1000 / fps);   
    var opacity = 1;
    var opStep = opacity / steps;
    var oneAnimStep = steps / 4;
    var timer = setInterval(function(){
        if(delay>0)
        {delay--;}else{
            if(reverse == 0){
                elem.style.transition = 'none';
                if(steps > oneAnimStep*3){
                    start_Y -= 0.1;
                    elem.style.transform = 'translateY('+start_Y+'px)'
                }else if(steps > oneAnimStep*2){
                    start_Y +=0.1;
                    elem.style.transform = 'translateY('+start_Y+'px)'
                }else if(steps > oneAnimStep){
                    start_Y +=0.1;
                    elem.style.transform = 'translateY('+start_Y+'px)'
                }else if(steps >0){
                    start_Y -=0.1;
                    elem.style.transform = 'translateY('+start_Y+'px)'
                }
            }else{
                elem.style.transition = 'none';
                if(steps > oneAnimStep*3){
                    start_Y += 0.1;
                    elem.style.transform = 'translateY('+start_Y+'px)'
                }else if(steps > oneAnimStep*2){
                    start_Y -=0.1;
                    elem.style.transform = 'translateY('+start_Y+'px)'
                }else if(steps > oneAnimStep){
                    start_Y -=0.1;
                    elem.style.transform = 'translateY('+start_Y+'px)'
                }else if(steps >0){
                    start_Y +=0.1;
                    elem.style.transform = 'translateY('+start_Y+'px)'
                }
            }
            steps--;
            if(steps <= 0){
                steps = oneAnimStep*4
            }
        }
    }, (1000 / fps));
}
