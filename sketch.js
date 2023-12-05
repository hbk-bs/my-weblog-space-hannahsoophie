//HTML references und global erklären
const saveButton = document.querySelector('button#save');
const colorInput = document.querySelector('input#color');
const brushButton = document.querySelector('button#brushButton'); // New button for the brush
const blurRange = document.querySelector('#blurRange'); // Add blurRange reference
const blurValue = document.querySelector('#blurValue'); // Add blurValue reference
let paintColor = '#ff6347';
colorInput.value = paintColor;


canvas.width = 500;
canvas.height =500;
document.getElementById('sketch').appendChild(canvas);
const ctx = canvas.getContext('2d');
let isDrawing = false;

const canvas = document.createElement('canvas');



// Define blur outside of the draw function
let blur = 0;

ctx.lineCap = 'round';
ctx.strokeStyle = `rgba(0,0,0,${blur / 100})`;

//canvas setup
function setup(){


canvas.parent('sketch');
background(0);
ctx.lineCap = 'round';
ctx.strokeStyle = `rgba(0,0,0,${blur / 100})`;

}

<input type="range" id="blurRange" />
//save Button
saveButton.addEventListener("click", function() {
    console.log('clicked');
    save('image.png');
});
//color change
colorInput.addEventListener("input", () => {
    paintColor = colorInput.value;
    let isDrawing = false;
});
//mouse presses = start drawing
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false
    ctx.beginPath();
}

function draw(e) {
    if (isDrawing) return;
    ctx.strokeStyle = paintColor;
    ctx.lineWidth = 5 + blur / 10; // Adjust line width based on blur
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    blurValue.textContent = blur;
}

// Set initial line properties outside of the draw function
ctx.lineCap = 'round';
ctx.strokeStyle = `rgba(0,0,0,${blur / 100})`;


//drawing actions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Brush button event listener
//Click- increaes by 10
brushButton.addEventListener('click', function () {
    blur += 10;
    if (blur > 100) {
        blur = 0;
    }
    ctx.lineWidth = 5 + blur / 10;
    blurValue.textContent = blur;
});

//Blur range
blurRange.addEventListener('input', () => {
    blur = blurRange.value;
    ctx.strokeStyle = `rgba(0,0,0,${blur / 100})`;
    blurValue.textContent = blur;
});

function mouseDragged() {
    fill(paintColor);
    circle(mouseX, mouseY, 10);
    line(pmouseX, pmouseY, mouseX, mouseY);
    for (let i = 0; i < 100; i++) {
        point(mouseX + random(-10, 10), mouseY + random(-10, 10));
    }
}

function buttonHandler() {
    save('image.png');
}

function keyPressed() {
    if (key === 's') {
        save('image.png');
    }
}