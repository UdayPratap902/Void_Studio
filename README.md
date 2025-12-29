# VoidStudio - Futuristic Digital Agency Website

A modern, high-conversion, cinematic website built with Next.js, featuring heavy 3D animations, Lenis smooth scrolling, and Razorpay UPI-only payment integration.

## 🚀 Features

### Core Features
- **True Multi-Page Architecture** with Next.js App Router
- **Cinematic Black Theme** with premium visual design
- **Heavy 3D Animated Background** using Three.js and React Three Fiber
  - Large, visible 3D sphere with distortion effects
  - 1000 animated particles
  - Mouse-follow interaction (smooth, damped)
  - Scroll-reactive motion (parallax, depth, transforms)
  - Continuous idle animation
- **Global Lenis Smooth Scrolling** synced with Framer Motion
- **Razorpay UPI-Only Payment Integration** with server-side security
- **Glassmorphism UI** with backdrop blur effects
- **Responsive Design** across all devices

### Pages
1. **Home** (`/`) - Hero section, features showcase, CTA
2. **Services** (`/services`) - 6 comprehensive service offerings
3. **Pricing** (`/pricing`) - 3 tier pricing (₹30K, ₹60K, ₹130K)
4. **About** (`/about`) - Company story and values
5. **Contact** (`/contact`) - Contact form and information
6. **Blog** (`/blog`) - 6 blog posts with categories
7. **Payment Success** (`/payment/success`) - Post-payment success page
8. **Payment Failure** (`/payment/failure`) - Payment failure handling

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.3 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Smooth Scrolling**: Lenis (@studio-freight/lenis)
- **UI Components**: shadcn/ui (Radix UI)
- **Database**: MongoDB with Mongoose
- **Payment Gateway**: Razorpay (UPI-only, Test Mode)
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env

# Update .env with your credentials:
# - MONGO_URL
# - NEXT_PUBLIC_RAZORPAY_KEY_ID
# - RAZORPAY_KEY_SECRET
# - WEBHOOK_SECRET

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## 🔐 Environment Variables

```env
# MongoDB Configuration
MONGO_URL=mongodb://127.0.0.1:27017/voidstudio

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Razorpay Configuration (TEST MODE)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RwmRLhI9bBOPrG
RAZORPAY_KEY_SECRET=ty1FgiXl8Y1ZnuQA5omawhBy
WEBHOOK_SECRET=voidstudio_webhook_secret_test
```

## 💳 Payment Integration

### Razorpay UPI-Only Configuration

The payment system is configured to accept **ONLY UPI payments**:

1. **Order Creation** (`/api/orders/create`)
   - Server-side order creation
   - Generates unique receipt ID
   - Stores order in MongoDB
   - Returns Razorpay order ID

2. **Payment Verification** (`/api/orders/verify`)
   - Server-side signature verification
   - Validates payment authenticity
   - Updates order status to 'captured'

3. **Webhooks** (`/api/webhooks/razorpay`)
   - Handles `payment.captured` and `payment.failed` events
   - Idempotent processing
   - Automatic order status updates

### Test Credentials

For testing UPI payments in test mode:
- Success: `success@razorpay`
- Failure: `failure@razorpay`

### Webhook Setup

