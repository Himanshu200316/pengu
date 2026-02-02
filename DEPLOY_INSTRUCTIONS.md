# Deploying to Google Cloud Run (Web Console)

I have compressed your website files into `pengu_website.zip` on your Desktop. Follow these steps to deploy it.

## Step 1: Prepare Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. **Enable Billing** for the project (required for Cloud Run, but they have a generous free tier).
4. In the search bar, type "Cloud Run Admin API" and enable it.

## Step 2: Deploy from Source
1. Navigate to **Cloud Run** in the side menu.
2. Click **DEPLOY CONTAINER** > **Service**.
3. In the **Service settings**:
   - **Service name**: `pengu-website` (or any name you like).
   - **Region**: Choose one close to you (e.g., `us-central1`).
4. Under **Source repository**, select **Test with a sample container** first (we will switch this, but the UI sometimes forces a flow).
   - *Actually, the easiest way for a zip upload is via Cloud Shell or Build, but let's use the simplest direct upload flow if available, otherwise we use Cloud Shell.*

### 🚀 Easiest Method: Using Cloud Shell (Directly in Browser)
Since direct zip upload to Cloud Run isn't a simple button, we will use the **Cloud Shell** at the bottom of the browser window.

1. Click the **Activate Cloud Shell** icon (>_) at the top right of the Google Cloud/Console toolbar.
2. Wait for the terminal to provision.
3. **Upload the Zip**:
   - Click the "Three dots" menu icon in the Cloud Shell toolbar > **Upload**.
   - Select `pengu_website.zip` from your Desktop.
   - Wait for the upload to finish.

4. **Unzip and Deploy**:
   Copy and paste these commands into the Cloud Shell terminal:

   ```bash
   # Unzip the files
   unzip pengu_website.zip -d pengu_site
   cd pengu_site

   # Deploy to Cloud Run (follow the prompts)
   gcloud run deploy pengu-website --source .
   ```

5. **Answer the Prompts**:
   - **Source code location**: Press Enter (default is current directory).
   - **Region**: Select a number (e.g., for `us-central1`).
   - **Allow unauthenticated invocations?**: Type `y` (This makes your site public).

## Step 3: View Your Site
Once the command finishes, it will give you a **Service URL** (ending in `.run.app`). Click that link to see your live website!
