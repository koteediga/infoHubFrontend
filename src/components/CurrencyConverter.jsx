import React, { useState } from 'react';
import axios from 'axios';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('INR');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [result, setResult] = useState(null);

  async function convert(e) {
    e?.preventDefault();
    setErr('');
    setLoading(true);

    try {
      // ✅ pick API base URL from environment or fallback for local testing
      const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

      const query = to
        ? `${baseURL}/api/currency?amount=${amount}&from=${from}&to=${to}`
        : `${baseURL}/api/currency?amount=${amount}&from=${from}`;

      const res = await axios.get(query);
      setResult(res.data);
    } catch (err) {
      setErr(err?.response?.data?.error || err.message || 'Failed to convert');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <form onSubmit={convert}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: 120 }}
        />
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{ width: 80 }}
        />
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Target (optional)"
          style={{ width: 120 }}
        />
        <button type="submit">Convert</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {err && <div className="error">{err}</div>}

      {result && (
        <div style={{ marginTop: 12 }}>
          <p>{result.amount} {result.from}</p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(result.results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
