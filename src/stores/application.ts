import { defineStore, acceptHMRUpdate } from 'pinia'
import { supabase } from '@/services/supabaseClient'
import { type ApplicationData } from '@/types/submit_application.type'
import { useAppStateStore } from '@/stores/app_state'
export const useApplicationStore = defineStore('application', () => {
  function checkParams() {
    const jobId = useAppStateStore().job_id
    const isCustomMode = useAppStateStore().isCustomMode
    if (!jobId) {
      throw new Error('Job ID is required')
    }
    if (isCustomMode && isCustomMode.length >= 0) {
      throw new Error('Custom response is required')
    }

    return {
      jobId,
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
      const { jobId } = checkParams()
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
            job_id: jobId,
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

  return { submitApplication }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useApplicationStore, import.meta.hot))
}
