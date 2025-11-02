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

Google Search / Indexing (Search Console)

1) Verify your site in Google Search Console

   - Open https://search.google.com/search-console
   - Add a property for your public URL (example: `https://dezinecube.web.app` or your custom domain).
   - Choose a verification method (HTML file upload, HTML meta tag, or DNS record). The HTML meta tag option is simple:

     - In Search Console pick "HTML tag" and copy the meta tag it gives you (it looks like: `<meta name="google-site-verification" content="XYZ" />`).
     - Add that meta tag to the top of `frontend/index.html` inside the `<head>` and rebuild/deploy.

2) Submit a sitemap

   - After deployment, submit your sitemap URL in Search Console: e.g. `https://dezinecube.web.app/sitemap.xml` or `https://www.example.com/sitemap.xml`.
   - I added a minimal `frontend/public/sitemap.xml` which will be deployed to `/sitemap.xml`. Replace the `loc` URL inside the sitemap if your hosted URL differs from `https://dezinecube.web.app/`.

3) Robots

   - I added `frontend/public/robots.txt` that allows all crawlers and points to `/sitemap.xml`.
   - If you want to block specific paths, edit that file before deploying.

4) Tips to improve listing for the search term "dezine cube"

   - Use the brand name in the `<title>` and `<meta name="description">` (already added to `index.html`).
   - Create an "About" page with the exact phrase and include structured data (Organization/LocalBusiness) and your contact details.
   - Get a few backlinks (social profiles, directories, Google Business Profile). Backlinks and site authority greatly influence how soon you appear on search results.

5) After changes

   - Rebuild and deploy: `npm run deploy:firebase`
   - In Search Console use "URL Inspection" → "Request indexing" for your home page and important pages.

If you want, I can:
 - Insert the Google verification meta tag for you (paste the verification `content` value here and I'll add it to `index.html`).
 - Replace the sitemap/robots URLs with your exact public URL if you provide it.
 - Add a small script to generate a sitemap from your routes if you have many pages.
