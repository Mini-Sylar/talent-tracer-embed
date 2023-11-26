import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'

interface SubmissionSchema {
  name: string
  email: string
  file: File
}

const maxFileSize = 5 * 1024 * 1024 // 5MB

export function useSubmissionSchema() {
  const { isSubmitting, handleSubmit, values, errors, handleReset } = useForm<SubmissionSchema>({
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

  const { value: name } = useField<SubmissionSchema['name']>('name')
  const { value: email } = useField<SubmissionSchema['email']>('email')
  const { value: file } = useField<SubmissionSchema['file']>('file')

  async function handleSuccess() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  function handleFailure(values: any) {
    console.log(values)
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
