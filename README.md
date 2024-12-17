# 🎧 AudioLibrary Front-End (FE)

## Introduction
**AudioLibrary_FE** is a React-based application for managing and listening to audio files. It allows users to:
- Upload audio files.
- Play and save progress of audio files.
- Resume playback seamlessly across multiple devices.

This app is designed for an immersive and personalized audio listening experience.

---

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Technologies Used](#technologies-used)
5. [Scripts](#scripts)
6. [Dependencies](#dependencies)
7. [Troubleshooting](#troubleshooting)
8. [Contributors](#contributors)
9. [License](#license)

---

## Features
- **Audio Upload**: Users can upload their own audio files.
- **Audio Playback**: Listen to uploaded audio directly within the app.
- **Progress Save**: Save the current playback position.
- **Cross-Device Playback**: Resume listening from where you left off, on any device.
- **User-Friendly UI**: Built with React and Bootstrap for a seamless experience.

---

## Installation

### Prerequisites  
Ensure the following are installed on your system:
- Node.js (v14+)
- npm (Node Package Manager)

### Steps to Install
1. Clone the repository:
   ```bash
   git clone https://github.com/ElBaldo1/audiolibrary_fe.git
   cd audiolibrary_fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the application at:
   ```bash
   http://localhost:3000
   ```

---

## Usage
1. **Upload Audio**: Drag and drop or use the upload button to add audio files.
2. **Listen**: Play uploaded audio using the integrated audio player.
3. **Save Progress**: The app automatically saves your listening position.
4. **Cross-Device Continuity**: Log in from another device and continue from where you left off.

---

## Technologies Used
- **React**: Front-end UI library.
- **React Router DOM**: Navigation.
- **React Redux**: State management.
- **React H5 Audio Player**: Custom audio player.
- **React Bootstrap**: UI components.
- **Axios**: API handling.
- **Sass**: CSS preprocessor for styling.
- **React Toastify**: Notifications.

---

## Scripts
To run specific tasks, use the following scripts:

| Command            | Description                          |
|--------------------|--------------------------------------|
| `npm start`        | Starts the development server.       |
| `npm run build`    | Builds the app for production.       |
| `npm test`         | Runs the test suite.                 |
| `npm run eject`    | Ejects create-react-app configuration.|

---

## Dependencies
Here are the main dependencies used in the project:
- **react**: ^18.2.0
- **react-router-dom**: ^6.3.0
- **react-redux**: ^8.0.2
- **react-h5-audio-player**: ^3.8.5
- **react-toastify**: ^9.0.8
- **axios**: ^0.27.2
- **bootstrap**: ^5.2.0
- **sass**: ^1.58.0

For the full list, check the [`package.json`](package.json) file.

---

## Troubleshooting
- **Port Conflict**: If the app fails to start, ensure no other app is running on port 3000.
- **Dependencies Error**: Run `npm install` to ensure all packages are correctly installed.
- **Backend Connection**: Ensure API endpoints are up and running.

---

## Contributors
- **Antonio Baldari** - Project Author

Feel free to fork the project, open issues, or submit pull requests.


  
