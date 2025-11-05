import React, { useState } from 'react';
import axios from 'axios';

export default function QuoteGenerator(){
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);
  const [err, setErr] = useState('');

  async function getQuote(){
    setErr(''); setLoading(true);
    try {
      const res = await axios.get('/api/quote');
      setQuote(res.data);
    } catch (err) {
      setErr(err?.response?.data?.error || err.message || 'Failed to fetch quote');
      setQuote(null);
    } finally { setLoading(false); }
  }

  return (
    <div className="card">
      <button onClick={getQuote}>Get Motivational Quote</button>
      { loading && <p className="loading">Loading...</p> }
      { err && <div className="error">{err}</div> }
      { quote && (
        <blockquote style={{marginTop:12}}>
          {quote.quote}
          <footer style={{marginTop:8, fontSize:13}}>— {quote.author}</footer>
        </blockquote>
      )}
    </div>
  );
}
