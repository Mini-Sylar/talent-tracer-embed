import { defineStore, acceptHMRUpdate } from 'pinia'
import { supabase } from '@/services/supabaseClient'
import { type ApplicationData } from '@/types/submit_application.type'

export const useApplicationStore = defineStore('application', () => {
  function checkParams() {
    const urlParams = new URLSearchParams(window.location.search)
    const jobId = urlParams.get('job_id')
    const isCustomResponse = urlParams.get('custom_response')
    const customJSON = urlParams.get('application_json')
    if (!jobId) {
      throw new Error('Job ID is required')
    }
    if (isCustomResponse && isCustomResponse.length >= 0 && !customJSON) {
      throw new Error('Custom response is required')
    }

    return {
      jobId,
      isCustomResponse,
      customJSON
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
      const { jobId, customJSON } = checkParams()
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
            extra_response: customJSON || null
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
