import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTransaction from "./screens/AddTransaction";
import EditTransaction from "./screens/EditTransaction";
import Login from "./screens/Login";
import Home from "./screens/Home"; 
import React from "react";

function App(){
    return(
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/addTransaction" element={<AddTransaction/>} />
                    <Route path="/home/editTransaction" element={<EditTransaction/>} />
                    <Route path="/" element={<Login/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default App;