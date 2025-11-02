import {ValidationResult} from 'src/types/validation-response';
import {validationMessage} from '../translations';
import * as Yup from 'yup';

const passwordSignUpValidationSchema = Yup.object({
  password: Yup.string()
    .min(8, validationMessage.passwordTooShort)
    .matches(/[a-zA-Z]/, validationMessage.passwordMustContainLetters)
    // .matches(/[0-9]/, validationMessage.passwordMustContainNumber)
    // .matches(/[@$!%*#?&]/, validationMessage.passwordMustContainSpecial)
    .required(validationMessage.requiredField),
});

export async function validateSignUpPassword(
  password: string,
): Promise<ValidationResult> {
  try {
    await passwordSignUpValidationSchema.validate({password});
    return {
      success: true,
      error: '',
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
}

const passwordLoginValidationSchema = Yup.object({
  password: Yup.string().required(validationMessage.requiredField),
});

export async function validateLoginPassword(
  password: string,
): Promise<ValidationResult> {
  try {
    await passwordLoginValidationSchema.validate({password});
    return {
      success: true,
      error: '',
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
}

export function containsSpecialChars(password: string): boolean {
  const specialCharsPattern: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return specialCharsPattern.test(password);
}
