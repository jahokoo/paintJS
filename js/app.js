const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// canvas의 픽셀사이즈를 주고 그안에서 작동
canvas.width= 700;
canvas.height=700;

ctx.strokeStyle = "#1c1a1a"; // default color
ctx.lineWidth = 2.5; // 선 크기

let painting = false;

function startPainting(){
    painting = true;
}
function stopPainting(){
    painting  = false;
}
// convas의 x,y 위치를 알려준다.
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();  // path = 선
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

//canvas에서 클릭 위치를 알려준다.
function onMouseDown(event){
    painting = true;
}


function onMouseLeave(event){

}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove) // 마우스의 움직임
    canvas.addEventListener("mousedown", startPainting) // 마우스의 클릭
    canvas.addEventListener("mouseup", stopPainting) // 마우스 클릭해제
    canvas.addEventListener("mouseleave",stopPainting) // 마우스가 canvas를 떠남
}