export default function InfoCard() {
  return (
    <div className="info-card">
      <div>
        <h2>What is Blue Truth?</h2>
        <p>
          Blue Truth is a smart water monitoring system that provides real-time
          water quality and toxicity data. It monitors temperature, pH level,
          toxicity, and heavy metals to ensure safe and fair water distribution.
        </p>
      </div>

      <div className="pulse-box">
        <div className="pulse-line"></div>
      </div>
    </div>
  );
}
