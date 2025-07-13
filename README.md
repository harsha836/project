# Labour Booking System with Supabase

A comprehensive web application for booking labour services, built with HTML, CSS, JavaScript, and powered by Supabase backend.

## 🚀 Features

- **Multi-User Authentication**: Customer, Labour, and Admin roles
- **Real-time Database**: PostgreSQL with Supabase
- **Secure Authentication**: Row Level Security (RLS) policies
- **Booking Management**: Create, view, and manage bookings
- **Payment Integration**: Track payment status
- **Review System**: Rate and review labour services
- **Responsive Design**: Works on all devices

## 📋 Prerequisites

- Supabase account (free tier available)
- Modern web browser
- Basic knowledge of HTML, CSS, JavaScript

## 🛠️ Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Enter project details:
   - Name: `labour-booking-system`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
5. Click "Create new project"

### 2. Configure Database

1. Go to SQL Editor in your Supabase dashboard
2. Copy the contents of `database-schema.sql`
3. Run the SQL to create all tables and policies

### 3. Get API Credentials

1. Go to Settings → API in your Supabase dashboard
2. Copy your Project URL and Anon (public) key
3. Update `supabase-config.js` with these values:

```javascript
const SUPABASE_URL = 'your_supabase_url'
const SUPABASE_ANON_KEY = 'your_supabase_anon_key'
```

### 4. Configure Authentication

1. Go to Authentication → Settings
2. Add your site URL to allowed origins
3. Configure email confirmations (optional)

### 5. Set Up Storage (Optional)

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `avatars`
3. Set the bucket to public

## 📁 File Structure

```
labour-booking-system/
├── index.html                 # Home page
├── login.html                 # Customer login
├── register.html              # Customer registration
├── labour-login.html          # Labour login
├── labour-register.html       # Labour registration
├── labour-dashboard.html      # Labour dashboard
├── labour-profile.html        # Labour profile
├── labour-bookings.html       # Labour bookings
├── admin-login.html           # Admin login
├── admin-dashboard.html       # Admin dashboard
├── admin-users.html           # Manage users
├── admin-labourers.html       # Manage labourers
├── admin-bookings.html        # Manage bookings
├── labourers.html             # Browse labourers
├── booking.html               # Create booking
├── bookings.html              # View bookings
├── payment.html               # Payment page
├── supabase-config.js         # Supabase configuration
├── supabase-api.js            # API functions
├── database-schema.sql        # Database schema
├── SUPABASE_SETUP.md          # Detailed setup guide
└── README.md                  # This file
```

## 🔧 API Functions

The `SupabaseAPI` class provides the following methods:

### Authentication
- `signUp(email, password, userData)` - Register new user
- `signIn(email, password)` - Login user
- `signOut()` - Logout user
- `getCurrentUser()` - Get current authenticated user

### User Management
- `createUserProfile(userId, userData)` - Create user profile
- `getUserProfile(userId)` - Get user profile
- `updateUserProfile(userId, updates)` - Update user profile

### Labour Management
- `createLabourProfile(userId, labourData)` - Create labour profile
- `getLabourProfiles()` - Get all labour profiles
- `getLabourProfile(userId)` - Get specific labour profile
- `updateLabourProfile(userId, updates)` - Update labour profile

### Booking Management
- `createBooking(bookingData)` - Create new booking
- `getBookings(userId, userType)` - Get user's bookings
- `updateBooking(bookingId, updates)` - Update booking
- `getAllBookings()` - Get all bookings (admin)

### Payment Management
- `createPayment(paymentData)` - Create payment record
- `getPayments(bookingId)` - Get payments for booking
- `updatePayment(paymentId, updates)` - Update payment

### Review System
- `createReview(reviewData)` - Create review
- `getReviews(labourId)` - Get reviews for labour

## 🎯 Usage Examples

### User Registration
```javascript
const api = new SupabaseAPI();

const userData = {
    email: 'user@example.com',
    password: 'password123',
    full_name: 'John Doe',
    phone: '+1234567890',
    address: '123 Main St',
    user_type: 'customer'
};

const { data, error } = await api.signUp(userData.email, userData.password, userData);
```

### Create Booking
```javascript
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
```

### Get Labour Profiles
```javascript
const { data, error } = await api.getLabourProfiles();
if (data) {
    data.forEach(labour => {
        console.log(`${labour.users.full_name} - ${labour.skills.join(', ')}`);
    });
}
```

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level security policies
- **Authentication**: Secure user authentication with Supabase Auth
- **Input Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback

## 🎨 Customization

### Styling
- All pages use custom CSS with modern design
- Responsive design for mobile and desktop
- Easy to customize colors and layout

### Functionality
- Modular JavaScript architecture
- Easy to extend with new features
- Well-documented API functions

## 🚀 Deployment

### Static Hosting
1. Deploy to Netlify, Vercel, or GitHub Pages
2. Configure environment variables
3. Update Supabase allowed origins

### Custom Domain
1. Configure your custom domain
2. Update Supabase site URL settings
3. Set up SSL certificate

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Add your domain to Supabase Auth settings
   - Check allowed origins configuration

2. **Authentication Errors**
   - Verify Supabase URL and keys
   - Check user email confirmation settings

3. **Database Errors**
   - Ensure schema is properly created
   - Check RLS policies are applied

4. **File Upload Issues**
   - Verify storage bucket exists
   - Check bucket permissions

## 📞 Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [Supabase Discord](https://discord.supabase.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Next Steps

1. **Real-time Features**: Enable real-time subscriptions
2. **Payment Integration**: Add Stripe or PayPal
3. **Mobile App**: Build with React Native
4. **Email Notifications**: Set up email triggers
5. **Analytics**: Add user behavior tracking

---

**Happy Coding! 🚀** 