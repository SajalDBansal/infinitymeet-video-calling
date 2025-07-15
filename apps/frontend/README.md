# InfinityMeet Frontend

Welcome to the **InfinityMeet Frontend**! This is the client-side application for InfinityMeet, a modern, scalable video conferencing platform built with the latest web technologies.

---

## 🚀 Features

- **Real-time Video & Audio Conferencing** (powered by MediaSoup SFU)
- **Room Management**: Create, join, and leave meeting rooms
- **User Authentication**: Secure login and session management (NextAuth.js)
- **Screen Sharing**: Share your screen with other participants
- **Mute/Unmute & Camera Toggle**: Full control over your audio/video
- **Responsive Video Grid**: Dynamic layout for all participants
- **Participants List**: See who is in the meeting
- **Chat Panel**: Real-time text chat (optional)
- **State Management**: Efficient client-side state with Zustand
- **Error Handling**: User-friendly error messages and notifications

---

## 🛠️ Tech Stack & Languages Used

| Layer         | Technology / Language                        |
|---------------|----------------------------------------------|
| Framework     | Next.js (React)                              |
| Language      | TypeScript                                   |
| Styling       | Tailwind CSS                                 |
| State Mgmt    | Zustand                                      |
| Auth          | NextAuth.js                                  |
| Real-time     | WebSockets (socket.io)                       |
| Media         | WebRTC APIs                                  |

---

## 📥 Cloning and Running Locally

Follow these steps to clone and run the frontend on your local system:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SajalDBansal/InfinityMeet.git
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and fill in the required values.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser:**
   - Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Project Structure

- `actions/` - Reusable server actions
- `app/` - Next.js routes
- `components/` - Reusable React components
- `hooks/` - Zustand state management
- `libs/` - Custom libraries and utilities
- `providers/` - Context & Theme providers 

---

## 🤝 Contributing

Feel free to open issues or submit pull requests to help improve InfinityMeet!

---
