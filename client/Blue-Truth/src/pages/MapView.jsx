import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/mapview.css";

// --- Data Generator ---
const generateRandomReadings = () => {
  const toxicityRaw = (Math.random() * 2.5).toFixed(1); 
  const metalsRaw = (Math.random() * 0.3).toFixed(2);   
  const pHRaw = (6.0 + Math.random() * 3).toFixed(1);   

  let status = "safe";
  if (toxicityRaw > 1.5 || metalsRaw > 0.15) status = "harmful";
  else if (toxicityRaw > 0.8 || metalsRaw > 0.05 || pHRaw < 6.5 || pHRaw > 8.5) status = "warning";

  return {
    temperature: (24 + Math.random() * 8).toFixed(1),
    pH: pHRaw,
    toxicity: toxicityRaw,
    heavyMetals: metalsRaw,
    status: status
  };
};

export default function MapView() {
  const user = "Client"; // Changed purely for context, functionality implies read-only
  const detailRef = useRef(null);

  // State
  const [mapData, setMapData] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null); 

  // Initial Data
  useEffect(() => {
    setMapData([
      {
        id: 1,
        name: "Bonbonon Proper",
        position: [8.2710, 124.2950], 
        status: "safe",
        sensors: [{ id: "S1", ...generateRandomReadings() }]
      }
    ]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (selectedArea && detailRef.current) {
      setTimeout(() => {
        detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [selectedArea]);

  // Icons
  const iconColors = { safe: "green", warning: "yellow", harmful: "red" };
  const createIcon = (color) => L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // --- UPDATED BOUNDS ---
  const bonbononBounds = [
    [8.2500, 124.2700], // Southwest
    [8.2900, 124.3300]  // Northeast
  ];

  const getStatusLabel = (status) => {
      switch(status) {
          case 'harmful': return '⚠️ HARMFUL';
          case 'warning': return '⚠️ WARNING';
          default: return '✅ SAFE';
      }
  };

  return (
    <div className="home-bg">
      <Navbar user={user} />
      
      <div className="mapview-container">
        
        <div className="content-box">
            
            <h2 className="map-title">Water Monitoring: Bonbonon, Iligan City</h2>

            <div className="map-wrapper">
            
            <MapContainer
                center={[8.2700, 124.3000]} 
                zoom={15} 
                
                // --- LOCKING CONFIGURATION ---
                dragging={false}          
                scrollWheelZoom={false}   
                doubleClickZoom={false}   
                touchZoom={false}         
                zoomControl={false}      
                keyboard={false}          
                // -----------------------------

                maxBounds={bonbononBounds} 
                maxBoundsViscosity={1.0}    
                className="map-box"
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer attribution='&copy; CARTO' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                
                {mapData.map((area) => (
                <Marker
                    key={area.id}
                    position={area.position}
                    icon={createIcon(iconColors[area.status])}
                    eventHandlers={{ click: () => setSelectedArea(area) }}
                />
                ))}
            </MapContainer>
            </div>
        </div>

        {/* Details Panel */}
        {selectedArea && (
          <div ref={detailRef} className="area-details-container">
            <div className={`details-header border-${selectedArea.status}`}>
              <div className="details-top">
                <div>
                  <h3>{selectedArea.name}</h3>
                  <span className={`status-badge ${selectedArea.status}`}>{getStatusLabel(selectedArea.status)}</span>
                </div>
                {/* Controls removed */}
              </div>
              
              <div className="readings-grid">
                {selectedArea.sensors.map((sensor, idx) => (
                  <div key={sensor.id} className="sensor-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h5 style={{ margin: 0 }}>Sensor {idx + 1}</h5>
                        {/* Delete button removed */}
                    </div>

                    <div className="grid-metrics">
                      <div className="metric"><label>Temp</label><span>{sensor.temperature}°C</span></div>
                      <div className="metric"><label>pH</label><span>{sensor.pH}</span></div>
                      <div className="metric"><label>Toxicity</label><span className={sensor.toxicity > 0.8 ? 'text-red' : ''}>{sensor.toxicity} mg/L</span></div>
                      <div className="metric"><label>Metals</label><span className={sensor.heavyMetals > 0.05 ? 'text-red' : ''}>{sensor.heavyMetals} mg/L</span></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="risk-section">
                <h4>Risk Assessment</h4>
                {selectedArea.status === 'harmful' && <p className="alert-text">⚠️ <strong>CRITICAL:</strong> High toxicity.</p>}
                {selectedArea.status === 'warning' && <p className="warning-text" style={{ color: '#856404', backgroundColor: '#fff3cd', padding: '10px' }}>⚠️ <strong>WARNING:</strong> Elevated levels.</p>}
                {selectedArea.status === 'safe' && <p className="safe-text">✅ Safe parameters.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}