1. Go to Razorpay Dashboard > Settings > Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhooks/razorpay`
3. Select events: `payment.captured`, `payment.failed`
4. Set webhook secret (same as WEBHOOK_SECRET in .env)

## 🎨 Design System

### Color Palette
- **Background**: Pure black (#000000)
- **Primary Gradient**: Purple to Pink (#8B5CF6 → #EC4899)
- **Accent**: Red (#EF4444)
- **Text**: White (#FFFFFF) and Gray shades

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large scale (4xl-8xl)
- **Body**: Regular, readable sizes (base-xl)

### Components
- Glassmorphism cards with backdrop blur
- Gradient buttons with hover effects
- Animated hover states on all interactive elements
- Fixed navbar with scroll-aware styling
- Custom scrollbar with gradient thumb

## 📱 Pages Overview

### Home Page
- Hero section with large gradient heading
- "Welcome to the Future" badge
- Feature grid (4 services)
- CTA section with lightning icon

### Pricing Page
- Email input for payment
- 3 pricing tiers with feature lists
- "Most Popular" badge on Standard plan
- Direct UPI payment buttons
- All prices in INR (₹)

### Services Page
- 6 service cards with icons
- Feature lists for each service
- Hover animations
- Grid layout

### About Page
- Company story section
- 4 core values with icons
- Mission-driven messaging

### Contact Page
- Contact information cards
- Contact form with validation
- Email, phone, location details

### Blog Page
- 6 blog post cards
- Categories, date, read time
- Excerpt preview
- Hover effects with arrow icons

## 🔥 Performance Features

- **Optimized 3D Rendering**: 
  - Device pixel ratio capping [1, 2]
  - Reduced particle count for mobile
  - Efficient animation loops

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Next.js Image component ready
- **Smooth Scrolling**: Lenis with requestAnimationFrame
- **Hot Reload**: Fast Refresh enabled

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Environment Variables for Production
1. Update `NEXT_PUBLIC_BASE_URL` to your production domain
2. Use production Razorpay keys (rzp_live_xxx)
3. Update webhook URL in Razorpay dashboard
4. Use production MongoDB connection string

## 📝 API Routes

### POST /api/orders/create
Creates a new Razorpay order.

**Request Body:**
```json
{
  "amount": 30000,
  "email": "user@example.com",
  "userId": "user_123",
  "plan": "Starter",
  "description": "VoidStudio Starter Plan"
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "mongo_order_id",
  "razorpayOrderId": "order_xxx",
  "amount": 3000000,
  "currency": "INR"
}
```

### POST /api/orders/verify
Verifies payment signature.

**Request Body:**
```json
{
  "razorpayOrderId": "order_xxx",
  "razorpayPaymentId": "pay_xxx",
  "razorpaySignature": "signature_xxx",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "order": {
    "id": "order_id",
    "status": "captured",
    "amount": 30000,
    "plan": "Starter"
  }
}
```

### POST /api/webhooks/razorpay
Handles Razorpay webhooks.

**Headers:**
- `x-razorpay-signature`: Webhook signature
- `x-razorpay-event-id`: Event ID

**Events Handled:**
- `payment.captured`: Updates order status to captured
- `payment.failed`: Updates order status to failed

## 🎯 Key Implementation Details

### 3D Background
- Uses React Three Fiber for 3D rendering
- Animated sphere with MeshDistortMaterial
- 1000 particle field with random positions
- Mouse tracking with smooth interpolation
- Scroll-reactive scaling and positioning
- Idle rotation animation
- Gradient overlay for better text readability

### Lenis Smooth Scrolling
- Global provider at root level
- Configured with optimal lerp and duration
- No nested scroll containers
- Synced with Framer Motion scroll animations
- Respects prefers-reduced-motion

### Razorpay Security
- All secrets stored server-side only
- HMAC SHA256 signature verification
- Idempotent webhook processing
- Order validation before payment
- Status tracking in MongoDB

## 🐛 Troubleshooting

### Payment Issues
- Verify Razorpay credentials in .env
- Check webhook signature secret matches
- Ensure MongoDB is running
- Test with Razorpay test credentials

### 3D Performance Issues
- Reduce particle count in 3d-background.jsx
- Lower device pixel ratio
- Disable animations on low-end devices

### Smooth Scroll Not Working
- Ensure LenisProvider wraps all content
- Check for conflicting scroll handlers
- Verify no `overflow: hidden` on body

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 🤝 Credits

Built with ❤️ for VoidStudio

- Design: Cinematic futuristic theme
- Development: Next.js + React + Three.js
- Payment: Razorpay (UPI-only)
- Animations: Framer Motion + Lenis

---

**Need Help?** Contact: hello@voidstudio.com
**Live Demo:** [Your deployment URL]
