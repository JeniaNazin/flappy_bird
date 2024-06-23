const imgURL = "images/sprite.png";
const bgURL = "images/bg.png"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = imgURL;

const bg = new Image();
bg.src = bgURL;

const SPEED = 1.5; // константа для регулирования скорости анимации

const SIZE = [35, 26]; // размеры птицы

let gap = 100; // расстояние между трубами

let yBird = canvas.height/2; // нач позиция птицы

let birdGrav = 1; // свободное падение птицы

let index = 0; // переменная, необходимая для расчёта новых координат на каждом кадре

let pipe = []; // положение труб

pipe[0] = {
    x: canvas.width,
    y: 0
}

let score = 0; // результат
let bestscore = 3; // результат

document.addEventListener("keydown", birdMoveUp);

function birdMoveUp() {
    yBird -= 20;
}

const render = () => {
    index += 0.5;
    
    const backgroundX = -((index * SPEED) % canvas.width); // координата по оси Х фонового изображения
    
    const bgSource = { // объект, который хотим получить из изображения-источника
        x: 0,
        y: 0,
        width: 288,
        height: 512,
    };
  
    const bgPartOneResult = { // объект, который хотим отобразить на Canvas
        x: backgroundX + canvas.width,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    };

    const bgPartTwoResult = {
        x: backgroundX,
        y: 0,
        width: canvas.width,
        height: canvas.height
    }

    ctx.drawImage(
        bg,
    
        bgSource.x,
        bgSource.y,
        bgSource.width,
        bgSource.height,

        bgPartOneResult.x,
        bgPartOneResult.y,
        bgPartOneResult.width,
        bgPartOneResult.height
    );

    ctx.drawImage(
        bg,
    
        bgSource.x,
        bgSource.y,
        bgSource.width,
        bgSource.height,

        bgPartTwoResult.x,
        bgPartTwoResult.y,
        bgPartTwoResult.width,
        bgPartTwoResult.height
    );

    

    const fgSource = { // земля
        x: 277,
        y: 0,
        width: 224,
        height: 110
    };

    const fgResult = { // 
        x: 0,
        y: 470,
        width: canvas.width,
        height: 140
    };

    

    const birdSource = { // изображение птицы, которое копируем из изображения-источника
        x: 276,
        y: Math.floor((index % 9) / 3) * SIZE[1]+112, // 114 140 166
        width: 35,
        height: 27
    };
    const birdResult = { // координаты, по которым птица будет расположена на Canvas
        x: canvas.width/2 - SIZE[0]/2,
        y: yBird,
        width: 30,
        height: (0.2*gap)
    };
    ctx.drawImage(
        img,
        birdSource.x,
        birdSource.y,
        birdSource.width,
        birdSource.height,
        
        birdResult.x,
        birdResult.y,
        birdResult.width,
        birdResult.height
    );
    yBird += birdGrav;

    for (let i = 0; i < pipe.length; i++) {
        const pipeUpSource = { // труба снизу
            x: 502,
            y: 0,
            width: 52,
            height: 400
        };
        const pipeUpResult = {
            x: pipe[i].x,
            y: pipe[i].y + pipeUpSource.height + gap,
            width: (2*birdResult.width),
            height: 350
        };
        ctx.drawImage(
            img,
        
            pipeUpSource.x,
            pipeUpSource.y,
            pipeUpSource.width,
            pipeUpSource.height,
        
            pipeUpResult.x ,
            pipeUpResult.y,
            pipeUpResult.width,
            pipeUpResult.height
        ); 
    
        const pipeDownSource = { // труба сверху
            x: 554,
            y: 0,
            width: 52,
            height: 400
        };
        const pipeDownResult = {
            x: pipe[i].x,
            y: pipe[i].y,
            width: (2*birdResult.width),
            height: 350
        };
        ctx.drawImage(
            img,
        
            pipeDownSource.x,
            pipeDownSource.y,
            pipeDownSource.width,
            pipeDownSource.height,
        
            pipeDownResult.x ,
            pipeDownResult.y,
            pipeDownResult.width,
            pipeDownResult.height
        ); 
        pipe[i].x--;
        
        ctx.drawImage(
            img,
            fgSource.x,
            fgSource.y,
            fgSource.width,
            fgSource.height,

            fgResult.x,
            fgResult.y,
            fgResult.width,
            fgResult.height
            ); 
        if (pipe[i].x === (3*pipeDownResult.width)) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random()*pipeUpSource.height) - pipeUpSource.height
            })
        }
        if (birdResult.x + birdResult.width >= pipe[i].x 
            && birdResult.x <= pipe[i].x + pipeUpResult.width
            && (birdResult.y <= pipe[i].y + pipeUpResult.height
                || birdResult.y + birdResult.height >= pipeUpResult.y)
            || birdResult.y+birdResult.height >= fgResult.y) { //+
            cancelAnimationFrame(render);
            if (score >= bestscore) {
                localStorage.setItem("bestResult", score);
                bestscore = localStorage.getItem("bestResult");
            }
            const gameoverSource = {
                x: 194,
                y: 229,
                width: 188,
                height: 38
            };
            const gameoverResult = {
                x: canvas.width-0.7*canvas.width,
                y: canvas.height-0.6*canvas.height,
                width: gameoverSource.width,
                height: gameoverSource.height
            };
            ctx.drawImage(
                img,
                gameoverSource.x,
                gameoverSource.y,
                gameoverSource.width,
                gameoverSource.height,
    
                gameoverResult.x,
                gameoverResult.y,
                gameoverResult.width,
                gameoverResult.height
            );
            ctx.drawImage( // рестарт
                img,
                370,
                400,
                90,
                27,
        
                280,
                560,
                90,
                27
            );
            function button_restart(e) {
                if (e.offsetX >= 280 && e.offsetX <= 370 && e.offsetY >= 560 && e.offsetY <= 587) {
                    location.reload();
                }
            }
            document.addEventListener("click", button_restart);

            document.removeEventListener("keydown", birdMoveUp);
        }
        if (birdResult.x + birdResult.width == pipe[i].x) {
            score++;
        }
    };
    ctx.drawImage( // старт
        img,
        246,
        400,
        82,
        27,
        
        280,
        520,
        82,
        27
    );
    function button_start(e) {
        if (e.offsetX >= 280 && e.offsetX <= 362 && e.offsetY >= 520 && e.offsetY <= 547) {
            location.reload();
        }
    };
    document.addEventListener("click", button_start);

    ctx.drawImage( // окно с результатами
        img,

        174,
        272,
        225,
        115,

        0,
        485,
        225,
        115
    );

    ctx.fillstyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(score, 180, 535);
    ctx.fillText(bestscore, 175, 580);

    

    window.requestAnimationFrame(render);
};


img.onload = render;