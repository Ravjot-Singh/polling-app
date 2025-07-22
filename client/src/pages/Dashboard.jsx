import { useState , useEffect } from "react";
import PollCard from "../components/PollCard";

const Dashboard = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <h2>Your Polls</h2>
      <div className="poll-grid">
        {polls.map(poll => (
          <PollCard key={poll._id} poll={poll} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;