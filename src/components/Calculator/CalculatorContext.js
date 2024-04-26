// CalculatorContext.jsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const CalculatorContext = createContext();

export const useCalculatorContext = () => useContext(CalculatorContext);

export const CalculatorProvider = ({ children }) => {

  const baseURL = 'https://goldratecalculator-backend.onrender.com';
  const [goldRate, setGoldRate] = useState();
  const [weight, setWeight] = useState();
  const [currency, setCurrency] = useState('');
  const [carat, setCarat] = useState('');
  const [unit, setUnit] = useState('');
  const [calculateClicked, setCalculateClicked] = useState(false);
  const [formError, setFormError] = useState(false);
  const [showResult, setShowResult] = useState(false);

  async function calculateGoldCost(weight, carat, currency, unit) {
    try {
      setGoldRate('load');
      const response = await axios.get(`${baseURL}/gold-rate/${currency}`);
      const goldData = response.data;

      // Determine the price based on carat
      let pricePerGram;
      switch (carat) {
        case '24k':
          pricePerGram = goldData.price_gram_24k;
          break;
        case '22k':
          pricePerGram = goldData.price_gram_22k;
          break;
        case '21k':
          pricePerGram = goldData.price_gram_21k;
          break;
        case '20k':
          pricePerGram = goldData.price_gram_20k;
          break;
        case '18k':
          pricePerGram = goldData.price_gram_18k;
          break;
        case '16k':
          pricePerGram = goldData.price_gram_16k;
          break;
        case '14k':
          pricePerGram = goldData.price_gram_14k;
          break;
        case '10k':
          pricePerGram = goldData.price_gram_10k;
          break;
        default:
          throw new Error('Invalid carat value');
      }

      // Calculate the weight in grams
      let grams;
      if (unit === 'gram') {
        grams = weight;
      } else if (unit === 'sovereign') {
        grams = weight * 8; // 1 pavan = 8 grams
      } else {
        throw new Error('Invalid unit value');
      }

      // Calculate the cost
      const cost = grams * pricePerGram;

      setGoldRate(cost);
    } catch (error) {
      // console.error('Error fetching gold rate:', error);
      setGoldRate('Error');
    }
  }  

  function getLatestGoldRate(){
    if (!weight || !unit || !carat || !currency) {
      setFormError(true);
      setShowResult(false);
    } else {
        setFormError(false);
        setShowResult(true);
        calculateGoldCost(weight, carat, currency, unit);
      }
    setCalculateClicked(true); // Set calculateClicked to true when Calculate button is clicked
  }
  
  // Function to reset calculateClicked state when any input field is changed
  function handleInputChange() {
    setCalculateClicked(false);
  }
  
  //SetWeight on change
  const handleWeightChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setWeight(0);
    } else if (validateInput(inputValue)) {
      setWeight(parseFloat(inputValue));
    }
  };

  function validateInput(inputValue) {
    // Check if the input is a valid number and greater than or equal to 0
    if (!isNaN(inputValue) && parseFloat(inputValue) >= 0) {
      // Prevent the user from entering the letter 'e'
      if (!inputValue.includes('e')) {
        return true;
      }
    }
    return false;
  }
  

  return (
    <CalculatorContext.Provider value={{ goldRate, getLatestGoldRate, weight, setWeight, currency, setCurrency, carat, setCarat, unit, setUnit, calculateClicked, handleInputChange, formError, showResult, handleWeightChange }}>
      {children}
    </CalculatorContext.Provider>
  );
};
