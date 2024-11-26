const canvas = document.getElementById("cw");
const context = canvas.getContext("2d");

let ylevel1=0;
let ylevel2=0;
let ylevel3=0;

let xlevel1=0;
let xlevel2=0;
let xlevel3=0;

let ydashedL=10;
let ydashedP=-10;

let isdraggingL=false;
let isdraggingP=false;
let offsetY_L=0;
let offsetY_P=0;
let deltaL=canv2detuning(ydashedL);
let deltaP=canv2detuning(ydashedP);

let Omega_L=0;
let Omega_P=0;

let gamma21=0.0;
let gamma31=0.0;

let xg21=0;
let yg21=0;
let xg31=0;
let yg31=0;





function updaterho11(Omega_L,Omega_P,gamma21,gamma31,rho11,rho22,y12,y13){
    return (Omega_L*y12+Omega_P*y13+gamma21*rho22+gamma31*(1-rho22-rho11))
}

function updaterho22(Omega_L,gamma21,rho22,y12){
    return (-Omega_L*y12 - gamma21*rho22)
}

function updatex12(Omega_P,gamma21,deltaL,x12,y12,y23){
    return (Omega_P/2*y23-deltaL*y12-gamma21/2*x12)
}

function updatey12(Omega_L,Omega_P,gamma21,deltaL,x12,rho11,rho22,y12,x23){
    return (-Omega_L/2*rho11 + Omega_L/2*rho22 + Omega_P/2*x23 + deltaL*x12 - gamma21/2*y12)
}

function updatex13(Omega_L,deltaP,gamma31,x13,y13,y23){
    return (-Omega_L/2*y23 -deltaP*y13 -gamma31/2*x13)
}

function updatey13(Omega_L,Omega_P,gamma31,deltaP,rho11,rho22,x13,y13,x23){
    return (Omega_L/2*x23 +Omega_P/2*(1-2*rho11-rho22)+deltaP*x13-gamma31/2*y13)
}

function updatex23(Omega_L,Omega_P,gamma21,gamma31,deltaL,deltaP,y12,y13,x23,y23){
    return (-Omega_L/2*y13 -Omega_P/2*y12 +deltaL*y23 -deltaP*y23 -gamma21/2*x23 -gamma31/2*x23)
}

function updatey23(Omega_L,Omega_P,gamma21,gamma31,deltaL,deltaP,x12,x13,x23,y23){
    return (Omega_L/2* x13 - Omega_P/2*x12 - deltaL*x23 + deltaP*x23 - gamma21/2*y23 - gamma31/2*y23)
}



class Atom{
    constructor(){
        this.rho11=0.0
        this.rho22=0.0
        this.rho33=1-this.rho22-this.rho11
        this.x12=0.0
        this.y12=0.0
        this.x13=0.0
        this.y13=0.0
        this.x23=0.0
        this.y23=0.0
        this.dt=0.01
    }
    evolve(){
        const step=()=>{
            this.Omega_L=Omega_L;
            this.Omega_P=Omega_P;
            this.deltaL=deltaL;
            this.deltaP=deltaP;
            this.gamma21=gamma21;
            this.gamma31=gamma31;
            this.rho11+=this.dt*updaterho11(this.Omega_L,this.Omega_P,this.gamma21,this.gamma31,this.rho11,this.rho22,this.y12,this.y13);
            this.rho22+=this.dt*updaterho22(this.Omega_L,this.gamma21,this.rho22,this.y12);
            this.rho33=1-this.rho22-this.rho11;
            this.x12+=this.dt*updatex12(this.Omega_P,this.gamma21,this.deltaL,this.x12,this.y12,this.y23);
            this.y12+=this.dt*updatey12(this.Omega_L,this.Omega_L,this.gamma21,this.deltaL,this.x12,this.rho11,this.rho22,this.y12,this.x23);
            this.x13+=this.dt*updatex13(this.Omega_L,this.deltaP,this.gamma31,this.x13,this.y13,this.y23);
            this.y13+=this.dt*updatey13(this.Omega_L,this.Omega_P,this.gamma31,this.deltaP,this.rho11,this.rho22,this.x13,this.y13,this.x23);
            this.x23+=this.dt*updatex23(this.Omega_L,this.Omega_P,this.gamma21,this.gamma31,this.deltaL,this.deltaP,this.y12,this.y13,this.x23,this.y23);
            this.y23+=this.dt*updatey23(this.Omega_L,this.Omega_P,this.gamma21,this.gamma31,this.deltaL,this.deltaP,this.x12,this.x13,this.x23,this.y23);
            drawLevels(this.rho11, this.rho22, this.rho33);
            setTimeout(step,1)
        }
        step();    
    };
    
};

