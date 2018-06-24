/**
 * Created by dsying on 2018/6/24.
 */
let canvas6 = document.getElementById('canvas6');
setCanvasSize();
window.onresize = function () {
    setCanvasSize()
}

//动态设置 画板宽高
function setCanvasSize(){
    let pageWidth = document.documentElement.clientWidth;
    let pageHeight = document.documentElement.clientHeight;

    canvas6.width = pageWidth;
    canvas6.height = pageHeight;
}


//两点之间连线
function drawLine(p1,p2,context,lineWidth){
    context.lineWidth = lineWidth;//线宽
    context.beginPath();
    context.moveTo(p1.x,p1.y);//起点
    context.lineTo(p2.x,p2.y);//终点
    context.stroke();//描边
    context.closePath();
}

let ctx6 = canvas6.getContext('2d');
ctx6.strokeStyle = 'black';
let flag6 = false;
let lastPoint = {'x':undefined,'y':undefined};
let usingEraser = false;

if(document.body.ontouchstart !== undefined){
    canvas6.ontouchstart = function(){
        console.log('开始摸我了');
        console.log(event);
        if(usingEraser){
            ctx6.clearRect(event.touches[0].clientX-10,event.touches[0].clientY-10,20,20);
        }else{
            flag6 = true;
            lastPoint.x = event.touches[0].clientX;
            lastPoint.y = event.touches[0].clientY;
        }
    }
    canvas6.ontouchmove = function(){
        console.log('边摸边动了');
        if(usingEraser){
            ctx6.clearRect(event.touches[0].clientX-10,event.touches[0].clientY-10,20,20);
        }else{
            if(flag6){
                let newPoint = {'x':event.touches[0].clientX,'y':event.touches[0].clientY};
                //drawCircle(event.layerX,event.layerY,3,ctx6)
                drawLine(lastPoint,newPoint,ctx6,5);
                lastPoint = newPoint;
            }
        }
    }
    canvas6.ontouchend = function () {
        console.log('摸完了');
        flag6 = false;
    }
}else{
    canvas6.onmousedown = function(event){
        //console.log('down');
        if(usingEraser){
            ctx6.clearRect(event.layerX-10,event.layerY-10,20,20);
        }else{
            flag6 = true;
            lastPoint.x = event.layerX;
            lastPoint.y = event.layerY;
        }
    }
    canvas6.onmousemove = function(event){
        //console.log('move');
        if(usingEraser){
            ctx6.clearRect(event.layerX-10,event.layerY-10,20,20);
        }else{
            if(flag6){
                let newPoint = {'x':event.layerX,'y':event.layerY};
                //drawCircle(event.layerX,event.layerY,3,ctx6)
                drawLine(lastPoint,newPoint,ctx6,5);
                lastPoint = newPoint;
            }
        }

    }
    canvas6.onmouseup = function(){
        flag6 = false;
    }
}



eraser.onclick = function(){
    usingEraser = true;
    this.classList.add('active');
    brush.classList.remove('active');s
};

brush.onclick = function(){
    usingEraser = false;
    this.classList.add('active');
    eraser.classList.remove('active');
};

save.onclick = function(){
    let myImage = canvas6.toDataURL("image/png");
    console.log(myImage);
    let a = document.createElement('a');
    document.querySelector('body').appendChild(a);
    a.href = myImage;
    a.download='我的作品';
    a.target='_blank';
    a.click();
};

clear.onclick = function(){
    ctx6.clearRect(0, 0, canvas6.width, canvas6.height);
};

let colors = document.querySelectorAll('.colors>ul>li');
colors.forEach(function (li) {
    li.onclick = function(){
        ctx6.strokeStyle = this.style['background-color']
    }
})