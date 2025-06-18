// Canvas setup
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Function to resize the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Set initial size
resizeCanvas();

let leftdistance = window.innerWidth/25;
console.log(canvas.innerWidth)
let rightdistance = window.innerWidth - (leftdistance *4.5);

let startingyheight = window.innerHeight/10;

const trail = new Checkbox("trail?", `${startingyheight * 7.1}px`, `${rightdistance}px`, "trail");
const BallInc = new Checkbox("Change size per bounce?", `${startingyheight * 3.5}px`, `${rightdistance}px`, "ball_increase");
const ExplodingBalls = new Checkbox("Explode Balls?", `${startingyheight * 4.2}px`, `${rightdistance}px`, "exploding_balls");
const InvGravity = new Checkbox("Inverse Gravity?", `${startingyheight * 6.7}px`, `${rightdistance}px`, "inverse_gravity");
const GlowEffect = new Checkbox("Glow effect?", `${startingyheight * 2}px`, `${rightdistance}px`, "glow_effect");
const StopAfterTime = new Checkbox("Stop after Time?", `${startingyheight * 5}px`, `${rightdistance}px`, "stop_after_time");
const SameVelocities = new Checkbox("Same Velocities?", `${startingyheight * 1.5}px`, `${rightdistance}px`, "same_velocities");
const CreateALine = new Checkbox("Create a line for bounces?", `${startingyheight * 2.5}px`, `${rightdistance}px`, "create_a_line");
const BallChangeSize_idbox = new IncDecBox(rightdistance + 100, startingyheight * 4, 0, -5, 5, "change ball size by: ", 160);
const amountBallsToSpawn_idbox = new IncDecBox(leftdistance * 2.45, startingyheight * 6.2,1, 0, 20, "balls to add", 120);
const ballsToStart_idbox = new IncDecBox(leftdistance * 2.45, startingyheight * 5.6 , 1, 1, 20, "balls to start:", 120);
const explodingballs_idbox = new IncDecBox(rightdistance + 75, startingyheight * 4.65,1, 1, 20, "explode into?", 110);


const Hide_Hole = new Checkbox("Hide Holes...", `${startingyheight}px`, `${leftdistance}px`, "hide_holes");
const Multiple_Rings = new Checkbox("one ring? or multiple?", `${startingyheight * 1.5}px`, `${leftdistance}px`, "multiple_rings");
const show_ball_count = new Checkbox("Show the ball count?", `${startingyheight * 3}px`, `${leftdistance}px`, "show_ball_count");
const Music = new Checkbox("MUSIC?", `${startingyheight * 3.5}px`, `${leftdistance}px`, "music");
const timer = new Checkbox("Should there be a timer?", `${startingyheight * 4.3}px`,`${leftdistance}px`, "timer");


const Paused = new Checkbox("Pause?", `${startingyheight * .5}px`, `${rightdistance}px`, "paused");


// Create Reset Animation button with a reset icon
const resetButton = document.createElement("button");
resetButton.innerHTML = "&#x21bb;"; // Unicode clockwise open circle arrow
resetButton.style.position = "absolute";
resetButton.style.top = `${20}px`;
resetButton.style.left = `${window.innerWidth - 150}px`;
resetButton.style.width = "36px";
resetButton.style.height = "36px";
resetButton.style.borderRadius = "50%";
resetButton.style.background = "#222";
resetButton.style.color = "white";
resetButton.style.fontSize = "24px";
resetButton.style.border = "2px solid #888";
resetButton.style.cursor = "pointer";
resetButton.style.display = "flex";
resetButton.style.alignItems = "center";
resetButton.style.justifyContent = "center";
resetButton.style.zIndex = 1001;
document.body.appendChild(resetButton);

// Your reset logic here
resetButton.addEventListener("click", () => {
    resetAnimation();
});
// Place this after your resetButton code

// 1. Create the question mark button
const helpButton = document.createElement("button");
helpButton.innerText = "?";
helpButton.style.position = "absolute";
helpButton.style.top = 20 + "px"; // Position it below the reset button
helpButton.style.left = `${window.innerWidth - 50}px`; // Position it to the right of the reset button
helpButton.style.width = "36px";
helpButton.style.height = "36px";
helpButton.style.borderRadius = "50%";
helpButton.style.background = "#222";
helpButton.style.color = "white";
helpButton.style.fontWeight = "bold";
helpButton.style.fontSize = "24px";
helpButton.style.border = "2px solid #888";
helpButton.style.cursor = "pointer";
helpButton.style.display = "flex";
helpButton.style.alignItems = "center";
helpButton.style.justifyContent = "center";
helpButton.style.zIndex = 1001;
document.body.appendChild(helpButton);

// 2. Create the help overlay (hidden by default)
const helpOverlay = document.createElement("div");
helpOverlay.style.position = "fixed";
helpOverlay.style.top = "10%";
helpOverlay.style.left = "50%";
helpOverlay.style.transform = "translateX(-50%)";
helpOverlay.style.width = "60vw";
helpOverlay.style.height = "60vh";
helpOverlay.style.background = "#222";
helpOverlay.style.color = "white";
helpOverlay.style.border = "3px solid #888";
helpOverlay.style.borderRadius = "18px";
helpOverlay.style.boxShadow = "0 0 30px #000a";
helpOverlay.style.display = "none";
helpOverlay.style.flexDirection = "column";
helpOverlay.style.zIndex = 1002;
helpOverlay.style.overflow = "hidden";

