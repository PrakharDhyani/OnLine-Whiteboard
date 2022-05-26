let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var io = io.connect("http://localhost:8080/");

// How canvas draw 
// ctx.moveTo(100,100);
// ctx.lineTo(200,200);
// ctx.stroke();

let x;
let y;
let mousedown = false;



io.on("ondown",({x,y})=>{
    ctx.moveTo(x,y);
    let mousedown = false;
})

window.onmousedown = (e) =>{
    io.emit("down",{x,y});
    ctx.moveTo(x,y);
    mousedown = true;
};

window.onmouseup = (e) =>{
    mousedown = false;
};

io.on("ondraw",({x,y})=>{
    ctx.lineTo(x,y);
    ctx.stroke();
})

window.onmousemove = (e) =>{    
    x = e.clientX;
    y = e.clientY;
    if(mousedown)
    {
        io.emit("draw",{x,y});
        ctx.lineTo(x,y);
        ctx.stroke();
    }
};