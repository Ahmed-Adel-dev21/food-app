import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);

  const saveUserData = () => {
    const encodedToken = localStorage.getItem("token");
    
    // ✅ لازم تتأكد إن التوكن مش فاضي قبل الـ Decode
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        setLoginData(decodedToken);
      } catch (error) {
        // لو التوكن بايظ أو String مش JWT سليم
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // امسحه عشان ما يكررش الخطأ
        setLoginData(null);
      }
    }
  };

  useEffect(() => {
    // التحقق عند بداية التحميل (Refresh)
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, saveUserData }}>
      {props.children}
    </AuthContext.Provider>
  );
}