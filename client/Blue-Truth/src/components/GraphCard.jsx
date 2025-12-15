import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid
} from "recharts";

export default function GraphCard({ title, data, type, color, unit, config, yAxisLabel }) {
  const isMulti = Array.isArray(config) && config.length > 0;
  const currentData = data && data.length > 0 ? data[data.length - 1] : {};
  const yLabel = yAxisLabel || unit; 

  let statusInfo = null;
  if (isMulti) {
    const maxVal = Math.max(...config.map(c => currentData[c.key] || 0));
    const isSafe = maxVal <= 1.5;
    statusInfo = {
      value: maxVal,
      label: isSafe ? "Safe" : "Warning",
      color: isSafe ? "#10b981" : "#ef4444"
    };
  }

  // Shared Axis Props
  const commonXAxisProps = {
    dataKey: "time",
    tick: { fontSize: 12 },
    axisLine: false,
    tickLine: false,
    label: { value: 'Time', position: 'insideBottom', offset: -5, style: { fill: '#9ca3af', fontSize: '12px' } }
  };

  const commonYAxisProps = {
    tick: { fontSize: 12 },
    axisLine: false,
    tickLine: false,
    label: { value: yLabel, angle: -90, position: 'insideLeft', style: { fill: '#9ca3af', fontSize: '12px' } }
  };

  return (
    <div className="graph-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
        <h3>{title}</h3>
        {isMulti && statusInfo ? (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#8884d8" }}>
              {statusInfo.value} <span style={{ fontSize: "0.8rem", color: "#666" }}>{unit}</span>
            </div>
            <span style={{ color: statusInfo.color, fontWeight: "bold", fontSize: "0.8rem" }}>
              {statusInfo.label}
            </span>
          </div>
        ) : (
          <span style={{ fontSize: '0.9rem', color: '#666' }}>{unit}</span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        {type === "bar" ? (
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            {/* Removed the grey cursor background on hover */}
            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            
            {/* Added cursor={false} to hide the vertical line on hover */}
            <Tooltip cursor={false} contentStyle={{ borderRadius: '8px' }} />

            {isMulti ? (
              config.map((item) => (
                <Line
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  stroke={item.color}
                  strokeWidth={3}
                  // FIX: Explicitly set stroke to "none"
                  dot={{ r: 4, fill: item.color, stroke: "none" }} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name={item.label}
                />
              ))
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                // FIX: Explicitly set stroke to "none"
                dot={{ r: 4, fill: color, stroke: "none" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            )}
          </LineChart>
        )}
      </ResponsiveContainer>

      {isMulti && (
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px", paddingTop: "15px", borderTop: "1px solid #f0f0f0" }}>
          {config.map((item) => (
            <div key={item.key} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.8rem", color: item.color, fontWeight: "600", marginBottom: "4px" }}>
                ● {item.label}
              </div>
              <div style={{ fontWeight: "bold", color: "#333", fontSize: "1rem" }}>
                {currentData[item.key]} <span style={{ fontSize: "0.7em", color: "#999" }}>{unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}