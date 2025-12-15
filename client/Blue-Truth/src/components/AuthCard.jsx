export default function AuthCard({ title, children }) {
  return (
    <div className="auth-card animate">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
