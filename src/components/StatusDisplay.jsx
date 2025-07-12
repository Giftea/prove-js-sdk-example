const StatusDisplay = ({ error, message }) => (
  <>
    {error && (
      <div className="message error">
        {error}
      </div>
    )}
    {message && !error && (
      <div className="message info">
        {message}
      </div>
    )}
  </>
);

export default StatusDisplay;
