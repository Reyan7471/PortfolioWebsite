# Portfolio Website

## Overview

This is a personal portfolio website for Ansari Reyanahmad, an MCA student specializing in data analytics and web development. The application is a full-stack web application built with React frontend and Express.js backend, showcasing projects, skills, and providing contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the entire stack
- **API Design**: RESTful API endpoints for contact form submissions
- **Error Handling**: Centralized error middleware for consistent error responses
- **Request Logging**: Custom middleware for API request/response logging
- **Development**: Hot module replacement with Vite integration for seamless development

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for database migrations and schema evolution
- **Connection**: Neon Database serverless PostgreSQL for cloud-hosted database
- **Fallback Storage**: In-memory storage implementation for development/testing

### Authentication and Authorization
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **User Schema**: Basic user model with username/password fields
- **Password Security**: Prepared for hashed password storage (implementation pending)

### Build and Deployment
- **Frontend Build**: Vite builds optimized static assets to dist/public
- **Backend Build**: esbuild compiles TypeScript server code to dist/
- **Production**: Single deployment artifact serving both static files and API
- **Development**: Integrated development server with HMR and API proxying

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production database
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL adapter

### UI and Styling
- **Radix UI**: Headless component primitives for accessibility and behavior
- **shadcn/ui**: Pre-built component library with Tailwind CSS integration
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework with dark mode support

### Development Tools
- **Replit Integration**: Cartographer plugin for enhanced Replit development experience
- **Runtime Error Overlay**: Development error handling with user-friendly error modals
- **TypeScript**: Full-stack type safety with strict configuration

### Third-Party Services
- **Google Fonts**: Custom font loading for Architects Daughter, DM Sans, Fira Code, and Geist Mono
- **Unsplash**: Stock photography for project showcases and hero images
- **Email Integration**: Prepared infrastructure for contact form email notifications (service integration pending)

### State Management and Utilities
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation for forms and API data
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Utility for managing component variants and styling