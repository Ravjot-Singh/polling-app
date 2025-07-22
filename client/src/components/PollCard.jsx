const PollCard = ({ poll }) => (
  <div className="poll-card">
    <h3>{poll.title}</h3>
    <p><strong>Created By:</strong> {poll.createdBy.username}</p>
    <p><strong>Status:</strong> <span className={poll.isActive ? 'active' : 'inactive'}>{poll.isActive ? 'Active' : 'Inactive'}</span></p>
    <ul>
      {poll.options.map(option => (
        <li key={option._id}>{option.text} ({option.count} votes)</li>
      ))}
    </ul>
  </div>
);

export default PollCard;