// 3. Add a scrollable content area
const helpContent = document.createElement("div");
helpContent.style.overflowY = "auto";
helpContent.style.height = "calc(100% - 40px)";
helpContent.style.padding = "24px";
helpContent.innerHTML = `
  <h2>How to Use BALL-istic</h2>
  <p>
    Welcome! Here is all the information about Ball-istic and the controls.<br>
    BALL-istic is made by a high schooler who wants to be a coder. This was a passion project and did take a few months to make, so I hope you'll enjoy it. <br>
    Now let's dive into the controls:<br>
    <br>
    <b>THE MAIN CONTROLS:</b><br>
    - The "Reset Animation" button appears as a circular arrow icon. Clicking it will reset the animation.<br>
    - The "Pause" button allows you to pause and unpause the animation.<br>
    - The "?" button opens a help overlay with instructions on how to use the game.<br>

    <br>
    <b>All Other Controls:</b><br>
    - checkboxes can be toggled on and off to change the behavior of the game.<br>

    --> left side controls:<br>
    - The "Hide Holes" button will hide the holes on the circles.<br>
    - The "one ring? or multiple?" button will change the number of rings on the circles.<br>
    - > a slider will appear to change the number of rings.<br>
    - > more rings can be added with smaller radii of the holes (slider below)<br>
    - The "Show the ball count?" button will display the number of balls currently in the game.<br>
    - The "MUSIC?" button will toggle the background music on and off.<br>
    - > You can change the music by choosing the music file<br>
    - The "Should there be a timer?" button will toggle the timer on and off.<br>
    <br>
    - a "balls to start" control is to change the number of balls to start with.<br>
    - a "balls to add" control is to change the number of balls to add per ball leaving the circle.<br>
    - > e.g: if balls to add is set to 2, then every time a ball leaves the circle, 2 new balls will be added.<br>
    <br>
    - the "Max Amount of Balls" slider will change the maximum amount of balls in the game.<br>
    - the "Radius of the holes" slider will change the radius of the holes on the circles.<br>
    - the "Distance of Starting Ring" slider will change the distance of the starting ring from the center of the circles.<br>
    - the "Ball Size" slider will change the starting size of the balls.<br>
    - the "Max Size" slider will change the maximum size of the balls.<br>
    - > this slider also changes the size of the balls when they explode.<br>


    <br>
    --> right side controls:<br>
    - The "Same Velocities?" button will toggle the same velocities effect on and off.<br>
    - > this means that every ball will bounce the same way and direction.<br>
    - The "Glow effect?" button will toggle the glow effect on and off.<br>
    - The "Create a line for bounces?" button will toggle the line creation effect on and off.<br>
    - The "Change size per bounce?" button will toggle the size change of the balls on and off.<br>
    - > a control will appear to change the size of the balls per bounce
    - The "Explode Balls?" button will toggle the explosion effect on and off.<br>
    - > a control will appear to change the number of balls to explode into.<br>
    - > the balls explode according to the max size slider (explained later)<br>
    - The "Stop after Time?" button will toggle the stop after time effect on and off.<br>
    - > a slider will appear to change the time after which the ball stops.<br>
    - > this is a beta feature and may not work as expected.<br>
    - the "Gravity" slider will change the gravity of the game.<br>
    - The "Inverse Gravity?" button will toggle the inverse gravity effect on and off.<br>
    - The "trail?" button will toggle the trail effect on and off.<br>
    - > a slider will appear to change the length of the trail.<br>

    
    <br>
    <b> That's it, and I hope you enjoy the game/animation! </b><br>
    <br>

  </p>
`;
helpOverlay.appendChild(helpContent);

// 4. Add a red X close button
const closeButton = document.createElement("button");
closeButton.innerText = "✖";
closeButton.style.position = "absolute";
closeButton.style.top = "8px";
closeButton.style.right = "16px";
closeButton.style.background = "transparent";
closeButton.style.color = "red";
closeButton.style.border = "none";
closeButton.style.fontSize = "28px";
closeButton.style.cursor = "pointer";
closeButton.style.fontWeight = "bold";
closeButton.style.zIndex = 1003;
helpOverlay.appendChild(closeButton);

document.body.appendChild(helpOverlay);

// 5. Show/hide logic
helpButton.addEventListener("click", () => {
    helpOverlay.style.display = "flex";
});
closeButton.addEventListener("click", () => {
    helpOverlay.style.display = "none";
});

// Create Pause/Unpause button
const pauseButton = document.createElement("button");
pauseButton.style.position = "absolute";
pauseButton.style.top = 20 + "px"; // 45px below reset button
pauseButton.style.left = `${window.innerWidth - 100}px`;;
pauseButton.style.width = "36px";
pauseButton.style.height = "36px";
pauseButton.style.borderRadius = "8px";
pauseButton.style.background = "#222";
pauseButton.style.color = "white";
pauseButton.style.fontSize = "24px";
pauseButton.style.border = "2px solid #888";
pauseButton.style.cursor = "pointer";
pauseButton.style.display = "flex";
pauseButton.style.alignItems = "center";
pauseButton.style.justifyContent = "center";
pauseButton.style.zIndex = 1001;
document.body.appendChild(pauseButton);

// Pause state variable
let isPaused = false;

