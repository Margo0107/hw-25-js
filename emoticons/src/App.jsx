import React, { useEffect, useState } from "react";
import Emoji from "./components/emoji";
import Winner from "./components/Winner";
import "./components/index.css";

const emojis = [
  { id: 1, icon: "😃" },
  { id: 2, icon: "😊" },
  { id: 3, icon: "😎" },
  { id: 4, icon: "🤩" },
  { id: 5, icon: "😍" },
];

export default function App() {
  const [votes, setVotes] = useState(() => {
    const saved = localStorage.getItem("votes");
    return saved ? JSON.parse(saved) : emojis.map((e) => ({ ...e, count: 0 }));
  });

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votes));
  }, [votes]);

  const handleVote = (id) => {
    const updatedVotes = votes.map((e) =>
      e.id === id ? { ...e, count: e.count + 1 } : e
    );
    setVotes(updatedVotes);
  };

  const showResults = () => {
    const max = Math.max(...votes.map((e) => e.count));
    const winnerEmoji = votes.find((e) => e.count === max);
    setWinner(winnerEmoji);
  };

  const clearVotes = () => {
    setVotes(emojis.map((e) => ({ ...e, count: 0 })));
    setWinner(null);
    localStorage.removeItem("votes");
  };

  return (
    <div className="container">
      <h1>Vote for the best emoticon</h1>
      {votes.map((e) => (
        <Emoji key={e.id} emoji={e} onVote={handleVote} />
      ))}
      <button onClick={showResults}>Show Results</button>
      <button onClick={clearVotes}>Clear results</button>

      {winner && <Winner emoji={winner} />}
    </div>
  );
}
