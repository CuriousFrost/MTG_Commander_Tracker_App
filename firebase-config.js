// Firebase Configuration for Seasons Past
export const firebaseConfig = {
    apiKey: "AIzaSyBLQs0Ixhx1e64nRZABRkl3R3KyQnsJ6WA",
    authDomain: "mtg-commander-game-track-65843.firebaseapp.com",
    projectId: "mtg-commander-game-track-65843",
    storageBucket: "mtg-commander-game-track-65843.firebasestorage.app",
    messagingSenderId: "195800505678",
    appId: "1:195800505678:web:bc5fce3f7322b51383d21f"
};

// Auto-enables when apiKey is set
export const FIREBASE_ENABLED = firebaseConfig.apiKey !== "" && firebaseConfig.apiKey !== "YOUR_API_KEY";
