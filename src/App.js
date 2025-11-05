import React, { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';

export default function App() {
  const [tab, setTab] = useState('Weather');
  return (
    <div className="container">
      <h1>InfoHub</h1>
      <p style={{color:'#666'}}>Weather • Currency (INR → USD/EUR) • Motivational Quotes</p>

      <nav>
        {['Weather','Currency','Quote'].map(t => (
          <button
            key={t}
            className={`tab ${tab === t ? 'active':''}`}
            onClick={() => setTab(t)}
          >{t}</button>
        ))}
      </nav>

      <main>
        {tab === 'Weather' && <WeatherModule />}
        {tab === 'Currency' && <CurrencyConverter />}
        {tab === 'Quote' && <QuoteGenerator />}
      </main>
    </div>
  );
}
