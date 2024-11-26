# 3-level atom
## Context
This project is based on a physics delivery of my 4th year where we had to graphically represent the stationary states of a 3-level atom. Some of my colleagues solved the equations to obtain the stationary states (derivatives to 0) using matlab while others simulated the evolution and waited for it to reach equilibrium. In my case, I solved them but using sympy.
Later on, once I had enough time, I also wanted to simulate this temporal evolution because I thought it could be fun. But, I went a step further and made it interactive. By executing the html file one can play with the atom by changing (on-click) the rabi frequencies (omega), decay rates (gamma) and detunings (delta). 
By setting one rabi frequencie to 0 we also go back to the 2-level atom. The small blck dots refer to the probability of the electron being at that level.
## Theoretical background
The evolution equations for a 3-level atom in the ineraction picture are the following:
$$\dot{\rho_{11}}=  \Omega_{L} y_{12} + \Omega_{P} y_{13} + \gamma_{21} \rho_{22} - \gamma_{31} \rho_{11} - \gamma_{31} \rho_{22} + \gamma_{31} $$
 $$ \dot{\rho_{22}}=  - \Omega_{L} y_{12} - \gamma_{21} \rho_{22} $$
 $$ \dot{\rho_{33}}=  -\dot{\rho_{22}} -\dot{\rho_{11}} $$
 $$ \dot{x_{12}}=  \frac{\Omega_{P} y_{23}}{2} - \Delta_{L} y_{12} - 0.5 \gamma_{21} x_{12} $$  
 $$ \dot{y_{12}}=  - \frac{\Omega_{L} \rho_{11}}{2} + \frac{\Omega_{L} \rho_{22}}{2} + \frac{\Omega_{P} x_{23}}{2} + \Delta_{L} x_{12} - 0.5 \gamma_{21} y_{12} $$  
 $$ \dot{x_{13}}=  - \frac{\Omega_{L} y_{23}}{2} - \Delta_{P} y_{13} - 0.5 \gamma_{31} x_{13} $$  
 $$ \dot{y_{13}}=  \frac{\Omega_{L} x_{23}}{2} + \frac{\Omega_{P} \left(- \rho_{11} - \rho_{22} + 1\right)}{2} - \frac{\Omega_{P} \rho_{11}}{2} + \Delta_{P} x_{13} - 0.5 \gamma_{31} y_{13} $$  
 $$ \dot{x_{23}}=  - \frac{\Omega_{L} y_{13}}{2} - \frac{\Omega_{P} y_{12}}{2} + \Delta_{L} y_{23} - \Delta_{P} y_{23} - 0.5 \gamma_{21} x_{23} - 0.5 \gamma_{31} x_{23} $$  
 $$ \dot{y_{23}}=  \frac{\Omega_{L} x_{13}}{2} - \frac{\Omega_{P} x_{12}}{2} - \Delta_{L} x_{23} + \Delta_{P} x_{23} - 0.5 \gamma_{21} y_{23} - 0.5 \gamma_{31} y_{23} $$ 

 This small project simulation has two main purposes.
 ## 1. Obtains the stationary states analytically using sympy


 ## 2. Simulates the temporal evolution using javascript