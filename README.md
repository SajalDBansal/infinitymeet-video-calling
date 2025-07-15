![Alt text](https://res.cloudinary.com/drcbqssyo/image/upload/v1752502509/InfinityMeet_dkmv4r.png)

# InfinityMeet
## Video Conferencing Application using MediaSoup

A scalable, modern video conferencing application built with **Next.js** (frontend), **Node.js/Express** (backend), and **MediaSoup** (media server). This project demonstrates a full-stack architecture for real-time video, audio, and chat, leveraging open-source technologies.


## 🚀 Features

- **Real-time video & audio conferencing** (SFU via MediaSoup)
- **Room management**: Create, join, and leave rooms
- **WebSocket signaling**: Fast, reliable communication using socket.io
- **Screen sharing**: Share your screen with other participants
- **Mute/unmute controls**: Manage your audio/video streams
- **Grid layout for participants**: Responsive video grid for all users
- **Chat (optional)**: Real-time text chat in rooms
- **User authentication with NextAuth**: Secure login and session management
- **Password hashing with bcrypt**: Secure storage of user credentials
- **State management with Zustand**: Efficient and scalable client-side state
- **Scalable MediaSoup worker pool**: Efficient media routing
- **STUN/TURN support**: NAT traversal for reliable connectivity
- **Persistent room/user data (optional)**: MongoDB/PostgreSQL integration


## 🏗️ Architecture Overview

- **Frontend:** Next.js (React), Zustand for state management, NextAuth for authentication, WebRTC APIs, connects to backend via WebSocket.
- **Backend:** Node.js + Express, manages signaling, rooms, users, MediaSoup integration, and password hashing with bcrypt.
- **Media Layer:** MediaSoup server (SFU), handles media routing, transport, and worker management.
- **Database:** PostgreSQL or MongoDB for persistence.
- **Infrastructure:** Can be deployed on Vercel, AWS, or any cloud provider.


## 🖥️ Frontend

**Built with:**  
- [Turborepo](https://turbo.build/) for high-performance monorepo management

- [Next.js](https://nextjs.org/) (React framework)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) for real-time communication
- [WebRTC APIs](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) for media capture and transport


## 🛠️ Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Frontend      | Next.js, React, TypeScript, Tailwind CSS, Zustand, NextAuth.js |
| Backend       | Node.js, Express, socket.io, bcrypt |
| Media Server  | MediaSoup                         |
| Database      | PostgreSQL   |
| Signaling     | WebSocket (socket.io)             |
| Auth          | NextAuth.js, bcrypt               |
| Infra/Deploy  | Vercel, AWS, Docker (optional)    |
| STUN/TURN     | Google (in build)                 |

## 🚀 Getting Started

| Step                | Command                                                                 |
|---------------------|-------------------------------------------------------------------------|
| **Clone the repo**  | `git clone https://github.com/SajalDBansal/InfinityMeet.git`                   |
| **Install deps**    | `cd InfinityMeet && npm install`                                        |
| **Start frontend**  | `npm --filter @infinityMeet/frontend dev`                              |
| **Start backend**   | `npm --filter @infinityMeet/backend dev`                               |
| **Start all (dev)** | `npm run dev`                                                              |

> **Note:**  
> - Requires [npm](https://nnpm.io/)
> - Environment variables may be needed for local development (see `.env.example`).

## 📦 Project Structure
