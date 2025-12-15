import Navbar from "../components/Navbar";
import InfoCard from "../components/InfoCard";
import GraphCard from "../components/GraphCard";
import { hourlyData } from "../data/mockData";
import "../styles/home.css";

export default function Home() {
  
  // RETRIEVE THE USER HERE
  const currentUser = localStorage.getItem("currentUser"); 

  const metalsConfig = [
    { key: "lead", color: "#8884d8", label: "Lead" },
    { key: "mercury", color: "#e91e63", label: "Mercury" },
    { key: "cadmium", color: "#06b6d4", label: "Cadmium" }
  ];

  return (
    <div className="home-bg">
      {/* PASS THE SAVED USER TO NAVBAR */}
      <Navbar user={currentUser} />

      <div className="container">
        <InfoCard />

        <h2 className="section-title">GRAPHS</h2>

        <div className="grid">
          <GraphCard
            title="Temperature"
            color="#ff4d4f"
            unit="°C"
            data={hourlyData.map(d => ({ time: d.time, value: d.temp }))}
          />

          <GraphCard
            title="pH Level"
            color="#3b82f6"
            unit="Safe (6.5–8.5)"
            yAxisLabel="pH" 
            data={hourlyData.map(d => ({ time: d.time, value: d.ph }))}
          />

          <GraphCard
            title="Toxicity"
            type="bar"
            color="#fbbf24"
            unit="ppb"
            data={hourlyData.map(d => ({ time: d.time, value: d.toxicity }))}
          />

          <GraphCard
            title="Heavy Metals"
            unit="ppb"
            yAxisLabel="Concentration" 
            data={hourlyData}
            config={metalsConfig}
          />
        </div>
      </div>
    </div>
  );
}