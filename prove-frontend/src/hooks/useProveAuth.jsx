import { useState, useCallback } from "react";
import * as proveAuth from "@prove-identity/prove-auth";
import { startSession, validate, complete } from "../api/proveApi";
import { useNavigate } from "react-router";

export const useProveAuth = () => {
  const [state, _setState] = useState({
    loading: false,
    message: null,
    error: null,
    correlationId: null,
    authToken: null,
  });
  const navigate = useNavigate();

  // Helper to easily update parts of the state
  const setState = (patch) => _setState((s) => ({ ...s, ...patch }));

  // Wraps an async fn with loading state and error handling
  const withLoading = async (fn) => {
    setState({ loading: true });
    try {
      await fn();
    } catch (error) {
      setState({ error: formatError(error) });
      navigate("/");
      throw error;
    } finally {
      setState({ loading: false });
    }
  };

  const formatError = (err) => err.response?.data?.error || err.message;

  /** ---- Backend Validation Helper ---- */
  const validateSession = useCallback(
    async (correlationId) =>
      withLoading(async () => {
        try {
          // Call the /validate endpoint on your server
          const { data } = await validate({ correlationId });

          // Navigate based on the validation result
          navigate(data?.success ? "/complete" : "/");
          if (!data?.success)
            throw new Error("Mobile verification failed. Please try again.");
        } catch (e) {
          setState({ error: formatError(e) });
        }
      }),
    [navigate]
  );

  /** ---- Authenticator Builder ---- */
  const buildAuth = ({ isMobile, onOtp }) => {
    const builder = new proveAuth.AuthenticatorBuilder();
    const getPhoneNumberHandler = () => Promise.resolve(null);

    // This is the callback that runs after the device check
    builder.withAuthFinishStep((input) => validateSession(input.authId));

    if (isMobile) {
      builder.withOtpFallback(getPhoneNumberHandler, onOtp);
    } else {
      // Desktop
      builder.withRole("secondary");
      builder.withInstantLinkFallback(getPhoneNumberHandler);
    }
    return builder.build();
  };

  const startVerification = (phoneNumber) =>
    withLoading(async () => {
      setState({ message: "Starting verification…", error: null });
      // Detect if the user is on a mobile or desktop browser
      const isMobile = new proveAuth.AuthenticatorBuilder()
        .build()
        .isMobileWeb();
      const flowType = isMobile ? "mobile" : "desktop";

      // Call your backend to start the session
      const { data } = await startSession({ phoneNumber, flowType });
      const { authToken, correlationId } = data;
      setState({ authToken, correlationId, message: null });

      // Trigger the appropriate on-device flow
      if (isMobile) {
        navigate("/sms-otp");
      } else {
        navigate("/sms-waiting");
        await buildAuth({ isMobile, correlationId }).authenticate(authToken);
      }
    });

  const sendOtp = (otp) =>
    withLoading(async () => {
      // This handler provides the OTP to the SDK when requested
      const otpHandler = () =>
        Promise.resolve({ input: { otp }, resultType: 0 });
      await buildAuth({
        isMobile: true,
        onOtp: otpHandler,
      }).authenticate(state.authToken);
    });

  const completeVerification = (individual) =>
    withLoading(async () => {
      // Call the final /complete endpoint on your server
      const { data } = await complete({
        correlationId: state.correlationId,
        individual,
      });
      navigate(data?.success ? "/verify-success" : "/verify-failure");
    });

  return { ...state, startVerification, sendOtp, completeVerification };
};
