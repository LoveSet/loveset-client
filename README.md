# LoveSet Client

LoveSet is a web application that helps you discover your next favorite movie or show. Swipe right on titles you love, get personalized recommendations that match your unique taste.

## Features

- Google authentication
- Personalized movie/show recommendations
- Swiping interface (like/dislike)
- Watchlist management
- Premium subscription with Paddle
- Invite friends for more swipes
- Responsive design
- Terms of Service & Privacy Policy modals
- Email notifications (welcome, referral, subscription expired)

## Tech Stack

- React 19
- React Router DOM
- React Query
- Material UI & Styled Components
- Framer Motion (animations)
- React Toastify (notifications)
- Paddle (payments)
- Google OAuth
- Axios (API requests)

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (v8 or higher)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/loveset-client.git
   cd loveset-client
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` and fill in the required values (API endpoints, Paddle keys, Google OAuth client ID, etc).

4. **Start the development server:**
   ```sh
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

### Build for Production

```sh
npm run build
```

The production-ready files will be in the `build/` directory.

### Running Tests

```sh
npm test
```

## Project Structure

```
src/
  pages/           # Main app pages (home, onboarding, discover, etc)
  shared/          # Shared components, hooks, styles, config
  email/           # Transactional email templates
  assets/          # Fonts and images
  routes/          # Route definitions
  App.js           # Main app component
  index.js         # Entry point
public/
  index.html       # Main HTML template
  ...
```

## Environment Variables

- `REACT_APP_API_URL` - Backend API endpoint
- `REACT_APP_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `REACT_APP_PADDLE_VENDOR_ID` - Paddle vendor ID
- `REACT_APP_PADDLE_PUBLIC_KEY` - Paddle public key

## Deployment

- Build the app with `npm run build`.
- Deploy the contents of the `build/` directory to your preferred static hosting (Vercel, Netlify, AWS S3, etc).

## License

MIT

---

**LoveSet** &copy; 2025. All rights reserved.
