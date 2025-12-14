# Sweet Shop Management System - Frontend

A modern, fully-functional React TypeScript application implementing a TDD (Test-Driven Development) approach for a complete e-commerce platform focused on sweet products.

## 📋 Overview

This is a complete **Test-Driven Development (TDD) Kata** implementation showing best practices in:
- **Clean Code**: SOLID principles, readable, maintainable code with detailed comments
- **Modern Stack**: React 18, TypeScript, Vite, Tailwind CSS, React Router
- **Best Practices**: Component-based architecture, context API, protected routes, form validation
- **User Experience**: Responsive design, authentication system, real-time search, admin dashboard

## 🎯 Features

### User Features
- ✅ User registration and login with JWT authentication
- ✅ Browse and search sweet products
- ✅ View product details (price, quantity, description)
- ✅ Stock status indicators (in stock, low stock, out of stock)
- ✅ Purchase functionality with inventory checks
- ✅ Protected dashboard for authenticated users
- ✅ Real-time search and filtering

### Admin Features 
- ✅ Admin-only dashboard with system statistics
- ✅ Create, read, update, delete sweet products
- ✅ Inventory management (purchase/restock)
- ✅ Access control and role-based permissions
- ✅ User management capabilities

Note: Use these details for admin login
-  Email: eswar@sweetshop.com
-  Password: admin123

### Technical Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Form validation and error handling
- ✅ State management with React Context
- ✅ API integration with axios
- ✅ Protected routes and authentication guards
- ✅ Clean component architecture
- ✅ Comprehensive inline documentation

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── apiClient.ts          # Axios HTTP client configuration
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx      # User login form component
│   │   │   └── RegisterForm.tsx   # User registration form component
│   │   ├── Layout/
│   │   │   ├── Layout.tsx         # Main layout wrapper
│   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   └── Footer.tsx         # Footer component
│   │   └── Sweets/
│   │       ├── SweetCard.tsx      # Individual sweet product card
│   │       ├── SweetForm.tsx      # Admin form to create/edit sweets
│   │       ├── SweetList.tsx      # Grid display of sweet products
│   │       └── SweetSearch.tsx    # Search and filter component
│   ├── context/
│   │   └── AuthContext.tsx        # Global authentication state management
│   ├── pages/
│   │   ├── AdminPage.tsx          # Admin dashboard page
│   │   ├── DashboardPage.tsx      # User dashboard page
│   │   ├── HomePage.tsx           # Landing page
│   │   └── NotFoundPage.tsx       # 404 error page
│   ├── routes/
│   │   └── ProtectedRoute.tsx     # Route guard for authenticated pages
│   ├── App.tsx                    # Main app component with routing
│   ├── App.css                    # Global styles
│   ├── index.css                  # Base styles
│   └── main.tsx                   # Application entry point
│
├── index.html                     # HTML template
├── package.json                   # NPM dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.node.json             # TypeScript config for build tools
├── vite.config.ts                 # Vite build configuration
├── .env.example                   # Environment variables template
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your API endpoint if different from default.

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

## 📚 Code Documentation

Every file includes comprehensive comments explaining:
- **Purpose**: What the component/function does
- **State Management**: How data flows through the component
- **Key Functions**: What each function does and how it works
- **Dependencies**: What external libraries or context it uses
- **Example Usage**: How to use the component (props, expected behavior)

This makes the code understandable to anyone, regardless of technical background.

## 🔐 Authentication Flow

1. User registers or logs in with email and password
2. Backend validates credentials and returns JWT token
3. Token is stored in browser localStorage
4. Token is sent with every API request in Authorization header
5. Protected routes check if user is authenticated
6. Admin routes additionally verify user has admin role

## 🛣️ Routing Structure

- `/` - Home page (public)
- `/register` - User registration (public)
- `/login` - User login (public)
- `/dashboard` - User dashboard (protected)
- `/admin` - Admin panel (protected + admin only)
- `/*` - 404 Not Found page

## 🎨 Design System

