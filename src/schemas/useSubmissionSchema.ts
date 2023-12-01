import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { type ApplicationData } from '@/types/submit_application.type'
import { useApplicationStore } from '@/stores/application'

const maxFileSize = 5 * 1024 * 1024 // 5MB

export function useSubmissionSchema() {
  const { isSubmitting, handleSubmit, values, errors, handleReset } = useForm<ApplicationData>({
    validationSchema: toTypedSchema(
      z.object({
        name: z
          .string({
            required_error: 'Name is required'
          })
          .min(3, {
            message: 'Name must be at least 3 characters'
          })
          .max(50, {
            message: 'Name must be at most 50 characters'
          }),
        email: z
          .string({
            required_error: 'Email is required'
          })
          .email({
            message: 'Enter a valid email'
          }),
        file: z
          .instanceof(File, {
            message: 'File is required'
          })
          .refine((file: File) => file.type != 'pdf', {
            message: 'Only PDFs are allowed'
          })
          .refine((file: File) => file.size < maxFileSize, {
            message: `File must be less than ${maxFileSize / 1024 / 1024}MB`
          })
      })
    )
  })

  const { value: name } = useField<ApplicationData['name']>('name')
  const { value: email } = useField<ApplicationData['email']>('email')
  const { value: file } = useField<ApplicationData['file']>('file')

  async function handleSuccess(data: typeof values) {
    const response = await useApplicationStore().submitApplication(data)
    return Promise.resolve(response)
  }

  function handleFailure(errors: any) {
    console.log(errors)
    throw {
      type: 'frontend_error',
      errors
    }
  }

  const onSubmit = handleSubmit(handleSuccess, handleFailure)

  return {
    isSubmitting,
    onSubmit,
    values,
    errors,
    handleReset,
    name,
    email,
    file
  }
}