// Function to update button icon
function updatePauseButtonIcon() {
    if (isPaused) {
        // Play icon (triangle)
        pauseButton.innerHTML = "&#9654;"; // Unicode triangle
    } else {
        // Pause icon (two bars)
        pauseButton.innerHTML = "&#10073;&#10073;"; // Unicode double bar
    }
}
updatePauseButtonIcon();

// Pause button event
pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    updatePauseButtonIcon();
    Paused.checkbox.checked = isPaused; // Sync with your Paused checkbox if needed
});


// --___________________________________________
//TESTING

let clicks = [];

// Store click positions
canvas.addEventListener("click", function(event) {
    const x = event.clientX;
    const y = event.clientY;
    clicks.push({ x, y });
});


class stoppedBall {
    constructor(position, color, radius) {
        this.pos = { x: position[0], y: position[1] };
        this.color = color
        this.radius = radius;
    }
}

let stoppedBalls = []
class Ball {
    constructor(position, velocity) {
        this.pos = { x: position[0], y: position[1] };
        this.vel = { x: velocity[0], y: velocity[1] };
        if (SameVelocities.checked) {
            this.vel = {x: set_vel.x, y: set_vel.y};
        }
        this.color = `rgb(${Math.random() * 155 + 100}, ${Math.random() * 155 + 100}, ${Math.random() * 155 + 100})`;
        this.isIn = true;
        this.dead = true;
        this.trail = [];
        this.radius = ballRadius;
        this.spawnTime = performance.now();
        this.linePOS = [];

    }

    update(trail_length) {

        let elapsedTime = (performance.now() - this.spawnTime) / 1000; // Convert ms to seconds
        
        if (StopAfterTime.checked && elapsedTime >= stop_after_x) {
            // Stop movement but allow rendering
            if (this.isIn) {
                this.dead = false
                stoppedBalls.push(new stoppedBall([this.pos.x, this.pos.y], this.color, this.radius))
                if (balls.length < maxBalls) {
                    for (let i = 0; i < balls_to_spawn; i++) {
                        balls.push(new Ball([canvas.width / 2, canvas.height / 2 - startingyheight * 1], [Math.random() * 8 - 4, Math.random() * 2 - 1]));
                    }
                }
            }
        }
        // Update trail history
        if (trail.checked) {
            this.trail.push({ x: this.pos.x, y: this.pos.y });
            if (this.trail.length > trail_length) { // Limit trail length
                while (this.trail.length > trail_length) {
                    this.trail.shift();
                }
            }
        } else {
            this.trail = []; // Clear trail if disabled
        }
    }

    
}

class Circle {
    constructor(radius) {
        this.center = { x: canvas.width / 2, y: canvas.height / 2};
        this.radius = radius;  // Save the radius for later use
    }   
}


class Rotator {
    constructor(position, radius) {
        this.defaultPos = { x: position[0], y: position[1] };
        this.radius_to_orbit = radius;
        this.angle = Math.random() * 2 * Math.PI; // Random angle in radians
        this.color = 'white';
        this.speed = (Math.random() * 0.05) + 0.01;
        this.pos = {
            x: this.defaultPos.x + this.radius_to_orbit * Math.cos(this.angle),
            y: this.defaultPos.y + this.radius_to_orbit * Math.sin(this.angle)
        };
    }

    update() {
        // Check if the checkbox is checked
        if (Hide_Hole.checked) {
            this.pos.x = 50; // Move to top-left corner
            this.pos.y = 50;
        } else {
            this.angle += this.speed;
            this.pos.x = circleCenter.x + this.radius_to_orbit * Math.cos(this.angle);
            this.pos.y = circleCenter.y + this.radius_to_orbit * Math.sin(this.angle);
        }
    }
}





let fontSize = startingyheight/6;
let lengthSliders = window.innerWidth / 6
console.log(fontSize)

let balls = [];
let circles = [];
let rotators = [];

let set_vel = { x: Math.random() * 8 - 4, y: Math.random() * 2 - 1 };

circles.push(new Circle(150));
rotators.push(new Rotator([canvas.width / 2, canvas.height / 2 - 80], 150))

let time_length = 60;
let timer_AMOUNT = new Slider(90,startingyheight * 5.2,lengthSliders,20,180, time_length, 0, "Time_Length:", fontSize);


let gravity = 0.4;
let gravity_AMOUNT = new Slider(rightdistance,startingyheight * 6.4,lengthSliders,0.0,0.6, gravity, 0, "Gravity:", fontSize);

let circleCenter = { x: canvas.width / 2, y: canvas.height / 2};
let circleRadius = 150;
let ballRadius = 5;
let ballRad_AMOUNT = new Slider(leftdistance, startingyheight * 9.3, lengthSliders, 5, 50, ballRadius, 1, "Ball Size:", fontSize);

let startAngle = -Math.PI / 6;
let endAngle = Math.PI / 6;
let spinningSpeed = 0.01;
let maxBalls = 250;
let slider_AMOUNT = new Slider(leftdistance, startingyheight * 7.8, lengthSliders, 10, 500, maxBalls, 1, "Max Amount of Balls:", fontSize);
let type = 0;
let rotator_size = 20;
let rotator_AMOUNT = new Slider(leftdistance,startingyheight * 8.3,lengthSliders,12,50,rotator_size, 1, "Radius of the Holes:", fontSize)
let balls_to_spawn = 2;

let ring_time = 2;
let prev_ring_time = ring_time;
let prev_rotator_size = rotator_size;

