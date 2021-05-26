let count = 0;
let a = document.getElementsByClassName("parentdiv")[0];
let b = ["rotate(10deg)","rotate(20deg)","rotate(30deg)","rotate(40deg)","rotate(50deg)","rotate(60deg)","rotate(70deg)","rotate(80deg)"];

const button1 = document.getElementById("b1");
button1.addEventListener('click',func1);

const button2 = document.getElementById("b2");
button2.addEventListener('click',func2);

function func1(){
    count++;
    let div = document.createElement('div');
    div.id = count;
    div.style.backgroundColor = randomcolor();
    let pos = randompos();
    div.style.top = pos[0]+"px";
    div.style.left = pos[1]+"px";
    let value = Math.floor(getRandomNumber(0,7));
    div.style.transform = b[value];
    div.addEventListener('dblclick',() =>{ doubleclick(div.id)});
    div.addEventListener('click',() => { singleclick(div.id)});
    a.appendChild(div);
}

function func2(){
    a.removeChild(a.lastChild);
} 
 
function doubleclick(index){
    a.removeChild(a.childNodes[index]);
    console.log("double click")
}

function singleclick(index){
    if(index === a.lastChild.id){
        alert("last division");
        console.log("single click");
    }
}

function randomcolor() {
    var rgb = [];
    for(var i = 0; i < 3; i++)
        rgb.push(Math.floor(Math.random() * 255));
    return 'rgb('+ rgb.join(',') + ')';    
}

function randompos() {
    randomTop = getRandomNumber(0, 200);
    randomLeft = getRandomNumber(0, 200);
    return [randomTop,randomLeft];
}
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
