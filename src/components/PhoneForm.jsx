const PhoneForm = ({ phoneNumber, onPhoneNumberChange, onSubmit, loading }) => (
  <>
    <h1>Prove Identity Verification</h1>
    <p>Enter a phone number to test the Prove flow.</p>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          placeholder="+15551234567"
          required
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading || !phoneNumber}>
        {loading ? <span className="loader" /> : "Verify Phone"}
      </button>
    </form>
  </>
);

export default PhoneForm;
