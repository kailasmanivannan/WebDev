//for the modules global access
var gdata = [];
var speed = 0;
var h ;
var canvas = document.getElementById("canva");
var context = canvas.getContext("2d");
//for the modules global access

export function draw_bars(data,height) {
    gdata = data.split(",");
    h = height;
    startAnimation();
}

function startAnimation(){
    if(speed++<100){
        requestAnimationFrame(startAnimation);
    }
    console.log("iam in");
    for(let i = 0;i<gdata.length;i++){
        context.fillStyle = "blue";
        var d = gdata[i];
        // console.log(d);
        var hd = d*speed/100;
        // console.log(hd);
        context.fillRect(60+i*100,h-40,50,-hd);
    }

}

//no animation

// {
// data = data.split(",");
// ctx.fillStyle = "blue";
// for(let i = 0;i<data.length;i++){
//     var d = data[i];
//     ctx.fillRect(60+i*100,height-d-40,50,d);
// }