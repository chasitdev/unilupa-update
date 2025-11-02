import {ValidationResult} from 'src/types/validation-response';
import {validationMessage} from '../translations';
import * as Yup from 'yup';

export function isEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}

const emailValidationSchema = Yup.object({
  email: Yup.string()
    .email(validationMessage.invalidEmail)
    .required(validationMessage.requiredField),
});

export async function validateEmail(email: string): Promise<ValidationResult> {
  try {
    await emailValidationSchema.validate({email});
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
