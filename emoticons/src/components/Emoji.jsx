export default function Emoji({ emoji, onVote }) {
  return (
    <div
      className="emoji"
      onClick={() => onVote(emoji.id)}
      style={{ cursor: "pointer", fontSize: "2rem", margin: "10px" }}
    >
      {emoji.icon} - {emoji.count}
    </div>
  );
}
