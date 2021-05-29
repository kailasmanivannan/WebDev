export function draw_bars(ctx,data,height) {
    data = data.split(",");
    ctx.fillStyle = "blue";
    for(let i = 0;i<data.length;i++){
        var d = data[i];
        ctx.fillRect(60+i*100,height-d-40,50,d);
    }
}