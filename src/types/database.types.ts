export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      applicant: {
        Row: {
          created_at: string
          email: string | null
          extra_response: Json | null
          id: string
          job_id: string
          name: string | null
          pdf_url: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          extra_response?: Json | null
          id?: string
          job_id: string
          name?: string | null
          pdf_url?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          extra_response?: Json | null
          id?: string
          job_id?: string
          name?: string | null
          pdf_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applicant_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_opening"
            referencedColumns: ["user_external_key"]
          },
          {
            foreignKeyName: "applicant_pdf_url_fkey"
            columns: ["pdf_url"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          }
        ]
      }
      job_opening: {
        Row: {
          application_type: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          is_published: boolean
          keywords: string[] | null
          location: string | null
          scopes: string[] | null
          title: string | null
          updated_at: string | null
          user_external_key: string
        }
        Insert: {
          application_type?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          is_published?: boolean
          keywords?: string[] | null
          location?: string | null
          scopes?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_external_key?: string
        }
        Update: {
          application_type?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          is_published?: boolean
          keywords?: string[] | null
          location?: string | null
          scopes?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_external_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_opening_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_published_job_opening: {
        Args: {
          job_external_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
