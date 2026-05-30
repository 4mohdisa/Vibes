export const usernameValidator = (username) => {
  // Allow letters, numbers, and special characters
  const regex = /^[a-zA-Z0-9_!@#$%^&*()]+$/;
  if (!regex.test(username)) {
    return { isValid: false, errorMessage: "Username can only contain letters, numbers, and special characters _!@#$%^&*()" };
  }
  return { isValid: true, errorMessage: "" };
};
