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

let leftdistance = window.innerWidth/19;
console.log(canvas.innerWidth)
let rightdistance = window.innerWidth - (leftdistance * 3.5);

const trail = new Checkbox("trail?", "150px", `${rightdistance}px`, "moveToCorner");
const BallInc = new Checkbox("Change size per bounce?", "200px", `${rightdistance}px`, "moveToCorner");
const ExplodingBalls = new Checkbox("Explode Balls?", "250px", `${rightdistance}px`, "moveToCorner");
const InvGravity = new Checkbox("Inverse Gravity?", "300px", `${rightdistance}px`, "moveToCorner");
const GlowEffect = new Checkbox("Glow effect?", "350px", `${rightdistance}px`, "moveToCorner");
const StopAfterTime = new Checkbox("Stop after Time?", "400px", `${rightdistance}px`, "moveToCorner");
const SameVelocities = new Checkbox("Same Velocities?", "450px", `${rightdistance}px`, "moveToCorner");
const CreateALine = new Checkbox("Create a line for bounces?", "500px", `${rightdistance}px`, "moveToCorner");
const BallChangeSize_idbox = new IncDecBox(rightdistance, 600, 0, -5, 5, "change ball size by: ", 160);
const amountBallsToSpawn_idbox = new IncDecBox(rightdistance, 630, 0, 0, 20, "balls to spawn?", 120);
const ballsToStart_idbox = new IncDecBox(rightdistance, 660, 1, 1, 20, "balls to start:", 120);
const explodingballs_idbox = new IncDecBox(rightdistance, 690, 0, 0, 20, "explode into?", 110);


const Hide_Hole = new Checkbox("Hide Holes...", "150px", `${leftdistance}px`, "moveToCorner");
const Multiple_Rings = new Checkbox("one ring? or multiple?", "175px", `${leftdistance}px`, "moveToCorner");
const show_ball_count = new Checkbox("Show the ball count?", "250px", `${leftdistance}px`, "moveToCorner");
const Music = new Checkbox("MUSIC?", "300px", `${leftdistance}px`, "moveToCorner");
const timer = new Checkbox("Should there be a timer?", "350px",`${leftdistance}px`, "moveToCorner");
const Paused = new Checkbox("Pause?", "110px", "1745px", "moveToCorner");


const resetButton = document.createElement("button");
resetButton.innerText = "Reset Animation";
resetButton.style.position = "absolute";
resetButton.style.top = "50px"; // Position below the checkbox
resetButton.style.left = "1700px";
resetButton.style.padding = "10px";
resetButton.style.cursor = "pointer";
document.body.appendChild(resetButton);

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
                        balls.push(new Ball([canvas.width / 2, canvas.height / 2 - 200], [Math.random() * 8 - 4, Math.random() * 2 - 1]));
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





let fontSize = 15;
console.log(fontSize)

let balls = [];
let circles = [];
let rotators = [];

let set_vel = { x: Math.random() * 8 - 4, y: Math.random() * 2 - 1 };

circles.push(new Circle(150));
rotators.push(new Rotator([canvas.width / 2, canvas.height / 2 - 80], 150))

let time_length = 60;
let timer_AMOUNT = new Slider(90,415,300,20,180, time_length, 0, "Time_Length:", fontSize);


let gravity = 0.4;
let gravity_AMOUNT = new Slider(1500,500,300,0.0,0.6, gravity, 0, "Gravity:", fontSize);

let circleCenter = { x: canvas.width / 2, y: canvas.height / 2};
let circleRadius = 150;
let ballRadius = 5;
let ballRad_AMOUNT = new Slider(60, 600, 300, 5, 50, ballRadius, 1, "Ball Size:", fontSize);

let startAngle = -Math.PI / 6;
let endAngle = Math.PI / 6;
let spinningSpeed = 0.01;
let maxBalls = 250;
let slider_AMOUNT = new Slider(60, 80, 300, 10, 500, maxBalls, 1, "Max Amount of Balls:", fontSize);
let type = 0;
let rotator_size = 20;
let rotator_AMOUNT = new Slider(300,300,300,12,50,rotator_size, 1, "Radius of the Holes:", fontSize)
let balls_to_spawn = 2;

let ring_time = 2;
let prev_ring_time = ring_time;
let prev_rotator_size = rotator_size;

let prev_starting_ring = 150;
let starting_ring = 150;
let trail_length = 20;

let ballMAXsize = 75;
let ballMAXsizeAMOUNT = new Slider(1500,780,300,30,250,ballMAXsize, 1, "ball MAX size", fontSize);

let stop_after_x = 1;

let stop_after_x_AMOUNT = new Slider(1600,880,300,3,10,stop_after_x, 1, "stop after X seconds", fontSize);

let trail_AMOUNT = new Slider(1500,600,300,0,50,trail_length, 1, "Length of the trail:", fontSize);
let ring_AMOUNT =  new Slider(leftdistance,245,300,2,20,ring_time, 1, "Amount of Rings: ", fontSize);
let starting_ring_AMOUNT = new Slider(1300,90,300,100,200,starting_ring, 1, "Distance of Starting Ring:", fontSize);
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

leftbox = window.innerWidth/2 - AnimationBox;
rightbox = window.innerWidth/2 + AnimationBox;



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

balls.push(new Ball([canvas.width / 2, canvas.height / 2 - 200], [Math.random() * 8 - 4, Math.random() * 2 - 1]));

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
                                    balls.push(new Ball([canvas.width / 2, canvas.height / 2 - 200], [Math.random() * 8 - 4, Math.random() * 2 - 1]));
                                }
                            }
                            ball.isIn = false;

                        } else {
                            for (let i = 0; i < balls_to_spawn; i++) {
                                balls.push(new Ball([canvas.width / 2, canvas.height / 2 - 200], [Math.random() * 8 - 4, Math.random() * 2 - 1]));
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
                                playNote();
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
        ctx.fillStyle = 'white';
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
    stop_after_x_AMOUNT.draw(ctx, stop_after_x.toString());

    if (timer.checked) timer_AMOUNT.draw(ctx, Math.round(time_length).toString());
    if (trail.checked) trail_AMOUNT.draw(ctx, trail_length.toString());

    if (show_ball_count.checked) {
        ctx.fillStyle = 'red';
        ctx.font = "Bold 40px Verdana";
        ctx.fillText(`${balls.length}`, canvas.innerWidth/2, canvas.innerHeight/2);
    }

    drawTimer();

    ctx.fillStyle = "red";
    ctx.font = "16px Arial";

    for (let click of clicks) {
        const text = `(${click.x}, ${click.y})`;
        ctx.fillText(text, click.x + 5, click.y - 5); // draw next to the click point
    }

}



function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}
loop();

