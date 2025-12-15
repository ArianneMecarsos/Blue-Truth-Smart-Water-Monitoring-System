import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 
import '../styles/history.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// --- MOCK DATA ---
const ALL_DATA = {
  today: {
    date: 'Dec 15, 2025',
    summary: {
      temp: { val: '26.80°C', min: '25.80', max: '27.90', status: 'Stable' },
      ph: { val: '7.23', min: '6.80', max: '7.60', status: '↘ Decreasing' },
      tox: { val: '1.51 mg/L', min: '0.80', max: '2.49', status: '↗ Increasing' },
      metal: { val: '0.14 mg/L', min: '0.07', max: '0.17', status: '↘ Decreasing' }
    },
    chartData: {
      temp: [27.9, 27.4, 27.1, 26.7, 25.8, 25.9],
      ph: [7.6, 7.6, 7.2, 7.0, 7.2, 6.8],
      tox: [0.9, 0.91, 2.12, 2.49, 1.87, 0.8],
      metal: [0.152, 0.156, 0.158, 0.138, 0.074, 0.167]
    },
    tableRows: [
      { time: '00:00', temp: '27.9°C', ph: '7.6', tox: '0.9 mg/L', metal: '0.152 mg/L' },
      { time: '04:00', temp: '27.4°C', ph: '7.6', tox: '0.91 mg/L', metal: '0.156 mg/L' },
      { time: '08:00', temp: '27.1°C', ph: '7.2', tox: '2.12 mg/L', metal: '0.158 mg/L' },
      { time: '12:00', temp: '26.7°C', ph: '7.0', tox: '2.49 mg/L', metal: '0.138 mg/L' }, // High Toxicity here
      { time: '16:00', temp: '25.8°C', ph: '7.2', tox: '1.87 mg/L', metal: '0.074 mg/L' },
      { time: '20:00', temp: '25.9°C', ph: '6.8', tox: '0.8 mg/L', metal: '0.167 mg/L' },
    ]
  },
  yesterday: {
    date: 'Dec 14, 2025',
    summary: {
      temp: { val: '28.10°C', min: '27.50', max: '29.20', status: 'Stable' },
      ph: { val: '7.50', min: '7.20', max: '7.80', status: 'Stable' },
      tox: { val: '0.50 mg/L', min: '0.40', max: '0.60', status: 'Stable' },
      metal: { val: '0.11 mg/L', min: '0.10', max: '0.12', status: 'Stable' }
    },
    chartData: {
      temp: [28.0, 28.5, 29.2, 28.8, 27.5, 27.8],
      ph: [7.2, 7.3, 7.5, 7.5, 7.8, 7.6],
      tox: [0.4, 0.45, 0.5, 0.55, 0.6, 0.58],
      metal: [0.10, 0.11, 0.12, 0.11, 0.10, 0.11]
    },
    tableRows: [
      { time: '00:00', temp: '28.0°C', ph: '7.2', tox: '0.4 mg/L', metal: '0.10 mg/L' },
      { time: '04:00', temp: '28.5°C', ph: '7.3', tox: '0.45 mg/L', metal: '0.11 mg/L' },
      { time: '08:00', temp: '29.2°C', ph: '7.5', tox: '0.5 mg/L', metal: '0.12 mg/L' },
      { time: '12:00', temp: '28.8°C', ph: '7.5', tox: '0.55 mg/L', metal: '0.11 mg/L' },
      { time: '16:00', temp: '27.5°C', ph: '7.8', tox: '0.6 mg/L', metal: '0.10 mg/L' },
      { time: '20:00', temp: '27.8°C', ph: '7.6', tox: '0.58 mg/L', metal: '0.11 mg/L' },
    ]
  },
  twoDaysAgo: {
    date: 'Dec 13, 2025',
    summary: {
      temp: { val: '26.50°C', min: '25.00', max: '27.00', status: 'Stable' },
      ph: { val: '6.90', min: '6.50', max: '7.10', status: 'Low' },
      tox: { val: '0.80 mg/L', min: '0.70', max: '0.90', status: 'Stable' },
      metal: { val: '0.09 mg/L', min: '0.08', max: '0.10', status: 'Stable' }
    },
    chartData: {
      temp: [25.0, 25.5, 26.0, 26.5, 27.0, 26.8],
      ph: [6.5, 6.6, 6.8, 6.9, 7.1, 7.0],
      tox: [0.7, 0.75, 0.8, 0.85, 0.9, 0.88],
      metal: [0.08, 0.09, 0.10, 0.09, 0.08, 0.09]
    },
    tableRows: [
      { time: '00:00', temp: '25.0°C', ph: '6.5', tox: '0.7 mg/L', metal: '0.08 mg/L' },
      { time: '04:00', temp: '25.5°C', ph: '6.6', tox: '0.75 mg/L', metal: '0.09 mg/L' },
      { time: '08:00', temp: '26.0°C', ph: '6.8', tox: '0.8 mg/L', metal: '0.10 mg/L' },
      { time: '12:00', temp: '26.5°C', ph: '6.9', tox: '0.85 mg/L', metal: '0.09 mg/L' },
      { time: '16:00', temp: '27.0°C', ph: '7.1', tox: '0.9 mg/L', metal: '0.08 mg/L' },
      { time: '20:00', temp: '26.8°C', ph: '7.0', tox: '0.88 mg/L', metal: '0.09 mg/L' },
    ]
  }
};