let prev_starting_ring = 150;
let starting_ring = 150;
let trail_length = 20;

let ballMAXsize = 75;
let ballMAXsizeAMOUNT = new Slider(leftdistance,startingyheight * 9.8,lengthSliders,30,250,ballMAXsize, 1, "ball MAX size", fontSize);

let stop_after_x = 2;

let stop_after_x_AMOUNT = new Slider(rightdistance,startingyheight * 5.7,lengthSliders,2,10,stop_after_x, 1, "stop after X seconds", fontSize);

let trail_AMOUNT = new Slider(rightdistance,startingyheight * 7.8,lengthSliders,0,50,trail_length, 1, "Length of the trail:", fontSize);
let ring_AMOUNT =  new Slider(leftdistance,startingyheight * 2.5,lengthSliders,2,20,ring_time, 1, "Amount of Rings: ", fontSize);
let starting_ring_AMOUNT = new Slider(leftdistance,startingyheight * 8.8,lengthSliders,100,200,starting_ring, 1, "Distance of Starting Ring:", fontSize);
let balls_start = 1;

let countdown = time_length; // Set countdown based on slider
let timerInterval;

let explode_amount = 0;

canvas.addEventListener('mousedown', (e) => slider_AMOUNT.handleEvent(e));
canvas.addEventListener('mouseup', (e) => slider_AMOUNT.handleEvent(e));
canvas.addEventListener('mousemove', (e) => slider_AMOUNT.handleEvent(e));
canvas.addEventListener('mousedown', (e) => rotator_AMOUNT.handleEvent(e));
canvas.addEventListener('mouseup', (e) => rotator_AMOUNT.handleEvent(e));
canvas.addEventListener('mousemove', (e) => rotator_AMOUNT.handleEvent(e));
canvas.addEventListener('mousedown', (e) => ring_AMOUNT.handleEvent(e));
canvas.addEventListener('mouseup', (e) => ring_AMOUNT.handleEvent(e));
canvas.addEventListener('mousemove', (e) => ring_AMOUNT.handleEvent(e));
canvas.addEventListener('mousedown', (e) => starting_ring_AMOUNT.handleEvent(e));
canvas.addEventListener('mouseup', (e) => starting_ring_AMOUNT.handleEvent(e));
canvas.addEventListener('mousemove', (e) => starting_ring_AMOUNT.handleEvent(e));
canvas.addEventListener('mousedown', (e) => gravity_AMOUNT.handleEvent(e));
canvas.addEventListener('mouseup', (e) => gravity_AMOUNT.handleEvent(e));
canvas.addEventListener('mousemove', (e) => gravity_AMOUNT.handleEvent(e));
canvas.addEventListener('mousedown', (e) => trail_AMOUNT.handleEvent(e));
canvas.addEventListener('mouseup', (e) => trail_AMOUNT.handleEvent(e));
canvas.addEventListener('mousemove', (e) => trail_AMOUNT.handleEvent(e));
canvas.addEventListener('mousedown', (e) => ballRad_AMOUNT.handleEvent(e));
canvas.addEventListener('mouseup', (e) => ballRad_AMOUNT.handleEvent(e));
canvas.addEventListener('mousemove', (e) => ballRad_AMOUNT.handleEvent(e));
canvas.addEventListener('mousedown', (e) => ballMAXsizeAMOUNT.handleEvent(e));
canvas.addEventListener('mouseup', (e) => ballMAXsizeAMOUNT.handleEvent(e));
canvas.addEventListener('mousemove', (e) => ballMAXsizeAMOUNT.handleEvent(e));
canvas.addEventListener('mousedown', (e) => timer_AMOUNT.handleEvent(e));
canvas.addEventListener('mouseup', (e) => timer_AMOUNT.handleEvent(e));
canvas.addEventListener('mousemove', (e) => timer_AMOUNT.handleEvent(e));
canvas.addEventListener('mousedown', (e) => stop_after_x_AMOUNT.handleEvent(e));
canvas.addEventListener('mouseup', (e) => stop_after_x_AMOUNT.handleEvent(e));
canvas.addEventListener('mousemove', (e) => stop_after_x_AMOUNT.handleEvent(e));

canvas.addEventListener('click', (event) => amountBallsToSpawn_idbox.handleEvent(event));
canvas.addEventListener('click', (event) => ballsToStart_idbox.handleEvent(event));
canvas.addEventListener('click', (event) => BallChangeSize_idbox.handleEvent(event));
canvas.addEventListener('click', (event) => explodingballs_idbox.handleEvent(event));


// PROPORTIONALITY CONSTANTS

//400:2000 so 1:5
AnimationBox = window.innerWidth/5 
if ((window.innerHeight/5 * 2) < AnimationBox) {
    AnimationBox = (window.innerHeight/5 * 2)

}
console.log(AnimationBox)

leftbox = 10;
rightbox = window.innerWidth - 10;

const audioInput = document.createElement("input");
audioInput.type = "file";
audioInput.accept = "audio/*";
audioInput.style.position = "absolute";
audioInput.style.top = `${startingyheight * 3.85}px`;
audioInput.style.left = `${leftdistance + 5}px`;
audioInput.style.color = "#FFD700"; // Gold, or pick any color you like
document.body.appendChild(audioInput);

