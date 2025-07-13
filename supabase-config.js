// Supabase configuration
const SUPABASE_URL = 'https://wcvdzkudyanpjguyipsr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjdmR6a3VkeWFucGpndXlpcHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDcyODYsImV4cCI6MjA2NzkyMzI4Nn0.7V2LSDsTAMtKjzSjlm6zlvXGoogeDxOElyVxLtOqQxU'

// Wait for Supabase library to load
function initializeSupabase() {
    if (typeof supabase !== 'undefined') {
        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
        window.supabase = supabaseClient
        console.log('Supabase client initialized successfully')
        return true
    } else {
        console.log('Waiting for Supabase library to load...')
        return false
    }
}

// Try to initialize immediately
if (!initializeSupabase()) {
    // If not ready, wait for DOM content loaded
    document.addEventListener('DOMContentLoaded', function() {
        if (!initializeSupabase()) {
            // If still not ready, wait a bit more
            setTimeout(initializeSupabase, 1000)
        }
    })
} 