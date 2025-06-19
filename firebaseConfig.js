export const firebaseConfig = { <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA5CSbcR_DS601s5Ok_f-UOT_dobysD9eU",
    authDomain: "lb-1file.firebaseapp.com",
    databaseURL: "https://lb-1file-default-rtdb.firebaseio.com",
    projectId: "lb-1file",
    storageBucket: "lb-1file.firebasestorage.app",
    messagingSenderId: "828776232983",
    appId: "1:828776232983:web:a1e7b73bf46b1e5124c452",
    measurementId: "G-BTTQRHEFSJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>};
