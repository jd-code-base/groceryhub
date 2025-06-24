import api from "./axios";

export const sendOtp = async (email) => {
  const res = await api.post("/auth/send-otp", { email });
  return res.data;
};

export const verifyOtp = async (email, otp) => {
  const res = await api.post("/auth/verify-otp", { email, otp });
  return res.data;
};

export const completeRegistration = async ({
  name,
  email,
  password,
  phone,
}) => {
  const res = await api.post("/auth/complete-registration", {
    name,
    email,
    password,
    phone,
  });
  return res.data;
};

export const loginUser = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const checkAuthStatus = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data.success;
  } catch (err) {
    return false;
  }
};