const atom = new Atom()
atom.evolve()

function drawLevels(rho11, rho22, rho33) {
    //Numero total de boletes
    const numBalls=100
    // Calculate number of balls for each level
    const numBallsLevel1 = Math.round(rho11*numBalls);
    const numBallsLevel2 = Math.round(rho22*numBalls);
    const numBallsLevel3 = Math.round(rho33*numBalls);

    //Mida dels nivells en x
    const levelwidth=canvas.width/4;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Decidim el color
    let colorL=0
    if (ydashedL>0){
        colorL= 'red';
    }
    else{
        colorL = 'blue';
    }
    let colorP=0
    if (ydashedP>0){
        colorP= 'red';
    }
    else{
        colorP = 'blue';
    }


    xlevel1=canvas.width/2-levelwidth/2;
    xlevel2=canvas.width/10;
    xlevel3=canvas.width-canvas.width/10 -levelwidth;

    ylevel1=canvas.height-canvas.height/8;
    ylevel2=canvas.height/3.5;
    ylevel3=canvas.height/10;

    //Primer nivell
    context.fillStyle = "black";
    context.fillRect(xlevel1,ylevel1,levelwidth,5);
    
    //Linia que uneix el nivell 1 i el 2
    context.beginPath();
    context.moveTo(xlevel1 + levelwidth / 2, ylevel1);
    context.lineTo(xlevel2 + levelwidth / 2, ylevel2);
    context.strokeStyle="black";
    context.lineWidth = 4;
    context.stroke();

    //escrivim la OmegaL
    context.fillStyle = 'black'; // Set text color
    context.font = '18px Arial'; // Set font size and family
    context.textAlign = 'center'; // Align text to the center
    const midX12 = xlevel1 + levelwidth/10;
    const midY12 = (ylevel2 + ylevel1)/ 2;
    context.fillText('R_L='+Omega_L.toFixed(2),midX12,midY12)


    //Segon nivell
    context.fillStyle = "black";
    context.fillRect(xlevel2,ylevel2,levelwidth,5);

    //Linia puntejada mobil del segon nivell
    const dashLength=levelwidth/50;
    context.setLineDash([dashLength]); // Defineix la línia puntejada amb la mateixa amplada que el segon nivell
    context.beginPath();
    context.moveTo(xlevel2, ylevel2 - ydashedL);
    context.lineTo(xlevel2 + levelwidth, ylevel2 - ydashedL); // Utilitza levelwidth per ajustar la posició final de la línia
    context.strokeStyle = colorL;
    context.lineWidth = 2;
    context.stroke();
    context.setLineDash([]);

    //Linia que uneix els nivell 2 i el detuningL
    context.beginPath();
    context.moveTo(xlevel2 + levelwidth / 2, ylevel2);
    context.lineTo(xlevel2 + levelwidth / 2, ylevel2 - ydashedL);
    context.strokeStyle=colorL;
    context.lineWidth = 2;
    context.stroke();

    //Posem el velor numeric del detuning
    const midXL = xlevel2 + levelwidth + 50;
    const midYL = ylevel2 - ydashedL/ 2;
    context.fillText('L='+deltaL.toFixed(2), midXL, midYL);

    //Tercer nivell
    context.fillStyle = "black";
    context.fillRect(xlevel3,ylevel3,levelwidth,5)

    //Linia que uneix el nivell 1 i el 3
    context.beginPath();
    context.moveTo(xlevel1 + levelwidth / 2, ylevel1);
    context.lineTo(xlevel3 + levelwidth / 2, ylevel3);
    context.strokeStyle="black";
    context.lineWidth = 4;
    context.stroke();

    const midX13 = xlevel3 + levelwidth/10;
    const midY13 = (ylevel3 + ylevel1)/ 2;
    context.fillText('R_P='+Omega_P.toFixed(2),midX13,midY13)

    //Linia puntejada mobil del tercer nivell
    context.setLineDash([dashLength]); // Defineix la línia puntejada amb la mateixa amplada que el segon nivell
    context.beginPath();
    context.moveTo(xlevel3, ylevel3 - ydashedP);
    context.lineTo(xlevel3 + levelwidth, ylevel3 - ydashedP); // Utilitza levelwidth per ajustar la posició final de la línia
    context.strokeStyle = colorP;
    context.lineWidth = 2;
    context.stroke();
    context.setLineDash([]);

    //Linia que uneix el nivell 3 i el detuningP
    context.beginPath();
    context.moveTo(xlevel3 + levelwidth / 2, ylevel3);
    context.lineTo(xlevel3 + levelwidth / 2, ylevel3 - ydashedP);
    context.strokeStyle=colorP
    context.lineWidth = 2;
    context.stroke();

    //Escrivim el el DeltaP en mig de la linia que uneix la puntajada i el nivell 3
    const midXP = xlevel3 + levelwidth + 50;
    const midYP = ylevel3 - ydashedP/2;
    context.fillText('P='+deltaP.toFixed(2), midXP, midYP);



    
    //Linia del gamma21
    const long=canvas.height/3;
    const theta2 = Math.atan((ylevel1 - ylevel2) / (xlevel1 - xlevel2 ));
    const theta3 = Math.atan((ylevel1 - ylevel3) / (xlevel1 - xlevel3 )) + 90 + 45;

    drawSinusoidalLine(long,theta2,xlevel2,ylevel2,"orange","g21="+gamma21.toFixed(2));

    drawSinusoidalLine(long,theta3,xlevel3,ylevel3,"orange","g31="+gamma31.toFixed(2));





    //BALLS level 1
    drawBalls(numBallsLevel1, "black", xlevel1, ylevel1);

    //BALLS level 2
    drawBalls(numBallsLevel2, "black", xlevel2, ylevel2);

    //BALLS level 3
    drawBalls(numBallsLevel3, "black", xlevel3, ylevel3);



}

