# 3-level atom

## Disclamer
This is a personal project, It could contain mistakes or incongruencies (especially the second part). Don't use for academic results or research

## Context
This project is based on a physics assignment from my 4th-year studies, where we were tasked with graphically representing the stationary states of a 3-level atom. While some colleagues solved the equations for the stationary states using MATLAB (derivatives set to zero), others simulated the temporal evolution to observe the system reaching equilibrium. I approached it differently by solving the equations symbolically using SymPy in Python.

Later, I decided to enhance the project by simulating the time evolution, which turned out to be a fun challenge. Taking it a step further, I made the simulation interactive. By running the accompanying HTML file, users can interact with the system by adjusting parameters such as Rabi frequencies (omega), decay rates (gamma), and detuning (delta) in real-time. Setting a Rabi frequency to zero reverts the system to a 2-level atom.

The small black dots on the graph represent the probability of the electron being in a particular state of the atom.
## Theoretical background
The evolution equations for a 3-level atom in the ineraction picture are the following:

$\dot{\rho_{11}}=  \Omega_{L} y_{12} + \Omega_{P} y_{13} + \gamma_{21} \rho_{22} - \gamma_{31} \rho_{11} - \gamma_{31} \rho_{22} + \gamma_{31} $

$\dot{\rho_{22}}=  - \Omega_{L} y_{12} - \gamma_{21} \rho_{22} $

$\dot{\rho_{33}}=  -\dot{\rho_{22}} -\dot{\rho_{11}} $

$\dot{x_{12}}=  \frac{\Omega_{P} y_{23}}{2} - \Delta_{L} y_{12} - 0.5 \gamma_{21} x_{12} $  

$\dot{y_{12}}=  - \frac{\Omega_{L} \rho_{11}}{2} + \frac{\Omega_{L} \rho_{22}}{2} + \frac{\Omega_{P} x_{23}}{2} + \Delta_{L} x_{12} - 0.5 \gamma_{21} y_{12} $  

$\dot{x_{13}}=  - \frac{\Omega_{L} y_{23}}{2} - \Delta_{P} y_{13} - 0.5 \gamma_{31} x_{13} $  

$\dot{y_{13}}=  \frac{\Omega_{L} x_{23}}{2} + \frac{\Omega_{P} \left(- \rho_{11} - \rho_{22} + 1\right)}{2} - \frac{\Omega_{P} \rho_{11}}{2} + \Delta_{P} x_{13} - 0.5 \gamma_{31} y_{13} $  

$\dot{x_{23}}=  - \frac{\Omega_{L} y_{13}}{2} - \frac{\Omega_{P} y_{12}}{2} + \Delta_{L} y_{23} - \Delta_{P} y_{23} - 0.5 \gamma_{21} x_{23} - 0.5 \gamma_{31} x_{23} $  

$\dot{y_{23}}=  \frac{\Omega_{L} x_{13}}{2} - \frac{\Omega_{P} x_{12}}{2} - \Delta_{L} x_{23} + \Delta_{P} x_{23} - 0.5 \gamma_{21} y_{23} - 0.5 \gamma_{31} y_{23} $ 


## Run
Firs clone repository to your local folder:
```bash
git clone https://github.com/marcsanta02/3-level-atom.git
cd 3-level-atom
```

 This project simulation has two main purposes.
## 1. Obtains the stationary states analytically using sympy
This part corresponds to the jupyter notebook code. As said, it makes use of the sympy library to obtain the equations describing the populations of the staionary states. Then it uses this equations to visually plot the absortion and emission of the atom.

## 2. Simulates the temporal evolution using javascript
This part is more interactive, by running the html file one can vsualize all sorts of phenomena, such as Rabi oscillations. It allows the user to play with the values


