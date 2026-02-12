# 3D Dashboard App

Live preview: https://dashboard-3d-topaz.vercel.app
3D demo model for testing uploads: https://drive.google.com/file/d/1NUwJqkgaUma-mD-YfkSHUiwZRa5dvra5/view?usp=sharing

A React-based 3D dashboard for managing objects and designers, built with **React Three Fiber**, **Zustand**, **Tailwind CSS**, and **TypeScript**. The app allows you to:

- Add, edit, and remove 3D objects (double click to add default Box or custom `.glb/.gltf` models from side menu)
- Assign designers to objects and set working hours
- Customize object properties like name, color, and size (default objects only)
- Interact with objects in a 3D scene using drag and camera controls
- Persist default objects between page reloads while handling custom objects separately (Limitation due to Zustand persist size, can be overcome with real API)
- Perform validation and manage form state using `react-hook-form` + `zod`
- Optimized for accessibility

---

## Prerequisites

- Node.js v20+
- pnpm v8+ (recommended)

## Getting Started

Run the commands below to get started:

```bash
git clone https://github.com/your-username/dashboard-3d.git
cd dashboard-3d
pnpm install
pnpm dev

