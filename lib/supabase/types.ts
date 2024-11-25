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
      products: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          stock: number
          category: string
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          price: number
          stock?: number
          category: string
          images?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          price?: number
          stock?: number
          category?: string
          images?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          customer_name: string
          customer_email: string
          customer_phone: string
          wilaya: string
          address: string
          notes: string | null
          status: string
          total_amount: number
          delivery_fee: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          customer_name: string
          customer_email: string
          customer_phone: string
          wilaya: string
          address: string
          notes?: string | null
          status?: string
          total_amount: number
          delivery_fee: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          wilaya?: string
          address?: string
          notes?: string | null
          status?: string
          total_amount?: number
          delivery_fee?: number
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          price_at_time: number
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          quantity: number
          price_at_time: number
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          price_at_time?: number
          created_at?: string
        }
      }
      delivery_fees: {
        Row: {
          id: number
          wilaya: string
          fee: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          wilaya: string
          fee: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          wilaya?: string
          fee?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}