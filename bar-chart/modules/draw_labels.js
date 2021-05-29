export function draw_labels(ctx,data,height) {
    data = data.split(",");
    ctx.fillStyle = "black"
    for(let i = 0;i<data.length;i++){
        var d = data[i];
        ctx.fillText(d,60+i*100,height-20);
    }
}