export default function History() {
  const user = "Admin";
  const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

  const [activeTab, setActiveTab] = useState('today');
  const currentData = ALL_DATA[activeTab];

  // --- NEW LOGIC: DETERMINE STATUS ---
  // This parses the string values (e.g., "7.2" or "0.9 mg/L") and checks thresholds
  const determineStatus = (row) => {
    // parseFloat stops reading at the first non-number, so "2.49 mg/L" becomes 2.49
    const ph = parseFloat(row.ph);
    const tox = parseFloat(row.tox);
    const metal = parseFloat(row.metal);

    // THRESHOLDS (Adjust these based on your actual safety requirements)
    const isPhBad = ph < 6.5 || ph > 8.5; 
    const isToxHigh = tox > 1.0; 
    const isMetalHigh = metal > 0.15;

    if (isPhBad || isToxHigh || isMetalHigh) {
      return { text: "WARNING", css: "warning-badge" };
    }
    return { text: "NORMAL", css: "success-badge" };
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        position: 'bottom',
        labels: { usePointStyle: true, font: { family: "'Inter', sans-serif", size: 12 } }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)', 
        titleFont: { family: "'Inter', sans-serif" },
        bodyFont: { family: "'Inter', sans-serif" },
        padding: 10,
        cornerRadius: 4,
      }
    },
    scales: {
      y: { 
        grid: { borderDash: [4, 4], color: '#f3f4f6' },
        ticks: { font: { family: "'Inter', sans-serif" }, color: '#6b7280' }
      },
      x: { 
        grid: { display: false },
        ticks: { font: { family: "'Inter', sans-serif" }, color: '#6b7280' }
      },
    },
    elements: { 
      line: { tension: 0.4 }, 
      point: { radius: 3, hoverRadius: 6 } 
    },
  };

  const charts = [
    {
      title: `Temperature Trend - ${currentData.date}`,
      data: {
        labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: currentData.chartData.temp,
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          fill: true,
          borderWidth: 2,
        }]
      }
    },
    {
      title: `pH Level Trend - ${currentData.date}`,
      data: {
        labels,
        datasets: [{
          label: 'pH Level',
          data: currentData.chartData.ph,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          borderWidth: 2,
        }]
      }
    },
    {
      title: `Toxicity Level Trend - ${currentData.date}`,
      data: {
        labels,
        datasets: [{
          label: 'Toxicity (mg/L)',
          data: currentData.chartData.tox,
          borderColor: '#a855f7',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          fill: true,
          borderWidth: 2,
        }]
      }
    },
    {
      title: `Heavy Metals Trend - ${currentData.date}`,
      data: {
        labels,
        datasets: [{
          label: 'Heavy Metals (mg/L)',
          data: currentData.chartData.metal,
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: true,
          borderWidth: 2,
        }]
      }
    }
  ];

  return (
    <div className="history-page">
      <Navbar user={user} />

      <main className="history-container">
        
        <div className="page-header">
          <h1>Historical Water Quality Data</h1>
          <p>View and analyze sensor readings from the past 3 days</p>
        </div>

        <div className="date-tabs">
          <button 
            className={`date-tab ${activeTab === 'twoDaysAgo' ? 'active' : ''}`}
            onClick={() => setActiveTab('twoDaysAgo')}
          >
            <span className="tab-label">📅 2 Days Ago</span>
            <span className="tab-date">Dec 13, 2025</span>
          </button>
          
          <button 
            className={`date-tab ${activeTab === 'yesterday' ? 'active' : ''}`}
            onClick={() => setActiveTab('yesterday')}
          >
            <span className="tab-label">📅 Yesterday</span>
            <span className="tab-date">Dec 14, 2025</span>
          </button>

          <button 
            className={`date-tab ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => setActiveTab('today')}
          >
            <span className="tab-label">✅ Today</span>
            <span className="tab-date">Dec 15, 2025</span>
          </button>
        </div>

        <div className="summary-grid">
          <div className="card temp">
            <div className="card-header">🌡️ Temperature</div>
            <div className="card-value">{currentData.summary.temp.val}</div>
            <div className="card-range">
              <span>Min: {currentData.summary.temp.min}</span>
              <span>Max: {currentData.summary.temp.max}</span>
            </div>
            <div className="card-status">{currentData.summary.temp.status}</div>
          </div>

          <div className="card ph">
            <div className="card-header">💧 pH Level</div>
            <div className="card-value">{currentData.summary.ph.val}</div>
            <div className="card-range">
              <span>Min: {currentData.summary.ph.min}</span>
              <span>Max: {currentData.summary.ph.max}</span>
            </div>
            <div className="card-status">{currentData.summary.ph.status}</div>
          </div>

          <div className="card tox">
            <div className="card-header">⚠️ Toxicity</div>
            <div className="card-value">{currentData.summary.tox.val}</div>
            <div className="card-range">
              <span>Min: {currentData.summary.tox.min}</span>
              <span>Max: {currentData.summary.tox.max}</span>
            </div>
            <div className="card-status">{currentData.summary.tox.status}</div>
          </div>

          <div className="card metal">
            <div className="card-header">☢️ Heavy Metals</div>
            <div className="card-value">{currentData.summary.metal.val}</div>
            <div className="card-range">
              <span>Min: {currentData.summary.metal.min}</span>
              <span>Max: {currentData.summary.metal.max}</span>
            </div>
            <div className="card-status">{currentData.summary.metal.status}</div>
          </div>
        </div>

        {/* --- DYNAMIC TABLE WITH STATUS CHECK --- */}
        <div className="table-container">
          <div className="table-title">Detailed Readings - {currentData.date}</div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Time</th><th>Temperature</th><th>pH Level</th><th>Toxicity</th><th>Heavy Metals</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.tableRows.map((row, i) => {
                  // Call the logic function here
                  const status = determineStatus(row);
                  
                  return (
                    <tr key={i}>
                      <td><b>{row.time}</b></td>
                      <td>{row.temp}</td>
                      <td>{row.ph}</td>
                      <td>{row.tox}</td>
                      <td>{row.metal}</td>
                      <td>
                        {/* Use the dynamic class and text */}
                        <span className={status.css}>{status.text}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="charts-grid">
          {charts.map((chart, i) => (
            <div className="chart-card" key={i}>
              <h3>{chart.title}</h3>
              <div style={{ height: '250px', width: '100%' }}>
                <Line options={commonOptions} data={chart.data} />
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}