import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LoginButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {auth.currentUser ? (
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
          {auth.currentUser?.displayName} | 로그아웃
        </button>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Google 로그인
        </button>
      )}
    </div>
  );
};

export default LoginButton;
