# The Bison Hub

A modern, interactive community forum platform designed specifically for Howard University students. Built with React, TypeScript, and Vite, featuring a beautiful dark theme with Howard's signature purple and blue colors.

## About

The Bison Hub is a community-driven platform where Howard University students can:
- Share posts and discussions across different categories
- React to posts with emojis
- Comment on posts and engage in conversations
- Search and filter content by category
- Create new posts with rich content

## Features

### Core Functionality
- **Post Creation**: Create engaging posts with titles and content
- **Category System**: Organize posts into relevant categories:
  - Academics
  - Dorms
  - Food Spots
  - Financial Aid
  - Campus Life

### User Experience
- **Modern UI**: Beautiful dark theme with gradient accents
- **Emoji Reactions**: Express yourself with emoji reactions on posts
- **Real-time Search**: Find posts quickly with instant search
- **Category Filtering**: Browse posts by specific categories
- **Responsive Design**: Works seamlessly on desktop and mobile

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Hooks**: Modern React patterns with useState and useEffect
- **Component Architecture**: Modular, reusable components
- **State Management**: Efficient local state management
- **Hot Module Replacement**: Fast development with Vite

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bison-hub-cornerstone-build
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── CategoryFilter.tsx
│   ├── CommentSection.tsx
│   ├── CreatePost.tsx
│   ├── EmojiReaction.tsx
│   ├── Header.tsx
│   ├── PostCard.tsx
│   └── SearchBar.tsx
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Page components
│   ├── Index.tsx        # Main forum page
│   └── NotFound.tsx     # 404 page
├── types/               # TypeScript type definitions
│   └── forum.ts         # Forum-related types
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Design System

### Color Palette
- **Primary**: Purple to Blue gradient (`from-purple-400 via-blue-400 to-indigo-400`)
- **Background**: Dark theme with black base (`bg-black`)
- **Text**: White and gray variants for hierarchy
- **Accents**: Howard University colors (purple, blue, indigo)

### Typography
- **Headings**: Bold, gradient text for impact
- **Body**: Clean, readable fonts with proper contrast
- **Emojis**: Strategic use of emojis for engagement

## Technologies Used

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components

### UI Components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Features in Detail

### Post Management
- Create posts with rich content
- Automatic timestamping
- Author attribution
- Category assignment

### Interaction System
- Emoji reactions with counts
- Nested comment system
- Real-time updates
- User engagement tracking

### Search & Discovery
- Full-text search across posts
- Category-based filtering
- Real-time filtering
- Empty state handling

## Future Enhancements

- User authentication and profiles
- Real-time notifications
- Image upload support
- Advanced moderation tools
- Mobile app development
- Integration with Howard University systems

## Contributing

We welcome contributions from the Howard University community! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Howard University

Built for the Howard University community. The Bison Hub represents our commitment to fostering connections, sharing knowledge, and building a stronger campus community.

---

**Made by Howard University Students**

*"Truth and Service" - Howard University Motto*