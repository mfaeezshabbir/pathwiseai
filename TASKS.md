# PathWise AI Development Tasks

This document outlines the necessary tasks for both backend and frontend developers to transition the application from a mock-up to a fully functional, data-driven platform.

## Backend Development Tasks (Connecting to a Database)

The current application uses static mock data on the frontend. The following tasks are required to build a persistent backend.

### 1. User Authentication & Database Setup
-   **[ ] Set up Firebase Authentication:** Implement sign-up, login, and session management for users.
-   **[ ] Set up a Database:** Configure Firestore or another database to store user and application data.

### 2. Data Modeling & Schemas
Define and implement the database schemas for the following collections:

-   **[ ] `users` collection:**
    -   `uid` (matches auth user ID)
    -   `name`: string
    -   `email`: string
    -   `avatarUrl`: string
    -   `rank`: string (e.g., 'Pro Learner')
    -   `stats`: object (`roadmapsStarted`, `modulesCompleted`)

-   **[ ] `roadmaps` collection:**
    -   `userId`: string (foreign key to `users`)
    -   `roadmapData`: object (the full JSON output from the AI)
    -   `progress`: object (to store the completion state of each resource, e.g., `{ "module-0-unit-0-resource-0": true }`)
    -   `createdAt`: timestamp

-   **[ ] `projects` collection:**
    -   `userId`: string
    -   `title`: string
    -   `description`: string
    -   `repoUrl`: string
    -   `techStack`: array of strings

-   **[ ] `achievements` collection:**
    -   `userId`: string
    -   `achievementId`: string (e.g., 'roadmap-conqueror')
    -   `earnedAt`: timestamp

-   **[ ] `activity` collection (for the timeline):**
    -   `userId`: string
    -   `date`: timestamp (e.g., `YYYY-MM-DD`)
    -   `completedUnits`: number (incremented daily)

### 3. API / Server-Side Logic
-   **[ ] User Profile API:** Create functions to read and update a user's profile information.
-   **[ ] Roadmap API:** Create functions to save a newly generated roadmap, retrieve all roadmaps for a user, and update the progress of a roadmap.
-   **[ ] Activity Tracking Logic:** Implement a mechanism (e.g., a Cloud Function or server action) that updates the `activity` log whenever a user completes a module or unit.
-   **[ ] Achievement Logic:** Create a system that checks for achievement conditions (e.g., on roadmap completion) and grants badges to the user.
-   **[ ] Project Management API:** Create functions to add, edit, and delete user projects.

---

## Frontend Development Tasks

### 1. Connecting to the Backend
-   **[ ] Integrate Authentication:** Create login and sign-up pages and integrate them with the Firebase Auth backend. Protect routes that require a logged-in user.
-   **[ ] Fetch Live Profile Data:** Replace the `userProfile` mock object in `src/app/profile/page.tsx` with live data fetched from the backend for the currently authenticated user.
-   **[ ] Implement Profile Updates:** Make the "Save Changes" button functional, allowing users to update their name and email.
-   **[ ] Implement Photo Upload:** Connect the "Change Photo" button to a service like Firebase Storage to allow users to upload a new avatar.
-   **[ ] Persist Roadmap Progress:** When a user checks a resource checkbox in `RoadmapDisplay`, call the backend to save the updated progress state.
-   **[ ] Dynamic "My Roadmaps" Section:** Fetch the user's saved roadmaps from the backend and make the "Continue" button navigate to the correct roadmap page.
-   **[ ] Add/Edit Projects:** Create a form or modal to allow users to add and edit their projects, which will then be saved to the backend.

### 2. Potential UI/UX Enhancements
-   **[ ] Add Loading Skeletons:** Display skeleton loaders on the profile page while waiting for data to be fetched from the backend to improve perceived performance.
-   **[ ] Error Handling:** Show user-friendly error messages (e.g., using Toasts) if backend requests fail.
-   **[ ] Empty States:** Design and implement "empty state" views for sections like "Projects Built" or "My Roadmaps" when a user has no content yet.
-   **[ ] Optimistic UI Updates:** For actions like checking a resource or saving a project, update the UI immediately before the backend call completes for a snappier user experience. Revert the change if the backend call fails.
-   **[ ] Editable Skills:** Allow users to add or remove skills from their profile.