const style = document.createElement('style');
style.innerHTML = `
input[type="file"]::file-selector-button {
    color: #FFD700; /* Gold */
    background: #222;
    border: 1px solid #FFD700;
}
input[type="file"] {
    color: #FFD700 !important; /* Gold for the "No file chosen" text */
}
`;
document.head.appendChild(style);

let importedAudioBuffer = null;
let importedAudioSegments = [];
let importedAudioContext = null;
let importedAudioSegmentDuration = 0.3; // seconds per segment
let importedAudioCurrentSegment = 0;

audioInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!importedAudioContext) {
        importedAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const arrayBuffer = await file.arrayBuffer();
    importedAudioBuffer = await importedAudioContext.decodeAudioData(arrayBuffer);

    // Split into segments
    importedAudioSegments = [];
    const totalDuration = importedAudioBuffer.duration;
    const segmentLength = importedAudioSegmentDuration;
    let offset = 0;
    while (offset < totalDuration) {
        importedAudioSegments.push(offset);
        offset += segmentLength;
    }
    importedAudioCurrentSegment = 0;
    alert("Audio imported and split into segments!");
});

function playImportedAudioSegment() {
    if (!importedAudioBuffer || !importedAudioContext) return;
    if (importedAudioSegments.length === 0) return;

    const start = importedAudioSegments[importedAudioCurrentSegment];
    const duration = importedAudioSegmentDuration;
    const source = importedAudioContext.createBufferSource();
    source.buffer = importedAudioBuffer;

    // Create a gain node to avoid clicks
    const gainNode = importedAudioContext.createGain();
    gainNode.gain.setValueAtTime(1, importedAudioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, importedAudioContext.currentTime + duration);

    source.connect(gainNode).connect(importedAudioContext.destination);
    source.start(0, start, duration);

    importedAudioCurrentSegment = (importedAudioCurrentSegment + 1) % importedAudioSegments.length;
}
// Reset function
let change_size = 0;
let glow_change = 5
function resetAnimation(num) {
    balls = []
    circles = []
    rotators = []

    Paused.unchecked;

    stoppedBalls = []

    time_length = timer_AMOUNT.getValue();
    countdown = Math.round(time_length); // Reset timer

    if (timer.checked) {
        if (timerInterval) clearInterval(timerInterval); // Clear any existing timer
        timerInterval = setInterval(() => {
            if (countdown > 0) {
                countdown--;
            } else {
                clearInterval(timerInterval); // Stop countdown at 0
            }
        }, 1000); // Update every second
    }
    rotator_size = rotator_AMOUNT.getValue();
    starting_ring = starting_ring_AMOUNT.getValue();
    gravity = gravity_AMOUNT.getValue();
    trail_length = trail_AMOUNT.getValue();

    if (InvGravity.checked) {
        gravity = -1 * gravity
    }
    balls_to_spawn = amountBallsToSpawn_idbox.getValue();
    if (BallInc.checked) {
        change_size = BallChangeSize_idbox.getValue();
    } else {
        change_size = 0;
    }

    balls_start = ballsToStart_idbox.getValue();
    if (num === 0) {
        startAngle = -Math.PI / 6;
        endAngle = Math.PI / 6;
        maxBalls = slider_AMOUNT.getValue();
        gravity = gravity_AMOUNT.getValue();

        rotators.push(new Rotator([canvas.width / 2, canvas.height / 2], starting_ring))
        circles.push(new Circle(starting_ring));
        for (let i = 0; i < balls_start; i++) {
            balls.push(new Ball([canvas.width / 2, canvas.height / 2], [Math.random() * 8 - 4, Math.random() * 2 - 1]));
        }
    } else if (num === 1) {
        ring_time = ring_AMOUNT.getValue();
        if ((AnimationBox-starting_ring)/(rotator_size * 1.5) < ring_time) {
            ring_time = (AnimationBox-starting_ring)/(rotator_size * 1.5);
        }
        for (let x = 0; x < ring_time; x++) {
            circles.push(new Circle(starting_ring + rotator_size * 1.5 * (x)));
            rotators.push(new Rotator([canvas.width / 2, canvas.height / 2], starting_ring + rotator_size * 1.5 * (x)))
        }
        for (let i = 0; i < balls_start; i++) {
            balls.push(new Ball([canvas.width / 2, canvas.height / 2], [Math.random() * 8 - 4, Math.random() * 2 - 1]));
        }
    }
}

// Add event listener to reset button
prev_checked = false
mode = 0

topdistance = window.innerHeight/10


let timeRemaining = timer_AMOUNT.getValue(); // Get the timer length from the slider
let timerActive = false; // Flag to control the timer

function drawTimer() {
    if (timer.checked) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        let minutes = Math.trunc(countdown/60)
        let seconds = countdown - minutes * 60
        if (seconds < 10) {
            ctx.fillText(`Time Left: ${minutes}:0${seconds}`, window.innerWidth/2, topdistance);
        } else {
            ctx.fillText(`Time Left: ${minutes}:${seconds}`, window.innerWidth/2, topdistance);
    
        }
    }
}

let hue = 0;
let hueDirection = 1;

resetButton.addEventListener("click", () => {
    resetAnimation(mode);
});

balls.push(new Ball([canvas.width / 2, canvas.height / 2 - startingyheight * 1], [Math.random() * 8 - 4, Math.random() * 2 - 1]));

// Preload piano sounds
const pianoNotes = [];
const numNotes = 7; // Adjust based on how many sound files you have

