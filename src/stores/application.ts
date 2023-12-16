import { defineStore, acceptHMRUpdate } from 'pinia'
import { supabase } from '@/services/supabaseClient'
import { type ApplicationData } from '@/types/submit_application.type'
import { useAppStateStore } from '@/stores/app_state'

export const useApplicationStore = defineStore('application', () => {
  const appStateStore = useAppStateStore()
  function checkParams() {
    const { job_id, isCustomMode, customFields } = appStateStore
    if (!job_id) {
      throw new Error('Job ID is required')
    }
    if (isCustomMode == 'true' && Object.keys(customFields).length == 0) {
      throw new Error('Custom response is required')
    }

    return {
      job_id,
      isCustomMode
    }
  }

  function renameFileWithRandomInfo(fileName: string) {
    const fileExtension = fileName.split('.').pop()
    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, '')
    const fileNameWithoutSpaces = fileNameWithoutExtension.replace(/\s/g, '')
    const currentDateTime = new Date().toISOString().replace(/[-T:]/g, '').slice(0, -5)
    const randomInfo = Math.random().toString(36).substring(7)
    const newFileName = `${fileNameWithoutSpaces}_${currentDateTime}_${randomInfo}.${fileExtension}`
    return newFileName
  }

  async function submitApplication(application_info: ApplicationData) {
    try {
      const { job_id } = checkParams()
      const formData = new FormData()
      formData.append('file', application_info.file)
      const { data: file_upload, error: file_upload_error } = await supabase.storage
        .from('applicants_document')
        .upload(`resume_cv/${renameFileWithRandomInfo(application_info.file.name)}`, formData, {
          contentType: 'multipart/form-data',
          upsert: false
        })

      if (file_upload_error) {
        throw new Error(file_upload_error.message)
      }
      const { data: applicant_data, error: applicant_error } = await supabase
        .from('applicant')
        .insert([
          {
            job_id: job_id,
            name: application_info.name,
            email: application_info.email,
            pdf_url: file_upload.path,
            extra_response: null
          }
        ])
      if (applicant_error) {
        throw new Error(applicant_error.message)
      }
      return applicant_data
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async function submitCustomApplication(application_info: { [key: string]: any }) {
    try {
      const { job_id } = checkParams()
      let publicFilePath: string | null = null
      let fileName: string = ''

      const customFields = useAppStateStore().customFields
      if (!customFields) {
        throw new Error('Custom fields is required')
      }

      const formData = new FormData()
      Object.values(application_info).forEach((value) => {
        if (value instanceof File) {
          fileName = value.name
          formData.append('file', value)
        }
      })

      // check if file exists and upload to server
      if (formData.get('file')) {
        const { data: file_upload, error: file_upload_error } = await supabase.storage
          .from('applicants_document')
          .upload(`resume_cv/${renameFileWithRandomInfo(fileName)}`, formData, {
            contentType: 'multipart/form-data',
            upsert: false
          })

        if (file_upload_error) {
          throw new Error(file_upload_error.message)
        }

        publicFilePath = file_upload.path
      }

      const { data: applicant_data, error: applicant_error } = await supabase
        .from('applicant')
        .insert([
          {
            job_id: job_id,
            name: application_info.name ?? null,
            email: application_info.email ?? null,
            pdf_url: publicFilePath,
            extra_response: application_info
          }
        ])

      if (applicant_error) {
        throw new Error(applicant_error.message)
      }

      return applicant_data
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  return { submitApplication, submitCustomApplication }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useApplicationStore, import.meta.hot))
}
