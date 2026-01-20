# GGSSC-Frontend

Make sure you have these installed:

Node.js (LTS version recommended)

Git

Ionic CLI:

bash
Copy
Edit
npm install -g @ionic/cli
Java JDK 17+

Android Studio (includes Android SDK, AVDs)

Gradle (comes with Android Studio)

Optional: VS Code (or your favorite editor)

🚀 Steps to Build an Android App with Ionic + Angular
1. Create a New Ionic Angular Project
bash
Copy
Edit
ionic start myApp blank --type=angular
cd myApp
You can also choose tabs, sidemenu, etc., instead of blank.

2. Serve the App in Browser (for Development)
bash
Copy
Edit
ionic serve
3. Add Android Platform
bash
Copy
Edit
ionic capacitor add android
This creates the android/ folder and prepares the native Android project using Capacitor.

4. Build the Web Assets
bash
Copy
Edit
ionic build
This builds your Angular app into www/ folder.

5. Copy Web Assets to Android Platform
bash
Copy
Edit
ionic cap copy android
If you make changes to your Angular app, repeat ionic build and then ionic cap copy android.

6. Open Android Project in Android Studio
bash
Copy
Edit
ionic cap open android
This opens the native project in Android Studio where you can:

Build APK or AAB

Run on Emulator or Physical Device

Edit native code (if needed)

7. Run on Device or Emulator
From Android Studio:

Click Run > Run 'app'

Choose a connected device or virtual emulator

8. Generate APK for Android
In Android Studio:

Click Build > Build Bundle(s) / APK(s) > Build APK(s)

Find the APK in: android/app/build/outputs/apk/debug/app-debug.apk

📦 Production Build & Signing (Optional)
For production:

bash
Copy
Edit
ionic build --prod
ionic cap copy android
You’ll need to sign the app with a keystore before publishing on the Play Store.