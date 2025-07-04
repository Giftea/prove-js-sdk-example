const Result = ({ status }) => {
  const isSuccess = status === "success";

  const title = isSuccess ? "Congratulations 🎉" : "Verification Failed ❌";
  const message = isSuccess
    ? "Identity successfully verified"
    : "Identity could not be verified";

  return (
    <>
      <h1>{title}</h1>
      <div className={isSuccess ? "message success" : "message error"}>
        {message}
      </div>
    </>
  );
};

export default Result;
