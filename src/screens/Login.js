import { googleProvider, auth } from "../database/firestore";
import { onAuthStateChanged, signInWithPopup, } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function Login() {

  const history = useNavigate();
  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
    .then((data) => { console.log(data, "authData"); history("/home"); })
    .catch((err) => { alert(err.code); });
  };

  onAuthStateChanged(auth, async (user) => {
    if(user != null){
      history("/home");
    }
  })

  return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", backgroundColor: "#0F1112", width: "100vw", height: "100vh"}}>
        <h1 style={{color: "#EEF0FA", textAlign: "center", fontSize: 32}}>Bienvenido al sistema de CoDAM</h1>
        <button style={{outline: "none", border: "none", backgroundColor: "#3AD8EF", borderRadius: 6, padding: 10, fontWeight: 600}} onClick={handleLogin}>Ingresar con Google</button>
        <p style={{position: "absolute", bottom: 0, right: 10, color: "#EEF0FA", fontSize: 12}}>by Tomy</p>
    </div>
  );
}
export default Login;