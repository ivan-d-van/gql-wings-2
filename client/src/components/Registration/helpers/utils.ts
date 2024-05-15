import {ValidationCheckResponse} from "../../../utils/types";

const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
}

export const validationCheck = (email: string, password: string, passwordConfirm: string): ValidationCheckResponse => {
  if (password !== passwordConfirm) {
    return {
      isValid: false,
      validationError: `Passwords don't match`
    }
  }

  if (!validateEmail(email)) {
    return {
      isValid: false,
      validationError: `Email doesn't match format`
    }
  }

  if (password.trim().length < 5) {
    return {
      isValid: false,
      validationError: `Password length must be more than 5 characters`
    }
  }

  return {
    isValid: true,
    validationError: null
  }
}

