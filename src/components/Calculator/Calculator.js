import React from "react";
import './Calculator.css';
import { useCalculatorContext } from './CalculatorContext';

const Calculator = () => {
    const { goldRate, getLatestGoldRate, weight, currency, setCurrency, carat, setCarat, unit, setUnit, calculateClicked, handleInputChange, showResult, formError, handleWeightChange } = useCalculatorContext();

    function calculate() {
        getLatestGoldRate();
    }

    return (
        <div className="container-fluid p-5 bg-black" id="calculator"> 
            <h1 className="hero-heading display-4 fw-medium text-center gold-color">Gold Rate Calculator</h1>
            <div className="row">
                <div className={`col-md-6 ${showResult && calculateClicked ? 'offset-md-1' : 'offset-md-3'} py-4`}>
                    <form id="goldCalculator">
                        <div className="">
                            <div className="row py-2">
                                <div className="col-12 col-lg-6">
                                    <label className="form-label text-light fs-5 fw-medium">Weight</label>
                                    <input type="number" min="0" className="form-control rounded-4 bg-black text-light" id="weight" placeholder="Enter weight" value={weight} onChange={(e) => {handleWeightChange(e); handleInputChange();}} required/>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <label className="form-label text-light fs-5 fw-medium">Unit</label>
                                    <select className="form-select rounded-4 bg-black text-light" value={unit} onChange={(e) => {setUnit(e.target.value); handleInputChange();}} required>
                                        <option value="" disabled selected>Select Your Unit</option>
                                        <option value='gram'>Gram</option>
                                        <option value='sovereign'>Sovereign </option>
                                    </select>
                                    {formError && !unit && <p className="text-danger">Please select a unit</p>}
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-12 col-lg-6">
                                    <label className="form-label text-light fs-5 fw-medium">Carat</label>
                                    <select className="form-select rounded-4 bg-black text-light" aria-label="Default select example" value={carat} onChange={(e) => {setCarat(e.target.value); handleInputChange();}} required>
                                        <option value="" disabled selected>Select Your Carat</option>
                                        <option value='24k'>24</option>
                                        <option value='22k'>22</option>
                                        <option value='21k'>21</option>
                                        <option value='20k'>20</option>
                                        <option value='18k'>18</option>
                                        <option value='16k'>16</option>
                                        <option value='14k'>14</option>
                                        <option value='10k'>10</option>
                                    </select>
                                    {formError && !carat && <p className="text-danger">Please select a carat</p>}
                                </div>
                                <div className="col-12 col-lg-6">
                                    <label className="form-label text-light fs-5 fw-medium">Currency</label>
                                    <select className="form-select rounded-4 bg-black text-light" aria-label="Default select example" value={currency} onChange={(e) => {setCurrency(e.target.value); handleInputChange();}} required>
                                        <option value="" disabled selected>Select Your Preferred Currency</option>
                                        <option value='INR'>INR</option>
                                        <option value='USD'>USD</option>
                                        <option value='EUR'>EUR</option>
                                        <option value='JPY'>JPY</option>
                                        <option value='AED'>AED</option>
                                    </select>
                                    {formError && !currency && <p className="text-danger">Please select a currency</p>}
                                </div>
                            </div>
                            <button type="button" className="btn btn-lg btn-gold btn-hero fw-bold mt-3 mx-auto" onClick={calculate}>Calculate</button>
                        </div>               
                    </form>
                </div>
                {goldRate!=='load' ?
                showResult && calculateClicked  && (
                        <div className="col-md-3 fs-5 alert alert-info text-capitalize text-center my-auto offset-md-1" role="alert">
                            The calculated gold rate for <strong>{weight} {unit}</strong> of <strong>{carat} carat</strong> gold is <strong>{goldRate} {currency}</strong>.
                        </div>
                ):
                <div class="col-md-3 my-auto offset-md-1 spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                }
            </div>            
        </div>
    )
}

export default Calculator;
