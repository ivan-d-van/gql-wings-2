import {ValidationCheckResponse} from "../../../utils/types";

export const validationSendTxCheck = (txAmount: number, balanceAmount: number, txUsername: string | null, isEmpty?: boolean ): ValidationCheckResponse => {
  if (isEmpty) {
    return {
      isValid: false,
      validationError: `Token can't be empty`
    }
  }

  if (txAmount > balanceAmount) {
    return {
      isValid: false,
      validationError: 'Not enough tokens on your balance'
    }
  }

  if (txAmount < 0) {
    return {
      isValid: false,
      validationError: `Token can't be negative`
    }
  }

  if (txAmount === 0) {
    return {
      isValid: false,
      validationError: `Token can't be zero`
    }
  }

  if (!txUsername && txUsername !== null) {
    return {
      isValid: false,
      validationError: `Receiver can't be empty`
    }
  }

  return {
    isValid: true,
    validationError: null
  }
}
