# Supabase Setup Guide for Labour Booking System

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `labour-booking-system`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

1. Go to Settings → API in your Supabase dashboard
2. Copy your:
   - Project URL
   - Anon (public) key
3. Update `supabase-config.js` with these values

## 3. Set Up Database Schema

1. Go to SQL Editor in your Supabase dashboard
2. Copy the contents of `database-schema.sql`
3. Run the SQL to create all tables and policies

## 4. Configure Authentication

1. Go to Authentication → Settings
2. Enable Email confirmations (optional)
3. Configure your site URL
4. Set up any additional providers (Google, GitHub, etc.) if needed

## 5. Set Up Storage (Optional)

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `avatars`
3. Set the bucket to public
4. Configure RLS policies for the bucket

## 6. Update Your HTML Files

Add these script tags to your HTML files before the closing `</body>` tag:

```html
<!-- Supabase Client -->
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>

<!-- Your Supabase Config -->
<script src="supabase-config.js"></script>

<!-- Your API Functions -->
<script src="supabase-api.js"></script>
```

## 7. Example Integration

Here's how to use the API in your HTML files:

```javascript
// Initialize the API
const api = new SupabaseAPI();

// User registration
async function registerUser() {
    const userData = {
        email: 'user@example.com',
        password: 'password123',
        full_name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St',
        user_type: 'customer'
    };
    
    const { data, error } = await api.signUp(userData.email, userData.password, userData);
    if (error) {
        console.error('Registration error:', error);
    } else {
        console.log('User registered:', data);
    }
}

// User login
async function loginUser() {
    const { data, error } = await api.signIn('user@example.com', 'password123');
    if (error) {
        console.error('Login error:', error);
    } else {
        console.log('User logged in:', data);
    }
}

// Create a booking
async function createBooking() {
    const bookingData = {
        customer_id: 'user-uuid',
        labour_id: 'labour-uuid',
        booking_date: '2024-01-15',
        start_time: '09:00',
        end_time: '17:00',
        total_hours: 8,
        total_amount: 200.00,
        description: 'House cleaning service',
        location: '123 Main St, City'
    };
    
    const { data, error } = await api.createBooking(bookingData);
    if (error) {
        console.error('Booking error:', error);
    } else {
        console.log('Booking created:', data);
    }
}
```

## 8. Environment Variables (Production)

For production, create a `.env` file:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 9. Security Best Practices

1. **Row Level Security (RLS)**: Already configured in the schema
2. **API Keys**: Never expose service role key in frontend
3. **Input Validation**: Always validate user inputs
4. **Error Handling**: Implement proper error handling
5. **Rate Limiting**: Consider implementing rate limiting

## 10. Testing Your Setup

1. Open your HTML files in a browser
2. Check browser console for any errors
3. Test user registration and login
4. Test booking creation
5. Verify data appears in Supabase dashboard

## 11. Common Issues

### CORS Errors
- Add your domain to Supabase Auth settings
- Configure allowed origins in your project settings

### RLS Policy Errors
- Check that policies are correctly applied
- Verify user authentication state

### Database Connection Issues
- Verify your Supabase URL and keys
- Check network connectivity

## 12. Next Steps

1. **Real-time Features**: Enable real-time subscriptions for live updates
2. **File Uploads**: Implement profile picture uploads
3. **Email Notifications**: Set up email triggers for booking confirmations
4. **Payment Integration**: Integrate with Stripe or other payment providers
5. **Mobile App**: Consider building a mobile app with React Native

## 13. Performance Optimization

1. **Indexing**: Add database indexes for frequently queried columns
2. **Caching**: Implement client-side caching for frequently accessed data
3. **Pagination**: Implement pagination for large datasets
4. **Lazy Loading**: Load data only when needed

## 14. Monitoring and Analytics

1. **Supabase Dashboard**: Monitor database performance
2. **Error Tracking**: Implement error tracking (Sentry, etc.)
3. **Analytics**: Track user behavior and booking patterns
4. **Logs**: Monitor application logs for issues

## 15. Deployment

1. **Static Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
2. **Custom Domain**: Configure your custom domain
3. **SSL Certificate**: Ensure HTTPS is enabled
4. **Environment Variables**: Set up production environment variables

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [Supabase Discord](https://discord.supabase.com) 