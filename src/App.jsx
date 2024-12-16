import React, { useState, useEffect } from "react";

// Simulated transaction data for three months
const simulatedData = [
  {
    customerId: 1,
    name: "John Doe",
    transactions: [
      { date: "2024-10-15", amount: 120 },
      { date: "2024-11-10", amount: 75 },
      { date: "2024-12-05", amount: 150 },
    ],
  },
  {
    customerId: 2,
    name: "Jane Smith",
    transactions: [
      { date: "2024-10-20", amount: 95 },
      { date: "2024-11-18", amount: 55 },
      { date: "2024-12-15", amount: 130 },
    ],
  },
  {
    customerId: 3,
    name: "Mike Johnson",
    transactions: [
      { date: "2024-10-25", amount: 105 },
      { date: "2024-11-12", amount: 80 },
      { date: "2024-12-20", amount: 99 },
    ],
  },
];

const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2; // 2 points for every dollar spent over $100
    amount = 100; // making remain amount as 100
  }
  if (amount > 50) {
    points += (amount - 50); // 1 point for every dollar between $50 and $100
  }
  return points;
};

const RewardsProgram = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState('');
  const [customerDetail, setCustomerDetail] = useState([]);

  useEffect(() => {
    // Simulating an asynchronous API call to fetch data
    setTimeout(() => {
      setData(simulatedData);
      setLoading(false);
    }, 1000); // Simulated delay of 1 second
  }, []);

  const getMonthlyPoints = (transactions) => {
    const monthlyPoints = {
      October: 0,
      November: 0,
      December: 0,
    };

    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "long",
      });
      const points = calculatePoints(transaction.amount);
      monthlyPoints[month] += points;
    });

    return monthlyPoints;
  };

  const getTotalPoints = (transactions) => {
    return transactions.reduce((total, transaction) => {
      return total + calculatePoints(transaction.amount);
    }, 0);
  };

  const handleClick = () => {
    const res = (data.filter(cus => cus.customerId == customer));
    console.log(res);
    setCustomerDetail(res);
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>Customer Rewards</h1>
      <input type="text" 
      placeholder="Enter Customer id" 
      value={customer} 
      onChange={(e)=>setCustomer(e.target.value)}></input>
      <br /><br />
      <button onClick={handleClick}>GET POINTS</button>
      {customerDetail.map((customer) => {
        const monthlyPoints = getMonthlyPoints(customer.transactions);
        const totalPoints = getTotalPoints(customer.transactions);

        return (
          <div key={customer.customerId}>
            <h2>{customer.name}</h2>
            <div>
              <h3>Monthly Points:</h3>
              <ul>
                <li>October: {monthlyPoints.October} points</li>
                <li>November: {monthlyPoints.November} points</li>
                <li>December: {monthlyPoints.December} points</li>
              </ul>
            </div>
            <div>
              <h3>Total Points:</h3>
              <p>{totalPoints} points</p>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default RewardsProgram;