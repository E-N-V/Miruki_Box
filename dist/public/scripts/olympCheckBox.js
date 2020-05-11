function checkBoxChpok(){
    let current = document.getElementsByClassName('current')[0];
    let boxes = document.getElementsByClassName('checkBox');
    let input = document.createElement('input');
    let checkdiv = current.getElementsByClassName('checkbox');//some ninja code )0))
    checkdiv = checkdiv[checkdiv.length - 1]
    input.class = 'checkBox';
    input.type = 'checkbox';
    input.name = ''; //TODO: хз какие имена давать 
    input.id = 'checkbox' + boxes.length;
    checkdiv.append(index);
    let label = document.createElement('label');
    label.for = 'checkbox' + boxes.length;
    checkdiv.append(label);
}