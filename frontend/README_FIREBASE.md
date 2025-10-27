Firebase Hosting — quick deploy guide

This project is a React + Vite single-page app. The built output goes into `frontend/dist`. The repository includes a `firebase.json` that points Hosting at `dist` and rewrites all routes to `index.html`.

Prepare and deploy (PowerShell commands for Windows):

1) Install Firebase CLI (if you don't have it):

   # Install as a global tool (optional)
   npm install -g firebase-tools

   # Or use npx (no global install required)
   # npx will download/run a recent firebase CLI for the command

2) Log in to Firebase:

   firebase login

3) (Optional) Create a Firebase project in the Firebase Console and note the project id.

4) Set your Firebase project for this repo (either edit `.firebaserc` or run):

   # Replace <PROJECT_ID> with your project id
   firebase use --add <PROJECT_ID>

   # or edit `.firebaserc` and replace <YOUR_FIREBASE_PROJECT_ID>

5) Build the frontend and deploy:

   npm install
   npm run deploy:firebase

Notes
- The `deploy:firebase` script runs `vite build` then uses `npx firebase deploy --only hosting` so you don't strictly need a global firebase-tools install.
- If you want to serve backend APIs (Flask) as well you'll need a different deployment target (Cloud Run, App Engine, or Cloud Functions) and configure CORS. Ask me and I can add a Cloud Run deployment flow for the Flask backend.

Troubleshooting
- If image URLs 404 after deploy, ensure the filenames were copied into `frontend/public/images` and normalized (no trailing spaces). You can run the copy script again: `npm run copy-drawing-plans`.
- If `firebase` CLI command not found and you prefer not to install globally, use `npx firebase` in commands.