function drawSinusoidalLine(long,angle,startX,startY,color,text) {
    // Set the style for the sinusoidal line
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();

    let midX=0;
    let midY=0;
    const step=long/500;
    let points=0;

    // Draw the sinusoidal curve
    for (let x = 0; x <= long; x +=step) {
        const y = 4 * Math.sin(2 * Math.PI * x / 15);
        context.lineTo(startX+Math.cos(angle)*x-Math.sin(angle)*y,startY + Math.cos(angle)*y+Math.sin(angle)*x);

        midX += startX + Math.cos(angle) * x - Math.sin(angle) * y;
        midY += startY + Math.cos(angle) * y + Math.sin(angle) * x;
        points++
    }
    // Stroke the path to draw the curve
     context.stroke();

     midX/=points;
     midY/=points;
     context.fillStyle = "black";
     context.font = '18px Arial';
     context.textAlign = 'center';
     context.fillText(text, midX+canvas.width/30, midY);
     const posx=midX+canvas.width/30
     
     if (text.includes('g21')) {
        xg21 = midX + canvas.width / 30;
        yg21 = midY;
    } else if (text.includes('g31')) {
        xg31 = midX + canvas.width / 30;
        yg31 = midY;
    }
}



function drawBalls(numBalls,color,startX,startY){
    const levelwidth=canvas.width/4;
    const ballRadius = 3;
    const numCols = Math.floor(levelwidth / (2 * ballRadius));

    for (let i = 0; i < numBalls; i++) {
        const row = Math.floor(i / numCols); // Calculate the row index
        const col = i % numCols; // Calculate the column index
    
        const x = startX+col*2*ballRadius+ballRadius/3 //Per tal que no se solapin una saobre la altra
        const y = startY - row*2*ballRadius -ballRadius*2  //Pq no estinguin ''ficades'' a dins del nivell (i en negatiu pq el canvas es al reves que la fisica)


        context.beginPath();
        context.arc(x, y, ballRadius, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
}


function resizeCanvas() {
    // Set the canvas size to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Redraw the levels when the canvas is resized
    drawLevels(atom.rho11, atom.rho22, atom.rho33); // Adjust the values as needed
}

// Call the resizeCanvas function when the window is resized
window.addEventListener('resize', resizeCanvas);


addEventListener("mousemove", (e) => {  
    mouseX = e.clientX;
    mouseY = e.clientY;
  },
  );


canvas.addEventListener('mousedown', function(event) {
    const mouseY = event.clientY;
    const mouseX = event.clientX;
    if (Math.abs(mouseY - (ylevel2 - ydashedL)) <= canvas.height/10 && Math.abs(mouseX<canvas.width/2)) {
        isdraggingL = true;
        offsetY_L = mouseY - (ylevel2 - ydashedL);
    }
    else if (Math.abs(mouseY - (ylevel3 - ydashedP)) <= canvas.height/10 && Math.abs(mouseX>canvas.width/2)) {
        isdraggingP = true;
        offsetY_P = mouseY - (ylevel3 - ydashedP);
    }
});


canvas.addEventListener('mousemove', function(event) {
    if (isdraggingL) {
        //const rect = canvas.getBoundingClientRect();
        //const mouseY = event.clientY - rect.top;
        ydashedL =-mouseY+ylevel2;
    }
    else if (isdraggingP){
        ydashedP=-mouseY+ylevel3;
    }
});

canvas.addEventListener('mouseup', function(event) { 
    isdraggingL = false;
    isdraggingP = false;
    deltaL=canv2detuning(ydashedL)
    deltaP=canv2detuning(ydashedP)
    drawLevels(atom.rho11, atom.rho22, atom.rho33)
});


// Afegir un gestor d'esdeveniments a tot el document per a la deixada del botó del ratolí
document.addEventListener('mouseup', function(event) {
    // Restablir la variable isdraggingL a false quan el botó del ratolí es deixa anar
    isdraggingL = false;
    isdraggingP = false;
});


//Pels Rabi frequencies
// Add event listener for mouse click on canvas
canvas.addEventListener('click', function(event) {
    const levelwidth=canvas.width/4
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Check if the click is within the bounds of the R_L text
    const midX12 = xlevel1 + levelwidth/10;
    const midY12 = (ylevel2 + ylevel1)/ 2;
    if (
        Math.abs(mouseX - midX12) < context.measureText('R_L=0').width / 2 &&
        Math.abs(mouseY - midY12) < 10 // Adjust this value based on the font size and positioning
    ) {
        editRLText(midX12,midY12); // Call function to start editing R_L text
    }

    // Check if the click is within the bounds of the R_P text
    const midX13 = xlevel3 + levelwidth/10;
    const midY13 = (ylevel3 + ylevel1)/ 2;
    if (
        Math.abs(mouseX - midX13) < context.measureText('R_P=0').width / 2 &&
        Math.abs(mouseY - midY13) < 10 // Adjust this value based on the font size and positioning
    ) {
        editRPText(midX13,midY13); // Call function to start editing R_P text
    }

    if (
        Math.abs(mouseX - xg21) < context.measureText('g21=0').width / 2 &&
        Math.abs(mouseY - yg21) < 10 // Adjust this value based on the font size and positioning
    ) {
        editg21Text(); // Call function to start editing g21 text
    }

    if (
        Math.abs(mouseX - xg31) < context.measureText('g31=0').width / 2 &&
        Math.abs(mouseY - yg31) < 10 // Adjust this value based on the font size and positioning
    ) {
        editg31Text(); // Call function to start editing g21 text
    }

});

// Function to start editing R_L text
function editRLText(x,y) {
    let newValue = parseFloat(prompt("Enter new value for R_L:"));
    if (!isNaN(newValue)) {
        // Update R_L value and redraw canvas
        Omega_L = newValue;
        drawLevels(atom.rho11, atom.rho22, atom.rho33);
        context.fillText('R_L='+Omega_L.toFixed(2), x, y);
    }
}

// Function to start editing R_P text
function editRPText(x,y) {
    let newValue = parseFloat(prompt("Enter new value for R_P:"));
    if (!isNaN(newValue)) {
        // Update R_P value and redraw canvas
        Omega_P = newValue;
        drawLevels(atom.rho11, atom.rho22, atom.rho33);
        context.fillText('R_P='+Omega_P.toFixed(2), x, y);
    }
}

function editg21Text() {
    let newValue = parseFloat(prompt("Enter new value for gamma21:"));
    if (!isNaN(newValue)) {
        // Update R_L value and redraw canvas
        gamma21 = newValue;
        drawLevels(atom.rho11, atom.rho22, atom.rho33);
        context.fillText('g21='+gamma21.toFixed(2), xg21, yg21);
    }
}

function editg31Text() {
    let newValue = parseFloat(prompt("Enter new value for gamma31:"));
    if (!isNaN(newValue)) {
        // Update R_L value and redraw canvas
        gamma31 = newValue;
        drawLevels(atom.rho11, atom.rho22, atom.rho33);
        context.fillText('g31='+gamma21.toFixed(2), xg31, yg31);
    }
}


function canv2detuning(ydashed){
    return 1.5*ydashed/canvas.height;
}


// Initial call to resizeCanvas to set the initial canvas size
resizeCanvas();
