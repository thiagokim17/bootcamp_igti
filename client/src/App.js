import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'api' });

export default function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get('/transaction?period=2019-07');

      console.log(data)
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <div className='container'>
      <h1 className='center'>Desafio Final do Bootcamp Full Stack</h1>
      {
        transactions.map(transaction => {
          return <p key={transaction._id}>{transaction.description}</p>
        })
      }
    </div>
  );

}
