const OtpForm = ({ otp, onOtpChange, onSubmit, loading }) => {
  return (
    <>
      <h1>OTP Verification</h1>
      <p>
        Enter 4-digit OTP code sent to your phone number.
      </p>

      <form onSubmit={onSubmit} className="otp-form">
        <div className="otp-inputs">
          {otp.map((data, index) => (
            <input
              key={index}
              type="number"
              maxLength="1"
              value={data}
              disabled={loading}
              onChange={(e) => onOtpChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={loading || otp.some((digit) => digit === "")}
        >
          {loading ? <span className="loader" /> : "Submit OTP"}
        </button>
      </form>
    </>
  );
};

export default OtpForm;


