import React, { useState, useEffect } from 'react';
import PieChart from './components/PieChart';
import './App.css';

const App = () => {
  const [loanData, setLoanData] = useState({
    totalHomeValue: 150000,
    downPayment: 50000,
    loanAmount: 0,
    loanTerm: 30,
    interestRate: 5,
    monthlyPayment: 0,
    totalInterest: 0,
  });

  // Calculate loan details
  useEffect(() => {
    // Calculate loan amount
    const calculatedLoanAmount = loanData.totalHomeValue - loanData.downPayment;

    const totalLoanMonths = loanData.loanTerm * 12;
    const interestPerMonth = loanData.interestRate / 100 / 12;
    const monthlyPayment =
      (calculatedLoanAmount *
        interestPerMonth *
        Math.pow(1 + interestPerMonth, totalLoanMonths)) /
      (Math.pow(1 + interestPerMonth, totalLoanMonths) - 1);
    const totalInterestGenerated =
      monthlyPayment * totalLoanMonths - calculatedLoanAmount;

    setLoanData((prev) => ({
      ...prev,
      loanAmount: calculatedLoanAmount.toFixed(2),
      monthlyPayment: isFinite(monthlyPayment) ? monthlyPayment.toFixed(2) : 0,
      totalInterest: isFinite(totalInterestGenerated) ? totalInterestGenerated.toFixed(2) : 0,
    }));
  }, [
    loanData.totalHomeValue,
    loanData.downPayment,
    loanData.loanTerm,
    loanData.interestRate,
  ]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Bank of React
        </h1>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Loan Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Home Value ($)
              </label>
              <p className="mt-2 text-xl text-red-600">
                ${loanData.totalHomeValue.toLocaleString()}
              </p>
              <input
                type="range"
                name="totalHomeValue"
                min="50000"
                max="2000000"
                step="5000"
                value={loanData.totalHomeValue}
                onChange={handleInputChange}
                className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
              <p className="mt-2 text-sm text-gray-600">
                $50,000
              </p>
              <p className="mt-2 text-sm text-gray-600">
                $200,000
              </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Down Payment ($)
              </label>
              <p className="mt-2 text-xl text-red-600">
                ${loanData.downPayment.toLocaleString()}
              </p>
              <input
                type="range"
                name="downPayment"
                min="0"
                max={loanData.totalHomeValue}
                step="1000"
                value={loanData.downPayment}
                onChange={handleInputChange}
                className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
              <p className="mt-2 text-sm text-gray-600">
                $0
              </p>
              <p className="mt-2 text-sm text-gray-600">
                {loanData.totalHomeValue}
              </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loan Amount ($)
              </label>
              <p className="mt-2 text-xl font-medium text-red-500">
                ${parseFloat(loanData.loanAmount).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Interest Rate (%)
              </label>
              <p className="mt-2 text-xl text-red-600">
                {loanData.interestRate}%
              </p>
              <input
                type="range"
                name="interestRate"
                min="0.1"
                max="15"
                step="0.1"
                value={loanData.interestRate}
                onChange={handleInputChange}
                className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
              <p className="mt-2 text-sm text-gray-600">
                1 %
              </p>
              <p className="mt-2 text-sm text-gray-600">
                15 %
              </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loan Term (Years)
              </label>
              <p className="mt-2 text-xl text-red-600">
                {loanData.loanTerm} years
              </p>
              <input
                type="range"
                name="loanTerm"
                min="1"
                max="30"
                step="1"
                value={loanData.loanTerm}
                onChange={handleInputChange}
                className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
              <p className="mt-2 text-sm text-gray-600">
                1 year
              </p>
              <p className="mt-2 text-sm text-gray-600">
                30 years
              </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary and Chart */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-100">
          {/* Summary Card */}
          <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <div className="space-y-2 text-center">
              <p className="text-gray-600">
                Monthly Payment:{' '}
                <span className="font-medium">${loanData.monthlyPayment}</span>
              </p>
            </div>

            <div className="bg-white rounded-lg place-content-center text-center flex">
            <PieChart data={loanData} />
            </div>
          </div>

          {/* Pie Chart */}
          
        </div>
      </div>
    </div>
  );
};

export default App;
