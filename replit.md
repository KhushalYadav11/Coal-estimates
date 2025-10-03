# Coal Assessment System - Volume & Weight Estimation

## Overview

A comprehensive web-based coal pile volume and weight estimation system designed for industrial inventory management. The application simulates photogrammetry workflows, enabling users to create projects, perform 3D measurements, calculate volumes using multiple methods, and generate detailed reports. Built to handle 50-60 daily measurements with support for various coal types and quality assessments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React** with TypeScript for type-safe component development
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** for server state management, caching, and data synchronization
- **Three.js** for 3D model visualization and interactive measurement tools

**UI Framework:**
- **shadcn/ui** component library with Radix UI primitives
- **Tailwind CSS** for styling with custom design system
- **Material Design** approach with Carbon Design influences for data-heavy enterprise applications
- Dark mode primary interface with light mode for reports and analytics

**Component Organization:**
- Pages in `client/src/pages/` (Dashboard, Projects, Measurement, Analytics, Reports)
- Reusable components in `client/src/components/`
- UI primitives in `client/src/components/ui/` (shadcn/ui components)
- Custom hooks in `client/src/hooks/`

**Design System:**
- Color palette optimized for dark mode coal assessment interface
- Typography: Inter for UI, JetBrains Mono for measurements and data
- Spacing based on Tailwind units (2, 4, 6, 8, 12, 16)
- Custom theme provider supporting light/dark mode switching

### Backend Architecture

**Server Framework:**
- **Express.js** REST API with TypeScript
- Middleware for JSON parsing, URL encoding, and request logging
- Custom error handling middleware
- Development-only Vite middleware integration for HMR

**Data Storage:**
- **In-memory storage** implementation (MemStorage class) for development
- Designed to be replaceable with database-backed storage (implements IStorage interface)
- Schema defined with **Drizzle ORM** for future PostgreSQL integration

**API Structure:**
- RESTful endpoints under `/api` prefix
- Projects CRUD: `GET/POST /api/projects`, `GET/PATCH/DELETE /api/projects/:id`
- Measurements: `GET/POST /api/measurements`, with project association
- Analytics: `/api/analytics/today`, `/api/analytics/overview`
- Calculation service: `/api/calculate` for volume/weight computations

**Validation:**
- **Zod** schemas for request validation
- Type-safe data models shared between client and server via `shared/schema.ts`
- Comprehensive error messages using zod-validation-error

### Data Models

**Projects:**
- ID, name, status (draft/processing/completed)
- Timestamps for creation and updates
- Associated measurements via foreign key relationship

**Measurements:**
- Dimensions: length, width, height with configurable units
- Coal type selection from predefined database
- Volume calculation method selection
- Calculated volume and weight results
- Quality assessment rating (excellent/good/fair/poor)
- Project association via foreign key with cascade delete

**Coal Types Database:**
- Anthracite (1.5 g/cm³)
- Bituminous Coal (1.3 g/cm³)
- Sub-bituminous Coal (1.2 g/cm³)
- Lignite (1.1 g/cm³)
- Coking Coal (1.35 g/cm³)
- Thermal Coal (1.25 g/cm³)

**Volume Calculation Methods:**
- Truncated Pyramid (90% accuracy)
- Ellipsoid Approximation (85% accuracy)
- Conical Approximation (80% accuracy)
- Rectangular with Fill Factor (75% accuracy)

### Key Features

**3D Visualization:**
- Interactive Three.js viewer for coal pile models
- Rotation, zoom, and pan controls
- Measurement mode with visual indicators
- Coordinate system display

**Measurement Workflow:**
- Scale calibration system
- Interactive dimension input
- Real-time volume and weight calculation
- Quality assessment integration

**Analytics & Reporting:**
- Daily measurement tracking
- Project statistics aggregation
- Coal type distribution analysis
- Quality metrics visualization
- Report generation with multiple templates and formats (PDF, CSV, Excel)

**Session Management:**
- Ready for session-based authentication (connect-pg-simple installed)
- Currently using in-memory storage without authentication

## External Dependencies

### Database & ORM
- **Drizzle ORM** (`drizzle-orm`, `drizzle-kit`, `drizzle-zod`) - Type-safe database schema and migrations
- **@neondatabase/serverless** - PostgreSQL driver for Neon Database (configured but not yet active)
- Schema configured for PostgreSQL dialect in `drizzle.config.ts`

### UI Component Libraries
- **Radix UI** primitives (accordion, dialog, dropdown, select, tabs, toast, etc.) - Accessible component foundations
- **shadcn/ui** configuration in `components.json` - Pre-built component system

### 3D Graphics
- **Three.js** (`three`, `@types/three`) - 3D rendering and visualization engine for coal pile models

### Form Handling & Validation
- **React Hook Form** with `@hookform/resolvers` - Form state management
- **Zod** - Runtime type validation and schema definition
- Integration via `drizzle-zod` for automatic schema generation

### Utilities
- **date-fns** - Date formatting and manipulation
- **clsx** and **tailwind-merge** - Conditional className utilities
- **class-variance-authority** - Type-safe variant API for components
- **cmdk** - Command palette component

### Development Tools
- **TypeScript** - Type safety across client and server
- **Vite plugins**: runtime error overlay, cartographer (Replit integration), dev banner
- **esbuild** - Server code bundling for production
- **tsx** - TypeScript execution for development server