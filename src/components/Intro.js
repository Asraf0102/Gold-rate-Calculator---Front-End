import React, { useState, useEffect } from "react";
import NavBar from './Navbar/NavBar.js';
import Hero from './Hero/Hero.js';
import Calculator from './Calculator/Calculator.js';
import HistoricPrice from "./HistoricPrice/HistoricPrice.js";
import './Intro.css';
import { CalculatorProvider } from "./Calculator/CalculatorContext.js";

const Intro = () => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [ intitialAdjustment, setIntitialAdjustment ] = useState(400);


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setIntitialAdjustment(0);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function StarBody() {
        useEffect(() => {
            const createStars = () => {
                // Remove existing stars
                const existingStars = document.querySelectorAll('.star');
                const starNumber = window.innerWidth / 8;
                existingStars.forEach(star => star.remove());

                // Create new stars
                for (let i = 0; i < starNumber; i++) {
                    const star = document.createElement('div');
                    star.classList.add('star');
                    star.style.top = Math.random() * (document.body.scrollHeight + intitialAdjustment) + 'px';
                    star.style.left = Math.random() * (document.body.scrollWidth - 10)+ 'px';
                    const size = Math.random() * 2;
                    star.style.width = size + 'px';
                    star.style.height = size + 'px';
                    document.body.appendChild(star);
                }
            };

            createStars(); // Initial creation

            const resizeHandler = () => createStars(); // Handler for resize event
            window.addEventListener('resize', resizeHandler);

            return () => {
                window.removeEventListener('resize', resizeHandler);
            };
        }, [screenWidth]); // No dependencies to ensure it runs only once

        return null; // Since this is purely for side effect, it doesn't render anything
    }

    setInterval(StarBody(), 1500); // Calling StarBody function

    return (
        <CalculatorProvider>
            <div id="stars" className="stars-body">
                <NavBar />
                <Hero />
                <HistoricPrice/>
                <Calculator />
            </div>
        </CalculatorProvider>
    );
};

export default Intro;
