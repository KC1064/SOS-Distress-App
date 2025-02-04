// import { useEffect } from "react";
// import { useRouter } from "expo-router"; // or import { useNavigation } from '@react-navigation/native';
// import { auth } from "../config/firebase";
// // import { initDatabase } from "../utils/database";

// export default function Layout() {
//   const router = useRouter(); // Fix undefined router issue

//   useEffect(() => {
//     // Initialize database
//     // initDatabase();

//     // Set up auth state listener
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         router.replace("/home");
//       } else {
//         router.replace("/auth/signIn");
//       }
//     });

//     return unsubscribe;
//   }, []);

//   return null; // Ensure this component doesn't return an invalid JSX structure
// }

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
    </Stack>
  );
}