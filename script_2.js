const pipeSource = {
    x: 502,
    y: 0,
    width: 52,
    height: 400
};
const pipeResult = {
    x: canvas.width - pipeSource.width,
    y: canvas.height - (canvas.height - pipeSource.height),
    width: 52,
    height: 350
};
ctx.drawImage(
    img,

    pipeSource.x,
    pipeSource.y,
    pipeSource.width,
    pipeSource.height,

    pipeResult.x + pipeX,
    pipeResult.y,
    pipeResult.width,
    pipeResult.height
);

birdResult.x + birdResult.width >= pipe[i].x 
        && birdResult.x <= pipe[i].x + pipeUpResult.width
        && (birdResult.y <= pipe[i].y + pipeUpResult.height
        || birdResult.y + birdResult.height >= pipe[i].y + pipeUpResult.height + gap)

        
        if (birdResult.y+birdResult.height >= fgResult.y) {
            location.reload();
        }


        birdResult.x + birdResult.width >= pipe[i].x 
            && birdResult.x <= pipe[i].x + pipeUpResult.width
            && 