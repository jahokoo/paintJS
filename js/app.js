const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById('jsRange');
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clean = document.getElementById("jsClean");

const INITIAL_COLOR = "#1c1a1a";
const CANVAS_SIZE = 700;

// canvas의 픽셀사이즈를 주고 그안에서 작동
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 흰색 배경이 투명으로 저장되지않게 설정
ctx.fillStyle="white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); 

ctx.strokeStyle = INITIAL_COLOR; // default color
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 선 크기
ctx.lineCap = 'round'; //선 끝모양
ctx.lineJoin = 'round'; // 선 접합점


let painting = false;
let filling = false;

function startPainting() {
    if (filling === false) {
        painting = true;
        }
}

function stopPainting() {
    painting = false;
}

// convas의 x,y 위치를 알려준다.
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown() {
    painting = true;
}


function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function rangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "채우기"
        canvas.style.cursor = 'url("img/cursor.cur"), auto';
    } else {
        filling = true;
        mode.innerText ="그리기"
        canvas.style.cursor = 'url("img/fill_cursor.png"), auto';
    }
}

//
function canvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE) // fillRect(x, y, width, height)
    }
}

//우측 클릭 금지
function CM(event){
    event.preventDefault();
}

// 저장
function saveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.save = "Paint";
    link.click();
}

// 초기화
function cleanClick(){
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove) // 마우스의 움직임
    canvas.addEventListener("mousedown", startPainting) // 마우스의 클릭지점
    canvas.addEventListener("mouseup", stopPainting) // 마우스 클릭해제
    canvas.addEventListener("mouseleave", stopPainting) // 마우스가 canvas를 떠남
    canvas.addEventListener("click", canvasClick) // 캔버스에서 클리중일떄
    canvas.addEventListener("contextmenu",CM)
}

//colors를 array로 만들고 / forEach로 array에 들어있는 요소마다 클릭시 펑션실행 strokeStyle을 바꿔준다.
Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if (range) {
    range.addEventListener("input", rangeChange);
}

if (mode) {
    mode.addEventListener("click", modeClick);
}

if(save){
    save.addEventListener("click",saveClick);
}

if(clean){
    clean.addEventListener("click",cleanClick);
}
