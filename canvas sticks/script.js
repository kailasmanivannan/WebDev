const button1 = document.getElementById("startbtn");
button1.addEventListener('click',start);

const button2 = document.getElementById("clearbtn");
button2.addEventListener('click',stop);

var canvas = document.getElementById("canva");
var ctx = canvas.getContext("2d");

var cdata =[];

function start() {
    ctx.save();
    draw();
    cdata.push(ctx.getImageData(0,0,canvas.width,canvas.height));
}

function stop(){
    if(cdata.length>1){
       cdata.pop();
       ctx.putImageData(cdata[cdata.length-1],0,0);
    }
    else{
        ctx.fillStyle='white';
        ctx.clearRect(0,0,200,200);
        ctx.fillRect(0,0,200,200);
    }
}

function draw(){
    ctx.fillStyle = randomcolor();
    let ea =getRandomNumber(0,200);
    let eb = getRandomNumber(0,50);
    ctx.rotate((Math.PI / 180) * getRandomNumber(0,80));
    ctx.fillRect(ea,eb, 150, 4);
    ctx.restore();
}

function randomcolor() {
    var rgb = [];
    for(var i = 0; i < 3; i++)
        rgb.push(Math.floor(Math.random() * 255));
    return 'rgb('+ rgb.join(',') + ')';    
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
