import {ValidationResult} from 'src/types/validation-response';
import {validationMessage} from '../translations';
import * as Yup from 'yup';

const textValidationSchema = Yup.object({
  text: Yup.string().required(validationMessage.requiredField),
});

export async function validateText(text: string): Promise<ValidationResult> {
  try {
    await textValidationSchema.validate({text});
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
