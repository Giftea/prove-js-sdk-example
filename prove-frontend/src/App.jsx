import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { useProveAuth } from "./hooks/useProveAuth.jsx";
import PhoneForm from "./components/PhoneForm.jsx";
import StatusDisplay from "./components/StatusDisplay.jsx";
import CompletionForm from "./components/CompletionForm.jsx";
import Result from "./components/Result.jsx";
import OtpForm from "./components/OtpForm.jsx";
import SmsWaiting from "./components/SMSWaiting.jsx";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [individualData, setIndividualData] = useState({
    firstName: "",
    lastName: "",
  });

  const { loading, error, message, startVerification, sendOtp, completeVerification } = useProveAuth();

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    startVerification(phoneNumber);
    setPhoneNumber("");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    sendOtp(otp.join(""));
    setOtp(new Array(4).fill(""));
  };

  const handleCompletionSubmit = (e) => {
    e.preventDefault();
    completeVerification(individualData);
  };

  return (
      <div className="container">
        <Routes>
          <Route
            index
            element={
              <PhoneForm
                phoneNumber={phoneNumber}
                onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
                onSubmit={handlePhoneSubmit}
                loading={loading}
              />
            }
          />
          <Route
            path="/complete"
            element={
              <CompletionForm
                individualData={individualData}
                onDataChange={(e) =>
                  setIndividualData({
                    ...individualData,
                    [e.target.name]: e.target.value,
                  })
                }
                onSubmit={handleCompletionSubmit}
                loading={loading}
              />
            }
          />
          <Route
            path="/sms-otp"
            element={
              <OtpForm
                otp={otp}
                onOtpChange={(element, index) => {
                  if (isNaN(element.value)) return;

                  const newOtp = [...otp];
                  newOtp[index] = element.value;
                  setOtp(newOtp);
                  if (element.nextSibling) {
                    element.nextSibling.focus();
                  }
                }}
                onSubmit={handleOtpSubmit}
                loading={loading}
              />
            }
          />
          <Route path="/sms-waiting" element={ <SmsWaiting /> } />
          <Route path="/verify-failure" element={<Result status={"failure"} />} />
          <Route path="/verify-success" element={<Result status="success" />} />
        </Routes>
        <StatusDisplay loading={loading} error={error} message={message} />
      </div>
  );
};

export default App;
