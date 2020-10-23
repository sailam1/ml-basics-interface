var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext('2d');

ctx.lineWidth='3';


canvas.addEventListener('mousedown',startDraw,false);
canvas.addEventListener('mousemove',Draw,false);
canvas.addEventListener('mouseup',endDraw,false);

var isActive=false;

var plots=[];


function Draw(e){
    if(!isActive) return;
    var x=e.offsetX || e.layerX - canvas.offsetLeft;
    var y=e.offsetY || e.layerY - canvas.offsetTop;

    plots.push({x:x, y: y});
    drawOnMouse(plots);
}

function drawOnMouse(plots){
    ctx.beginPath();
    ctx.moveTo(plots[0].x,plots[0].y);
    for(var i=1;i<plots.length;i++){
        ctx.lineTo(plots[i].x,plots[i].y)
    }
    ctx.stroke();
}

function startDraw(e) {
    isActive = true;
}
  
function endDraw(e) {
    isActive = false;
    plots = [];
    var dataURL=canvas.toDataURL('image.png');
    console.log(dataURL);
    let a=document.createElement('a');
    a.href=dataURL;
    a.download=true;
    document.body.appendChild(a);
    document.forms["xyz"].submit();
}


