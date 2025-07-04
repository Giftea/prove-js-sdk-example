const cors = require("cors");
const express = require("express");
const { Proveapi: ProveAPI } = require("@prove-identity/prove-api");
const dotenv = require("dotenv");

dotenv.config();

// Express Server
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load Environment variables
const {
  PROVE_CLIENT_ID,
  PROVE_CLIENT_SECRET,
  PROVE_ENV,
  FINAL_TARGET_URL,
  PORT,
} = process.env;

// Environment validation
if (!PROVE_CLIENT_ID || !PROVE_CLIENT_SECRET) {
  console.error("FATAL: Prove credentials missing in .env file");
  process.exit(1);
}

// Prove SDK Initialization
const proveSdk = new ProveAPI({
  server: PROVE_ENV,
  security: {
    clientID: PROVE_CLIENT_ID,
    clientSecret: PROVE_CLIENT_SECRET,
  },
});

// Start a new Prove session
app.post("/start-session", async (req, res) => {
  try {
    const { flowType, phoneNumber } = req.body;

    const startRequest = {
      flowType,
      phoneNumber,
      ...(flowType === "desktop" && { finalTargetUrl: FINAL_TARGET_URL }),
    };

    const { v3StartResponse } = await proveSdk.v3.v3StartRequest(startRequest);

    res.status(200).json({
      authToken: v3StartResponse.authToken,
      correlationId: v3StartResponse.correlationId,
    });
  } catch (error) {
    res.status(500).json({
      error: error?.message || "Failed to start session",
    });
  }
});

// Validate a Prove session
app.post("/validate", async (req, res) => {
  try {
    const { correlationId } = req.body;

    const { v3ValidateResponse } = await proveSdk.v3.v3ValidateRequest({
      correlationId,
    });

    if (!v3ValidateResponse) {
      throw new Error("Invalid validation response");
    }

    res.status(200).json(v3ValidateResponse);
  } catch (error) {
    res.status(500).json({
      error: error?.message || "Validation failed",
    });
  }
});


// Complete a Prove verification
app.post("/complete", async (req, res) => {
  try {
    const { correlationId, individual } = req.body;

    if (!correlationId || !individual) {
      return res.status(400).json({
        error: "Session Expired",
      });
    }

    const { v3CompleteResponse } = await proveSdk.v3.v3CompleteRequest({
      correlationId,
      individual,
    });

    if (!v3CompleteResponse) {
      throw new Error("Invalid completion response");
    }

    res.status(200).json(v3CompleteResponse);
  } catch (error) {
    res.status(500).json({
      error: error?.message || "Identity Verification failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
