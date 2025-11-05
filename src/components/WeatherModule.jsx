import React, { useState } from 'react';
import axios from 'axios';

export default function WeatherModule() {
  const [city, setCity] = useState('New York');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [data, setData] = useState(null);

  async function fetchWeather(e) {
    e?.preventDefault();
    setErr('');
    setLoading(true);
    try {
   const baseURL = process.env.REACT_APP_API_BASE_URL || '';

const res = await axios.get(`${baseURL}/api/weather?city=${encodeURIComponent(city)}`);

      setData(res.data);
    } catch (error) {
      setErr(error?.response?.data?.error || error.message || 'Failed to fetch');
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <form onSubmit={fetchWeather}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {err && <div className="error">{err}</div>}

      {data && (
        <div style={{ marginTop: 12 }}>
          <h3>
            {data.city}
            {data.region ? `, ${data.region}` : ''}{' '}
            {data.country ? `(${data.country})` : ''}
          </h3>
          <p>
            {data.weatherDesc} • {data.temp_C}°C ({data.temp_F}°F)
          </p>
          <p>
            Feels like: {data.feelsLikeC ?? 'N/A'}°C • Humidity: {data.humidity}%
          </p>
        </div>
      )}
    </div>
  );
}
