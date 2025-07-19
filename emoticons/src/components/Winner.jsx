export default function Winner({ emoji }) {
  return (
    <div>
      <h2>Winner:</h2>
      <div style={{ fontSize: "3rem" }}>{emoji.icon}</div>
      <p>Number of votes: {emoji.count}</p>
    </div>
  );
}
