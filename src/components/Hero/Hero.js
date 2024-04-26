import React from "react";
import './Hero.css'

const Hero = () => {
    return(
    <div class="bg-black px-4 text-center py-4">
        <div>
            <h1 class="hero-heading display-3 gold-color fw-medium">Estimate Your Precious Metal's Worth</h1>
            <div class="col-lg-6 mx-auto">
                <p class="hero-text lead mb-4 text-white py-2">Unsure about the value of your gold?<br/> Our Gold Rate Calculator provides a quick and accurate estimation of your gold's worth based on its weight, purity, and current market rates. Simply input the weight of your gold, select the carat, and choose your preferred currency to get an instant valuation. Whether you're buying, selling, or just curious, our calculator helps you make informed decisions about your precious metal investments</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <a href="#calculator"><button type="button" class="btn btn-gold btn-hero btn-lg px-4 me-sm-3 fw-bold">Calculate Gold Worth</button></a>
                    <a href='#market'><button type="button" class="btn btn-outline-light btn-hero btn-lg px-4 fw-bold">Check Market</button></a>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Hero