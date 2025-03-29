export const EMAIL_VALIDATION = {
  required: "Email is require",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email address.",
  },
};
export const Name_VALIDATION = {
  required: "User Name is require",
  pattern: {
    value: /^[a-zA-Z0-9]+([a-zA-Z0-9]|\s)*$/,
    message:
      "The userName must be at least 4 characters.,The userName must contain characters and end with numbers without spaces.",
  },
};
export const PHON_VALIDATION = {
  required: "Phone number is required",
  pattern: {
    value: /^\+?\d{8,15}$/,
    message:
      "Phone number must be between 8 and 15 digits and can start with " +
      ". No spaces or special characters allowed.",
  },
};
export const PASSWORD_VALIDATION = {
  required: { value: true, message: "Password is require" },
  minLength: { value: 6, message: "Password Must be at least 6 characters" },
  pattern: {
    value: /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Password must be at least 8 characters and include at least one number and one special character (@, #, $, etc.).",
  },
};
