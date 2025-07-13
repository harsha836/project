// Supabase API functions for Labour Booking System

class SupabaseAPI {
    constructor() {
        // Wait for supabase to be available
        if (window.supabase) {
            this.supabase = window.supabase;
        } else {
            throw new Error('Supabase client not initialized. Make sure supabase-config.js is loaded.');
        }
    }

    // Authentication Methods
    async signUp(email, password, userData) {
        try {
            const { data, error } = await this.supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData
                }
            });
            
            if (error) throw error;
            
            // Create user profile
            if (data.user) {
                await this.createUserProfile(data.user.id, userData);
            }
            
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async signIn(email, password) {
        try {
            console.log('Attempting to sign in with email:', email);
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) {
                console.error('Sign in error:', error);
                throw error;
            }
            
            console.log('Sign in successful:', data);
            return { data, error: null };
        } catch (error) {
            console.error('Sign in failed:', error);
            return { data: null, error };
        }
    }

    async signOut() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error };
        }
    }

    async getCurrentUser() {
        try {
            const { data: { user }, error } = await this.supabase.auth.getUser();
            if (error) throw error;
            return { user, error: null };
        } catch (error) {
            return { user: null, error };
        }
    }

    // User Profile Methods
    async createUserProfile(userId, userData) {
        try {
            const { data, error } = await this.supabase
                .from('users')
                .insert({
                    id: userId,
                    email: userData.email,
                    full_name: userData.full_name,
                    phone: userData.phone,
                    address: userData.address,
                    user_type: userData.user_type || 'customer'
                });
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async getUserProfile(userId) {
        try {
            console.log('Getting user profile for:', userId);
            const { data, error } = await this.supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();
            
            if (error) {
                console.error('Get user profile error:', error);
                throw error;
            }
            
            console.log('User profile data:', data);
            return { data, error: null };
        } catch (error) {
            console.error('Get user profile failed:', error);
            return { data: null, error };
        }
    }

    async updateUserProfile(userId, updates) {
        try {
            const { data, error } = await this.supabase
                .from('users')
                .update(updates)
                .eq('id', userId);
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    // Labour Profile Methods
    async createLabourProfile(userId, labourData) {
        try {
            const { data, error } = await this.supabase
                .from('labour_profiles')
                .insert({
                    user_id: userId,
                    skills: labourData.skills,
                    hourly_rate: labourData.hourly_rate,
                    experience_years: labourData.experience_years,
                    availability: labourData.availability
                });
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async getLabourProfiles() {
        try {
            const { data, error } = await this.supabase
                .from('labour_profiles')
                .select(`
                    *,
                    users (
                        id,
                        full_name,
                        email,
                        phone
                    )
                `);
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async getLabourProfile(userId) {
        try {
            const { data, error } = await this.supabase
                .from('labour_profiles')
                .select(`
                    *,
                    users (
                        id,
                        full_name,
                        email,
                        phone
                    )
                `)
                .eq('user_id', userId)
                .single();
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async updateLabourProfile(userId, updates) {
        try {
            const { data, error } = await this.supabase
                .from('labour_profiles')
                .update(updates)
                .eq('user_id', userId);
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    // Booking Methods
    async createBooking(bookingData) {
        try {
            const { data, error } = await this.supabase
                .from('bookings')
                .insert(bookingData)
                .select();
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async getBookings(userId, userType = 'customer') {
        try {
            let query = this.supabase
                .from('bookings')
                .select(`
                    *,
                    customer:users!bookings_customer_id_fkey (
                        id,
                        full_name,
                        email,
                        phone
                    ),
                    labour:users!bookings_labour_id_fkey (
                        id,
                        full_name,
                        email,
                        phone
                    )
                `);
            
            if (userType === 'customer') {
                query = query.eq('customer_id', userId);
            } else if (userType === 'labour') {
                query = query.eq('labour_id', userId);
            }
            
            const { data, error } = await query.order('created_at', { ascending: false });
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async updateBooking(bookingId, updates) {
        try {
            const { data, error } = await this.supabase
                .from('bookings')
                .update(updates)
                .eq('id', bookingId);
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async getAllBookings() {
        try {
            const { data, error } = await this.supabase
                .from('bookings')
                .select(`
                    *,
                    customer:users!bookings_customer_id_fkey (
                        id,
                        full_name,
                        email,
                        phone
                    ),
                    labour:users!bookings_labour_id_fkey (
                        id,
                        full_name,
                        email,
                        phone
                    )
                `)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    // Payment Methods
    async createPayment(paymentData) {
        try {
            const { data, error } = await this.supabase
                .from('payments')
                .insert(paymentData)
                .select();
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async getPayments(bookingId) {
        try {
            const { data, error } = await this.supabase
                .from('payments')
                .select('*')
                .eq('booking_id', bookingId);
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async updatePayment(paymentId, updates) {
        try {
            const { data, error } = await this.supabase
                .from('payments')
                .update(updates)
                .eq('id', paymentId);
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    // Review Methods
    async createReview(reviewData) {
        try {
            const { data, error } = await this.supabase
                .from('reviews')
                .insert(reviewData)
                .select();
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async getReviews(labourId) {
        try {
            const { data, error } = await this.supabase
                .from('reviews')
                .select(`
                    *,
                    reviewer:users!reviews_reviewer_id_fkey (
                        id,
                        full_name
                    )
                `)
                .eq('labour_id', labourId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    // Admin Methods
    async getAllUsers() {
        try {
            const { data, error } = await this.supabase
                .from('users')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    async deleteUser(userId) {
        try {
            const { error } = await this.supabase
                .from('users')
                .delete()
                .eq('id', userId);
            
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error };
        }
    }

    // Utility Methods
    async uploadFile(file, bucket = 'avatars') {
        try {
            const fileName = `${Date.now()}-${file.name}`;
            const { data, error } = await this.supabase.storage
                .from(bucket)
                .upload(fileName, file);
            
            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    getFileUrl(path, bucket = 'avatars') {
        const { data } = this.supabase.storage
            .from(bucket)
            .getPublicUrl(path);
        return data.publicUrl;
    }
}

// Initialize and export
window.SupabaseAPI = SupabaseAPI; 