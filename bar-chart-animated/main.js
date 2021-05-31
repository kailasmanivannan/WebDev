import { calc_dimensions } from "./modules/dimensions.js";
import { write_title } from "./modules/title.js";
import {draw_bars} from "./modules/draw_bars.js";
import {draw_lines} from "./modules/draw_lines.js";
import {draw_labels} from "./modules/draw_labels.js";

const button1 = document.getElementById("btn");
button1.addEventListener('click',start);

let w=0,h=0;
let values=[];
let canvas = document.getElementById("canva");
let context = canvas.getContext("2d");

function start() {
    let a = document.getElementById("datafrm");
    for(let i=0;i<=3;i++){
        values.push(a.elements[i].value);
    }
    [h,w]=calc_dimensions(values);
    setD();
    write_title(context,values[1],w);
    draw_lines(context,values[3],h,w);
    draw_bars(values[3],h);
    draw_labels(context,values[2],h);
}

function setD(){
    canvas.height = h;
    canvas.width = w;
    canvas.style = "border:1px solid #000000";
}