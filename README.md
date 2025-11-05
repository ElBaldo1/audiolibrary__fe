# AudioLibrary Front-End

![Build](https://img.shields.io/badge/build-ready-success) ![License](https://img.shields.io/badge/license-MIT-blue) ![React](https://img.shields.io/badge/react-18.2.0-61dafb)

## Overview
AudioLibrary Front-End is a responsive React application that showcases a modern audio streaming experience. It enables uploading new tracks, playing curated content, and persisting listening progress so that users can resume from any device.

## Features
- Upload audio stories with descriptive metadata and immediate feedback.
- Browse a responsive, accessible catalog optimised for desktop and mobile.
- Resume playback from the exact second on any device thanks to synchronised progress storage.
- Keyboard shortcuts and ARIA enhancements for an inclusive user experience.
- Resilient offline-first behaviour with local caching and graceful API fallbacks.

## Architecture
The project is built with React 18 and TypeScript. State management is handled through Redux Toolkit with feature-focused slices. Remote communication is abstracted behind service modules (`src/services`) that coordinate REST requests and localStorage persistence. Playback progress is saved through `playbackService`, which writes to localStorage and synchronises with the configured backend API when reachable.

## Installation
```bash
npm install
```

## Usage
```bash
npm start
```
This launches the development server on `http://localhost:3000` with hot reloading enabled.

## Environment Variables
The application relies on the following environment variables:

| Variable | Description |
| --- | --- |
| `REACT_APP_API_BASE_URL` | Base URL for the AudioLibrary backend. When absent, the app falls back to local caching for uploads and catalog retrieval. |

Create a `.env` file at the project root to configure these variables before running or deploying the application.

## Scripts
| Command | Description |
| --- | --- |
| `npm start` | Starts the development server. |
| `npm run build` | Produces an optimised production build. |
| `npm test` | Runs the unit test suite with Jest and React Testing Library. |
| `npm run lint` | Lints the codebase using ESLint. |
| `npm run format` | Applies Prettier formatting to source and test files. |
| `npm run prettier:check` | Validates formatting without making changes. |

## Technologies
- React 18 with TypeScript
- Redux Toolkit for state orchestration
- React Bootstrap for layout and components
- React Toastify for upload and error feedback
- Axios for API communication
- Jest and React Testing Library for automated tests

## Deployment
The project is optimised for static hosting providers such as Netlify and Vercel.

### Netlify
1. Create a new site from Git and select this repository.
2. Set the build command to `npm run build` and the publish directory to `build`.
3. Add environment variables (e.g. `REACT_APP_API_BASE_URL`) under **Site settings → Build & deploy → Environment**.
4. Deploy the site. Netlify will automatically rebuild on subsequent pushes.

### Vercel
1. Import the repository from GitHub within the Vercel dashboard.
2. Choose **Create React App** as the framework preset.
3. Define the required environment variables in the project settings.
4. Trigger the initial deployment. Vercel will handle future builds automatically.

## License
This project is distributed under the MIT License. See [LICENSE](./LICENSE) for details.
