import React from "react";
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

class App extends React.Component {
  constructor(props) {
    super(props);
    const saved = localStorage.getItem("votes");
    this.state = {
      votes: saved
        ? JSON.parse(saved)
        : emojis.map((e) => ({ ...e, count: 0 })),
      winner: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.votes !== this.state.votes) {
      localStorage.setItem("votes", JSON.stringify(this.state.votes));
    }
  }

  handleVote = (id) => {
    const updatedVotes = this.state.votes.map((e) =>
      e.id === id ? { ...e, count: e.count + 1 } : e
    );
    this.setState({ votes: updatedVotes });
  };

  showResults = () => {
    const max = Math.max(...this.state.votes.map((e) => e.count));
    const winnerEmoji = this.state.votes.find((e) => e.count === max);
    this.setState({ winner: winnerEmoji });
  };

  clearVotes = () => {
    const cleared = emojis.map((e) => ({ ...e, count: 0 }));
    this.setState({ votes: cleared, winner: null });
    localStorage.removeItem("votes");
  };

  render() {
    return (
      <div className="container">
        <h1>Vote for the best emoticon</h1>
        {this.state.votes.map((e) => (
          <Emoji key={e.id} emoji={e} onVote={this.handleVote} />
        ))}
        <button onClick={this.showResults}>Show Results</button>
        <button onClick={this.clearVotes}>Clear results</button>

        {this.state.winner && <Winner emoji={this.state.winner} />}
      </div>
    );
  }
}
export default App;
