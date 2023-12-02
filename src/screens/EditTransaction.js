import { collection, deleteDoc, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../database/firestore";
import { useLocation, useNavigate } from "react-router-dom";

function EditTransaction(){
    
    const location = useLocation();
    const history = useNavigate()
    if(auth.currentUser == null){
        history("/");
    }
    
    const [newFullname, setNewFullname] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [transaction, setTransaction] = useState({
        fullname: "",
        email: "",
        id: null,
    });

    const getTransaction = async (transactionId) => {
        if(transactionId != null || transactionId !== ""){
            const q = doc(db, "transactions", transactionId);
            const data = await getDoc(q);
            setTransaction({fullname: data.data().fullname, email: data.data().email, id: data.id})
            setNewEmail(data.data().email);
            setNewFullname(data.data().fullname);
            setDisabled(false);
        }
    }

    useEffect(() => {
        getTransaction(location.state.transactionId);
    }, []);

    const handleViewTransactions = () => {
        history('/home')
    }

    const updateTransaction = async () => {
        if(newFullname === "" || newEmail === ""){
            alert("Ingresa todos los datos bien papanatas");
        }else{
            setDisabled(true);
            const transactionDoc = doc(db, "transactions", transaction.id)
            await updateDoc(transactionDoc, { fullname: newFullname, email: newEmail });
            history("/home");
        }
    }

    const deleteTransaction = async () => {
        const transactionDoc = doc(db, "transactions", transaction.id)
        await deleteDoc(transactionDoc);
        history("/home");
    }

    
    return(
        <div style={{backgroundColor: "#0F1112", display: "flex", justifyContent: "center", width: "100vw", flexDirection: "column", alignItems: "center", height: "100vh"}}>
            <div style={{width: "100%", maxWidth: 420, display: "flex", justifyContent: "flex-start", flexDirection: "column", flex: 1}}>
            <h1 style={{color: "#EEF0FA"}}>Nueva Transaccion</h1>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: 4}}>
                <input placeholder={transaction.fullname} style={{padding: 10, outline: "none", border: "none", color: "#EEF0FA", backgroundColor: "#131517", borderRadius: 6}} onChange={(e) => setNewFullname(e.target.value)}/>
                <input placeholder={transaction.email} style={{padding: 10, outline: "none", border: "none", color: "#EEF0FA", backgroundColor: "#131517", borderRadius: 6}} onChange={(e) => setNewEmail(e.target.value)}/>
                <button disabled={disabled} style={{outline: "none", border: "none", backgroundColor: "#3AD8EF", borderRadius: 6, padding: 10, fontWeight: 600}} onClick={updateTransaction}>Actualizar</button>
                <button disabled={disabled} style={{outline: "none", border: "none", backgroundColor: "#F54A4A", borderRadius: 6, padding: 10, fontWeight: 600}} onClick={deleteTransaction}>Eliminar</button>
            </div>
            </div>

            <div style={{position: "fixed", width: "100%", maxWidth: 420, display: "flex", alignItems: "flex-end", flexDirection: "column", flex: 1, bottom: 24, right: 24}}>
                <button style={{width: 50, height: 50, outline: "none", border: "none", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 1000, backgroundColor: "#976CF6"}} onClick={handleViewTransactions}><img alt="home" style={{width: 24, height: 24}} src={require("../img/house.png")}/></button>
            </div>
        </div>
    )
}
export default EditTransaction;