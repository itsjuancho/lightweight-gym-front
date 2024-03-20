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

export const validateOnlyEmail= (email)=>{
  if (!email) {
    return "email is required";
  }

  if (!REGEX_FIELD_EMAIL.test(email)) {
      return "Invalid email address";
  }
}

export const validateFieldForResetPassword= (formData)=>{
   const {token,newPassword,confirmPassword} = formData;
  if (!token) {
     return "invalid token"
  }

  if (!newPassword || !confirmPassword) {
     return "newPassword and re-password is required"
  }

  if (newPassword !== confirmPassword) {
    return "Passwords do not match";
  }

  if (newPassword.length < 8 || confirmPassword.length < 8) {
    return "Passwords must be at least 8 characters long";
  }

  
}