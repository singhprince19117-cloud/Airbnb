# Airbnb Clone - Full-Stack Listings Marketplace

A comprehensive, full-stack web application designed to replicate the core mechanics of a property rental marketplace. Built on a Node.js and MongoDB architecture, this platform handles dynamic user authentication, media uploads, and complex data relationships between users, property listings, and reviews. 

## Live Demo & Repository

• **Live Application:** https://airbnb-major-project-oqia.onrender.com/listings
---

## Detailed Feature Set

### User Authentication & Authorization
• Implemented local strategy authentication using Passport.js.
• Secure password hashing and session management via express-session.
• Route protection ensuring that only authenticated users can create listings or leave reviews.
• Authorization middleware to verify that only the original author of a listing or review possesses edit and delete privileges.

### Core Marketplace Operations
• Browse a global index of property listings with location-based details.
• Filter properties dynamically based on specific categories (beaches, mountains, castles, etc.).
• View comprehensive details for individual properties, including high-resolution images, descriptions, pricing, and aggregated user reviews.

### Listing & Media Management (CRUD)
• Users can dynamically create, read, update, and delete their own property listings.
• End-to-end multi-part form data processing handled by Multer.
• Direct cloud integration with Cloudinary for scalable image hosting, optimization, and storage.

### Interactive Review Engine
• Authenticated users can leave text reviews accompanied by a star rating system.
• Reviews are strictly tied to specific listings and the user who authored them (One-to-Many data relationships).
• Secure deletion capabilities for review authors.

### UI/UX & State Management
• Flash messaging integration (connect-flash) to provide immediate, contextual feedback for user actions (e.g., successful login, error in form submission).
• Custom form validation states on the frontend to guide user input before server submission.
• Graceful handling of empty states (e.g., when a listing has no reviews) and error routing.

---

## Technical Stack & Libraries

### Backend Infrastructure
• **Node.js & Express.js:** Core server environment and web framework.
• **MongoDB & Mongoose:** NoSQL database and Object Data Modeling (ODM) library for strict schema definition.

### Frontend Rendering
• **EJS (Embedded JavaScript):** Server-side templating engine used to generate dynamic HTML.
• **Bootstrap:** Customized utility classes and components for a structured, minimalist interface.

### Middleware & Security
• **Passport.js:** Authentication middleware.
• **Express-Session:** Stateful session tracking.
• **Multer & Multer-Storage-Cloudinary:** Middleware for handling `multipart/form-data` and routing image files directly to cloud storage.
• **Joi:** Server-side schema description language and data validator for securing API payloads.

---