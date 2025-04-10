import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";

  import { createContext, useEffect, useState } from "react";
  
  import axios from "axios";
  import app from "../firebase/firebase.config.js";
  
  export const AuthContext = createContext(null);
  
  const auth = getAuth(app);
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const createUser = (email, password) => {
      setIsLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const signInUser = (email, password) => {
      setIsLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOutUser = () => {
      setIsLoading(true);
      return signOut(auth);
    };
  
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        const userInfo = { email: currentUser?.email };
        if (currentUser) {
          axios.post("/jwt", userInfo);
          .then(res=>{
            if(res.data.token){
              localStorage.setItem('access-token',res.data.token)
            }else{
              localStorage.removeItem('access-token')
            }
          })
        }
  
        setIsLoading(false);
      });
  
      return unSubscribe();
    }, []);
    const authInfo = { user, isLoading, createUser, signInUser, logOutUser };
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  