### Colors
- **Primary**: Purple-600 (#8b5cf6) - Main actions
- **Success**: Green-600 (#16a34a) - Success messages
- **Warning**: Orange-600 (#ea580c) - Low stock indicator
- **Danger**: Red-600 (#dc2626) - Out of stock
- **Background**: Gradient purple to pink

### Component Styling
All components use Tailwind CSS for:
- Responsive design
- Consistent spacing
- Accessible color contrasts
- Smooth transitions and animations

## 📋 My AI Usage

### What AI Assistance Was Used For

**AI Co-Author: Comet (Perplexity)**

#### Areas Where AI Provided Significant Help:
1. **Code Generation and Structure**
   - Generated complete component templates following React best practices
   - Created TypeScript interfaces and type definitions
   - Structured folder organization and file naming conventions
   - Generated boilerplate configuration files (tsconfig, vite.config, etc.)

2. **Documentation and Comments**
   - Added comprehensive JSDoc comments to all functions
   - Wrote detailed inline comments explaining logic and purpose
   - Created clear README sections with examples
   - Generated API documentation

3. **Best Practices Implementation**
   - Suggested proper error handling patterns
   - Recommended SOLID principles applications
   - Proposed component composition patterns
   - Suggested proper form validation approaches

4. **Styling and UI**
   - Recommended Tailwind CSS utility classes
   - Suggested responsive design patterns
   - Provided color scheme recommendations
   - Suggested accessibility improvements (aria labels, semantic HTML)

#### Areas Requiring Human Decision Making:
1. **Architecture Decisions**
   - Chose React Context over Redux (simpler for this project size)
   - Decided on Vite over Create React App (faster builds)
   - Selected Tailwind CSS over other CSS frameworks

2. **Feature Prioritization**
   - Determined which features to implement first
   - Prioritized user experience elements
   - Balanced feature completeness with time constraints

3. **Code Review and Refinement**
   - Reviewed AI-generated code for correctness
   - Adjusted suggestions to match specific requirements
   - Tested functionality manually
   - Iterated on components based on testing results

#### Overall Impact
AI assistance accelerated development by approximately 40-50% by:
- Reducing boilerplate code writing time
- Suggesting best practice patterns immediately
- Generating documentation templates
- Providing code structure recommendations

However, critical decisions about architecture, feature selection, and final code review remained entirely human-driven to ensure code quality and alignment with requirements.

## 🧪 Testing

The project follows Test-Driven Development principles:
- Write tests first (Red phase)
- Implement code to pass tests (Green phase)
- Refactor for clarity and performance (Refactor phase)

## 📦 Dependencies

### Production Dependencies
- **React** (^18.2.0) - UI library
- **React Router DOM** (^6.20.0) - Client-side routing
- **Axios** (^1.6.0) - HTTP client
- **Tailwind CSS** (^3.4.0) - Utility-first CSS framework

### Development Dependencies
- **TypeScript** (^5.3.0) - Static typing
- **Vite** (^5.0.0) - Build tool and dev server
- **@vitejs/plugin-react** - React support in Vite
- **PostCSS & Autoprefixer** - CSS processing

## 🚀 Deployment

### Prerequisites
- Production API endpoint
- Hosting platform (Netlify, Vercel, GitHub Pages, etc.)

### Deploy to Netlify

```bash
# Build the project
npm run build

# Output is in the 'dist' folder
# Connect your repository to Netlify for automatic deployments
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Production

Update `.env` with production values:
```
VITE_API_URL=https://api.production-domain.com
VITE_ENV=production
```

## 📖 Screenshots

### Home Page
- Hero section with CTA buttons
- Feature highlights
- Information about the platform

### Login/Register Pages
- Clean form design
- Input validation with error messages
- Links between login and register pages

### User Dashboard
- Welcome message with user information
- Search functionality
- Grid of sweet products
- Product cards with purchase buttons

### Admin Dashboard
- Create/edit sweet form
- Product management list
- System statistics (sales, users, products)
- Admin-only controls

## 🤝 Contributing

This is a TDD Kata project. To extend it:
1. Write tests for new features first
2. Implement the feature
3. Refactor for clarity
4. Update documentation

#Sample images
<img width="1918" height="941" alt="image" src="https://github.com/user-attachments/assets/61595207-f6d7-4c36-b766-4c8e725faa0e" />
<img width="1889" height="936" alt="image" src="https://github.com/user-attachments/assets/340be1a2-1dea-4781-bb8b-7d4b17084a18" />
<img width="1919" height="940" alt="image" src="https://github.com/user-attachments/assets/538ad7bb-6faa-46de-bffc-5d733ad56226" />
<img width="1919" height="941" alt="image" src="https://github.com/user-attachments/assets/f4ebb64a-6939-4236-a45c-f1b385a9d48c" />
<img width="1902" height="940" alt="image" src="https://github.com/user-attachments/assets/69d33880-1384-4be4-bc92-8201c6075f46" />
<img width="1919" height="936" alt="image" src="https://github.com/user-attachments/assets/e3c27b1d-b683-4072-8d0d-7834311b38bf" />
<img width="1918" height="937" alt="image" src="https://github.com/user-attachments/assets/f460816b-8092-4393-b877-c7f708eaf928" />


**Last Updated**: December 2025
**Version**: 1.0.0
