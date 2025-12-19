# Authenticated Todo App

A secure, modern Todo application built with React and Supabase. Users can sign up, log in, and manage their personal tasks with soft delete, filters, and clean UI feedback.

---

## Features

- Email-based authentication (Signup, Login, Logout)
- Protected routes (only logged-in users can access todos)
- Add, edit, and delete tasks
- Soft delete with restore option
- Permanent delete with confirmation
- Priority and status filters
- Search tasks by title
- Toast notifications for all major actions
- Responsive and clean UI

---

## Tech Stack

- Frontend: React (Vite)
- Styling: Tailwind CSS
- UI Components: ShadCN UI
- Routing: React Router
- Backend & Auth: Supabase
- Icons: Lucide React
- Deployment: Vercel

---

## Setup Instructions

1. Clone the repository  
   git clone <your-repo-url>  
   cd <project-folder>

2. Install dependencies  
   npm install

3. Create a Supabase project  
   - Enable Email authentication  
   - Create a `todos` table with user_id relation

4. Add environment variables  
   Create a `.env` file:
   VITE_SUPABASE_URL=your_supabase_url  
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key  

5. Run the app locally  
   npm run dev

6. Build for production  
   npm run build

---

## Database Schema (Todos)

- id (uuid)
- title (text)
- description (text)
- priority (low | medium | high)
- status (pending | completed)
- is_deleted (boolean)
- user_id (uuid)
- created_at (timestamp)

---

## Future Improvements

- Due dates and reminders
- Drag and drop task ordering
- Task categories / tags
- AI-powered task suggestions or chat to tasks
- Graphs for productivity tracking
- Theme

---

## AI Usage Note

AI was used to:
- Refine component structure and folder organization
- Improve UX decisions like soft delete flow and toasts
- Generate clean, readable code patterns
- Speed up debugging and edge-case handling

AI assisted development, but all design decisions were implemented manually.

---

## Author

Built by Subodh R Pataki
