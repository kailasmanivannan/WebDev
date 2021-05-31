export function calc_dimensions(values){
    let height=0,width=0;
    let datas = values[3].split(",");
    let labels = values[2].split(",");
    let num = Math.max(...datas);
    height = Math.ceil(num/10)*10 + 120 ;
    width = labels.length*50*2 + 120 -50;
    return [height,width];
}