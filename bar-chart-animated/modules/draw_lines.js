export function draw_lines(ctx,data,height,width) {
    data = data.split(",");
    let max = Math.max(...data);
    height = height - 40;
    ctx.strokeStyle = 'rgb(208,208,208,0.5)';
    ctx.fillStyle = 'rgb(0,0,0,1)';
    for(var yval=0;yval<max;yval+=25){
        ctx.font = '15px serif'
        ctx.fillText(yval,15,height);
        //ctx.beginPath();
        ctx.moveTo(40,height);
        ctx.lineTo(width-40,height);
        ctx.stroke();
        height = height -25;
    }
        ctx.fillText(yval,15,height);
        ctx.moveTo(40,height);
        ctx.lineTo(width-40,height);
        ctx.stroke();
        height = height -25;
    
}