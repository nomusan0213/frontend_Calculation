import React, { useState, useEffect } from 'react';
import './App.css';

export const App = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (num1 !== '' && num2 !== '' && !isNaN(num1) && !isNaN(num2) && operation) {
      const performCalculation = async () => {
        const encodedOperation = encodeURIComponent(operation);
        const url = `https://backend-calculation.onrender.com/${encodedOperation}/?a=${num1}&b=${num2}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setResult(data.result);
        } catch (error) {
          console.error("Error fetching the calculation result:", error);
        }
      };
      performCalculation();
    }
  }, [num1, num2, operation]);

  return (
    <div className="App">
      <h1>四則演算</h1>
      <div className="calculator">
        <input
          type="number"
          value={num1}
          onChange={e => setNum1(e.target.value)}
          placeholder="数字を入力"
        />
        <select value={operation} onChange={e => setOperation(e.target.value)}>
          <option value="add">+</option>
          <option value="subtract">-</option>
          <option value="multiply">×</option>
          <option value="divide">÷</option>
        </select>
        <input
          type="number"
          value={num2}
          onChange={e => setNum2(e.target.value)}
          placeholder="数字を入力"
        />
        <div>=</div>
        <div>{result}</div>
      </div>
    </div>
  );
}

export default App;
