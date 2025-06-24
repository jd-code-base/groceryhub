export const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

export const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