const noteFiles = [
    "A0.mp3", "A1.mp3", "A2.mp3", "A3.mp3", "A4.mp3", "A5.mp3", "A6.mp3", "A7.mp3",
    "Ab1.mp3", "Ab2.mp3", "Ab3.mp3", "Ab4.mp3", "Ab5.mp3", "Ab6.mp3", "Ab7.mp3",
    "B0.mp3", "B1.mp3", "B2.mp3", "B3.mp3", "B4.mp3", "B5.mp3", "B6.mp3", "B7.mp3",
    "Bb0.mp3", "Bb1.mp3", "Bb2.mp3", "Bb3.mp3", "Bb4.mp3", "Bb5.mp3", "Bb6.mp3", "Bb7.mp3",
    "C1.mp3", "C2.mp3", "C3.mp3", "C4.mp3", "C5.mp3", "C6.mp3", "C7.mp3", "C8.mp3",
    "D1.mp3", "D2.mp3", "D3.mp3", "D4.mp3", "D5.mp3", "D6.mp3", "D7.mp3",
    "Db1.mp3", "Db2.mp3", "Db3.mp3", "Db4.mp3", "Db5.mp3", "Db6.mp3", "Db7.mp3", "Db8.mp3",
    "E1.mp3", "E2.mp3", "E3.mp3", "E4.mp3", "E5.mp3", "E6.mp3", "E7.mp3",
    "Eb1.mp3", "Eb2.mp3", "Eb3.mp3", "Eb4.mp3", "Eb5.mp3", "Eb6.mp3", "Eb7.mp3",
    "F1.mp3", "F2.mp3", "F3.mp3", "F4.mp3", "F5.mp3", "F6.mp3", "F7.mp3",
    "G1.mp3", "G2.mp3", "G3.mp3", "G4.mp3", "G5.mp3", "G6.mp3", "G7.mp3",
    "Gb1.mp3", "Gb2.mp3", "Gb3.mp3", "Gb4.mp3", "Gb5.mp3", "Gb6.mp3", "Gb7.mp3"
];

noteFiles.forEach(note => {
    const audio = new Audio(`./PIANOSOUNDS/${note}`);
    audio.onloadeddata = () => console.log(`Loaded: ${note}`);
    audio.onerror = () => console.error(`Error loading: ${note}`);
    pianoNotes.push(audio);
});





ithval = 0;
beat = [
    [57, 40, 33], [40, 57], [57], [57],  // Chords and single notes
    [40, 40, 40], [57, 74], [74],        // Melody with harmony
    [57, 40, 33], [40, 57], [57], [57],  
    [40, 40], [57, 40], [33]  
];

function playNote() {
    let currentNotes = beat[ithval];  // Get the notes for this step
    if (!Array.isArray(currentNotes)) {
        currentNotes = [currentNotes]; // Convert single notes into an array
    }

    currentNotes.forEach(noteIndex => {
        const note = new Audio(pianoNotes[noteIndex].src);
        note.currentTime = 0;
        note.play();
    });

    ithval = (ithval + 1) % beat.length;
}


document.addEventListener("click", () => {
    console.log("User interacted, enabling sound.");
    playNote(); // Now it should work
}, { once: true }); // Ensures it runs only once



