import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useAppStateStore } from '@/stores/app_state'
import { reactive } from 'vue'
import { type CustomField } from '@/types/custom_apply.types'
import { useApplicationStore } from '@/stores/application'

const maxFileSize = 5 * 1024 * 1024 // 5MB
export const useCustomSubmissionSchema = () => {
  const appState = useAppStateStore()
  const customFields = appState.customFields as CustomField

  const fieldSchemas = customFields.reduce(
    (schemas, field) => {
      switch (field.type) {
        case 'input':
          schemas[field.name] = z.string()
          break
        case 'file':
          schemas[field.name] = z
            .instanceof(File, {
              message: 'File is required'
            })
            .refine((file: File) => file.type != 'pdf', {
              message: 'Only PDFs are allowed'
            })
            .refine((file: File) => file.size < maxFileSize, {
              message: `File must be less than ${maxFileSize / 1024 / 1024}MB`
            })
          break
        // Add cases for other field types as needed
      }
      return schemas
    },
    {} as Record<string, any>
  )

  const customFieldsSchema = z.object(fieldSchemas)

  const { handleSubmit, resetForm, errors, isSubmitting } = useForm({
    validationSchema: toTypedSchema(customFieldsSchema)
  })

  const fields = reactive(
    customFields.reduce(
      (fields, field) => {
        fields[field.name] = useField(field.name)
        return fields
      },
      {} as Record<string, ReturnType<typeof useField>>
    )
  )

  const onSubmit = handleSubmit(
    async (values) => {
      const response = await useApplicationStore().submitCustomApplication(values)
      resetForm()
      return response
    },
    () => {
      throw {
        type: 'frontend_error',
        errors
      }
    }
  )

  return {
    onSubmit,
    errors,
    fields,
    isSubmitting
  }
}
