const CompletionForm = ({
  individualData,
  onDataChange,
  onSubmit,
  loading,
}) => (
  <>
    <h1>Complete Verification</h1>
    <p>
      Enter first and last name associated with phone number.
    </p>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={individualData.firstName}
          onChange={onDataChange}
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={individualData.lastName}
          onChange={onDataChange}
          required
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={
          loading || !individualData.firstName || !individualData.lastName
        }
      >
        {loading ? <span className="loader" /> : "Complete Verification"}
      </button>
    </form>
  </>
);

export default CompletionForm;