resetAnimation(0)
function update() {



    if (StopAfterTime.checked) {
        stop_after_x = stop_after_x_AMOUNT.getValue();
    }

    startAngle += spinningSpeed;
    endAngle += spinningSpeed;
    maxBalls = slider_AMOUNT.getValue();
    gravity = gravity_AMOUNT.getValue();
    trail_length = trail_AMOUNT.getValue();
    ballRadius = ballRad_AMOUNT.getValue();
    ballMAXsize = ballMAXsizeAMOUNT.getValue();
    if (timer.checked) {
        time_length = timer_AMOUNT.getValue();
    }

    if (InvGravity.checked) {
        gravity = -1 * gravity
    }
    
    if (circles.length > 0) {
        if (ballMAXsize > circles[0].radius) {
            ballMAXsize = circles[0].radius;
        }
    }
    balls_to_spawn = amountBallsToSpawn_idbox.getValue();
    if (BallInc.checked) {
        change_size = BallChangeSize_idbox.getValue();
    } else {
        change_size = 0;
    }
    if (ExplodingBalls.checked) {
        explode_amount = explodingballs_idbox.getValue();
    }
    let newRingTime = Math.round(ring_AMOUNT.getValue());
    let newRotatorSize = Math.round(rotator_AMOUNT.getValue()); // if needed
    let newStartRing = Math.round(starting_ring_AMOUNT.getValue());
    if (newRotatorSize !== prev_rotator_size || newStartRing != prev_starting_ring) {
        resetAnimation(mode);
    } else if (newRingTime !== prev_ring_time) {
        if (prev_checked) {
            resetAnimation(1);
        }
    }
    
    prev_rotator_size = newRotatorSize;
    prev_ring_time = newRingTime;
    prev_starting_ring = newStartRing

    if (Paused.checked === false) {
        
        

        // Update all rotators in the array
        rotators.forEach(rotator => {
            rotator.update();
        });



        balls = balls.filter(ball => ball.dead); 
        
        balls.forEach((ball, index) => {
            ball.vel.y += gravity;
            ball.pos.x += ball.vel.x;
            ball.pos.y += ball.vel.y;

            let dx = ball.pos.x - circleCenter.x;
            let dy = ball.pos.y - circleCenter.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            let outOfBounds = ball.pos.x < 0 || ball.pos.x > canvas.width || ball.pos.y > canvas.height || ball.pos.y < 0;

            if (outOfBounds) {
                ball.dead = false; // Mark ball as "out"
            }
            if (circles.length > 0) {
                if (dist + ball.radius > circles[0].radius) { 
                    //outside of the circle (bring it back in)
                    if (Math.hypot(ball.pos.x - rotators[0].pos.x, ball.pos.y - rotators[0].pos.y) < prev_rotator_size) {
                        // Maybe it's at a rotator?
                        if (prev_checked === false) {
                            if (balls.length < maxBalls && ball.isIn) {
                                for (let i = 0; i < balls_to_spawn; i++) {
                                    balls.push(new Ball([canvas.width / 2, canvas.height / 2 - startingyheight * 1], [Math.random() * 8 - 4, Math.random() * 2 - 1]));
                                }
                            }
                            ball.isIn = false;

                        } else {
                            for (let i = 0; i < balls_to_spawn; i++) {
                                balls.push(new Ball([canvas.width / 2, canvas.height / 2 - startingyheight * 1], [Math.random() * 8 - 4, Math.random() * 2 - 1]));
                            }
                            circles.shift()
                            if (CreateALine.checked && balls.length === 1) {
                                ball.linePOS = []
                            }
                            rotators.shift()
                        }
                        
                    }
                    if (circles.length > 0) {
                        if (ball.isIn && dist + ball.radius > circles[0].radius) {
                            if (Music.checked) {
                                if (importedAudioBuffer) {
                                    playImportedAudioSegment();
                                } else {
                                    playNote();
                                }
                            }
                            if (BallInc.checked) {
                                ball.radius += change_size;
                                if (ball.radius <= 0) {
                                    ball.dead = false;
                                } else if (ball.radius > ballMAXsize) {
                                    ball.radius = ballMAXsize;
                                    if (ExplodingBalls.checked) {
                                        for (let i = 0; i < explode_amount; i++) {
                                            balls.push(new Ball([ball.pos.x, ball.pos.y], [Math.random() * 8 - 4, Math.random() * 2 - 1]));
                                            if (balls.length > maxBalls) {
                                                break
                                            }
                                        }

                                        ball.dead = false;

                                    }
                                }
                            }
                            let angle = Math.atan2(dy, dx);
                            ball.pos.x = circleCenter.x + (circles[0].radius - ball.radius) * Math.cos(angle);
                            ball.pos.y = circleCenter.y + (circles[0].radius - ball.radius) * Math.sin(angle);
                            if (CreateALine.checked && balls.length === 1) {
                                ball.linePOS.push({ x: ball.pos.x, y: ball.pos.y });
                            }
                            let tangentX = -dy;
                            let tangentY = dx;
                            let tangentMag = Math.sqrt(tangentX * tangentX + tangentY * tangentY);
                            tangentX /= tangentMag;
                            tangentY /= tangentMag;
                            let dotProduct = ball.vel.x * tangentX + ball.vel.y * tangentY;
                            ball.vel.x = 2 * dotProduct * tangentX - ball.vel.x;
                            ball.vel.y = 2 * dotProduct * tangentY - ball.vel.y;
                        }
                    }
                }
            }
            for (let stopped of stoppedBalls) {
                let sx = stopped.pos.x;
                let sy = stopped.pos.y;
                let sr = stopped.radius;
        
                let distance = Math.sqrt((ball.pos.x - sx) ** 2 + (ball.pos.y - sy) ** 2);
                if (distance < ball.radius + sr) {
                    let nx = (ball.pos.x - sx) / distance;
                    let ny = (ball.pos.y - sy) / distance;
                
                    // Calculate the normal velocity component
                    let dotProduct = ball.vel.x * nx + ball.vel.y * ny;
                    
                    ball.vel.x -= 2 * dotProduct * nx;
                    ball.vel.y -= 2 * dotProduct * ny;
                    
                    // Add slight randomness to avoid infinite bounces
                    ball.vel.x += (Math.random() - 0.5) * 0.5;
                    ball.vel.y += (Math.random() - 0.5) * 0.5;
                
                    // Move ball outside of collision zone to prevent sticking
                    let overlap = (ball.radius + sr) - distance;
                    ball.pos.x += overlap * nx;
                    ball.pos.y += overlap * ny;
                }
            }

            ball.update(trail_length);

        });

        //___________________________CHECKING FOR STUFF_____________________________________
        if (Multiple_Rings.checked === true && prev_checked === false) {
            resetAnimation(1);
            prev_checked = true;
        } else if (Multiple_Rings.checked === false && prev_checked === true) {
            resetAnimation(0);
            prev_checked = false;
        } else {
            prev_checked = Multiple_Rings.checked;
        }
        if (prev_checked == false) {
            mode = 0
        } else {
            mode = 1
        }
    }
}

let timeValue = 0; // Global variable to track time

function getCyclingColor() {
    let time = (Date.now() * 0.00005) % 2; // Slower transition
    let hue;

    if (time < 1) {
        // Forward cycle (0° to 270°)
        hue = time * 270; 
    } else {
        // Backward cycle (270° back to 0°)
        hue = 270 - ((time - 1) * 270);
    }

    return `hsl(${hue}, 100%, 50%)`; // Convert to HSL color format
}


