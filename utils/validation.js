const REGEX_FIELD_TEXT = /^[a-zA-Z]+$/;
const REGEX_FIELD_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistration = (formData) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    rePassword,
    isRegister,
  } = formData;

  if (isRegister) {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !rePassword
    ) {
      return "All fields are required";
    }

    if (!REGEX_FIELD_TEXT.test(firstName) || !REGEX_FIELD_TEXT.test(lastName)) {
      return "First Name, Last Name, and Username should not contain special characters";
    }

    if (!REGEX_FIELD_EMAIL.test(email)) {
      return "Invalid email address";
    }

    if (password.length < 8 || rePassword.length < 8) {
      return "Passwords must be at least 8 characters long";
    }

    if (password !== rePassword) {
      console.log("ok entro a validate re paswword");
      return "Passwords do not match";
    }
    return null;
  }


  if (!username) {
    return "Username Field is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  return null; 
};