// Function to log mouse position when clicked
function logMousePosition(event) {
    console.log(`Mouse clicked at: X = ${event.clientX}, Y = ${event.clientY}`);
}

// Attach event listener to canvas
canvas.addEventListener('click', logMousePosition);


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);





    let dynamicColor = GlowEffect.checked ? getCyclingColor() : 'white';

    // Create a gradient (horizontal gradient from left to right)
    let gradient = ctx.createLinearGradient(0, 0, leftbox, 0);
    if (GlowEffect.checked) {
        gradient.addColorStop(0, dynamicColor);
    } else {
        gradient.addColorStop(0, "white");  // Start with light blue
    }
    gradient.addColorStop(.5, "black");   // End with dark blue

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,leftbox, canvas.height)

    // Create a gradient (horizontal gradient from left to right)
    gradient = ctx.createLinearGradient(rightbox, 0, canvas.width, 0);

    gradient.addColorStop(.5, "black");  // Start with light blue
    if (GlowEffect.checked) {
        gradient.addColorStop(1, dynamicColor);
    } else {
        gradient.addColorStop(1, "white");  // Start with light blue
    }


    ctx.fillStyle = gradient;

    ctx.fillRect(rightbox,0, canvas.width, canvas.height)

    ctx.font = "20px Arial";


    circles.forEach((circ) => {
        ctx.strokeStyle = 'orange';
        ctx.beginPath();
        ctx.arc(circ.center.x, circ.center.y, circ.radius, 0, Math.PI * 2);
        ctx.stroke();
    });

    rotators.forEach(rotate => {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(rotate.pos.x, rotate.pos.y, rotator_size, 0, Math.PI * 2);
        ctx.fill();
    });

    balls.forEach(ball => {
        if (trail.checked) {
            ctx.globalAlpha = 0.5; 
            ball.trail.forEach(pos => {
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, ball.radius / 2, 0, Math.PI * 2);
                ctx.fillStyle = ball.color;
                ctx.fill();
            });
            ctx.globalAlpha = 1.0;
        }

        if (GlowEffect.checked) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = ball.color;
        } else {
            ctx.shadowBlur = 0;
        }

        if (ball.radius > 0) {
            ctx.beginPath();
            ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();
        } else {
            ball.dead = false;
        }
    });

    ctx.shadowBlur = 0;
    if (CreateALine.checked && balls.length === 1) {
        const currentBall = balls[0];

        if (currentBall.linePOS.length > 0) {
        ctx.strokeStyle = 'white'; // Set line color
        if (GlowEffect.checked) {
            ctx.strokeStyle = dynamicColor;
        }
        ctx.lineWidth = 2; // Adjust line thickness if needed

        // Iterate through stored positions in linePOS and draw lines
            for (let i = 0; i < currentBall.linePOS.length; i++) {
                const pos = currentBall.linePOS[i];

                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y); // Start at the stored position
                ctx.lineTo(currentBall.pos.x, currentBall.pos.y); // Draw to the current ball position
                ctx.stroke();
            }
        }
    }
    
    
    stoppedBalls.forEach(sball => {
        if (sball.radius > 0) {
            ctx.beginPath();
            ctx.arc(sball.pos.x, sball.pos.y, sball.radius, 0, Math.PI * 2);
            ctx.fillStyle = sball.color;
            ctx.fill();
        }
    });
    ctx.shadowBlur = 20;

    // Apply color change to ID Boxes
    ctx.fillStyle = dynamicColor;
    amountBallsToSpawn_idbox.draw(ctx);
    ballsToStart_idbox.draw(ctx);
    if (BallInc.checked) BallChangeSize_idbox.draw(ctx);
    if (ExplodingBalls.checked) explodingballs_idbox.draw(ctx);

    ctx.shadowBlur = 75;
    slider_AMOUNT.draw(ctx, maxBalls.toString());
    
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";

    rotator_AMOUNT.draw(ctx, rotator_size.toString());
    if (Multiple_Rings.checked) ring_AMOUNT.draw(ctx, Math.round(ring_time).toString());
    starting_ring_AMOUNT.draw(ctx, starting_ring.toString());

    ctx.shadowBlur = 100;
    gravity_AMOUNT.draw(ctx, gravity.toString());
    ballRad_AMOUNT.draw(ctx, ballRadius.toString());
    ballMAXsizeAMOUNT.draw(ctx, ballMAXsize.toString());
    if (StopAfterTime.checked) {
        stop_after_x_AMOUNT.draw(ctx, stop_after_x.toString());
    }

    if (timer.checked) timer_AMOUNT.draw(ctx, Math.round(time_length).toString());
    if (trail.checked) trail_AMOUNT.draw(ctx, trail_length.toString());

    if (show_ball_count.checked) {
        ctx.fillStyle = 'red';
        ctx.font = "Bold 40px Verdana";
        ctx.fillText(`${balls.length}`, canvas.width/2, canvas.height/2);
    }

    drawTimer();

    ctx.fillStyle = "red";
    ctx.font = "16px Arial";

    for (let click of clicks) {
        const text = `(${click.x}, ${click.y})`;
        ctx.fillText(text, click.x + 5, click.y - 5); // draw next to the click point
    }

}


// Remove delta and use a fixed 60 FPS loop with setInterval

function loop() {
if (!isPaused) update();
    draw();
}
setInterval(loop, 1000 / 55); // 60 FPS

