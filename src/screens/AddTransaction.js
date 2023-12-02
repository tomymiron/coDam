import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../database/firestore";
import { useNavigate } from "react-router-dom";

function AddTransaction(){
    
    const history = useNavigate()
    if(auth.currentUser == null){
        history("/");
    }

    const [newFullname, setNewFullname] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAmount, setNewAmount] = useState(0);
    const [lastTicket, setLastTicket] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const handleViewTransactions = () => {
        history('/home')
    }

    const transactionsCollectionRef = collection(db, "transactions");
    useEffect(() => {
        const newTransaction = async () => {
            if(lastTicket != null && lastTicket.length > 0){
                let newTickets = [];
                for(let i = 0; i < newAmount; i++){
                    newTickets.push(lastTicket[lastTicket.length - 1] + i + 1);
                }
                console.log(newTickets)
                await addDoc(transactionsCollectionRef, { fullname: newFullname, email: newEmail, seller: auth?.currentUser?.displayName, tickets: newTickets, createdAt: new Date() });
                history("/home");
            }
        }
        newTransaction();
    }, [lastTicket]);

    const submitTransaction = async () => {
        if(newFullname === "" || newEmail === "" || newAmount == null || newAmount <= 0){
            alert("Ingresa todos los datos bien papanatas");
        }else{
            setDisabled(true);
            const getLastTransaction = async () => {
                try{
                    const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"), limit(1));
                    const data = await getDocs(q);
                    const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
                    setLastTicket(filteredData[0] === undefined ? [0] : filteredData[0].tickets);
                }catch(err){
                    console.log(err);
                }
            }
            getLastTransaction();
        }
    }

    
    return(
        <div style={{backgroundColor: "#0F1112", display: "flex", justifyContent: "center", width: "100vw", flexDirection: "column", alignItems: "center", height: "100vh"}}>
            <div style={{width: "100%", maxWidth: 420, display: "flex", justifyContent: "flex-start", flexDirection: "column", flex: 1}}>
            <h1 style={{color: "#EEF0FA"}}>Nueva Transaccion</h1>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: 4}}>
                <input placeholder="Nombre del comprador" style={{padding: 10, outline: "none", border: "none", color: "#EEF0FA", backgroundColor: "#131517", borderRadius: 6}} onChange={(e) => setNewFullname(e.target.value)}/>
                <input placeholder="Email del comprador" style={{padding: 10, outline: "none", border: "none", color: "#EEF0FA", backgroundColor: "#131517", borderRadius: 6}} onChange={(e) => setNewEmail(e.target.value)}/>
                <input placeholder="Cantidad de Rifas" style={{padding: 10, outline: "none", border: "none", color: "#EEF0FA", backgroundColor: "#131517", borderRadius: 6}} onChange={(e) => setNewAmount(e.target.value)} type="number"/>
                <button disabled={disabled} style={{outline: "none", border: "none", backgroundColor: "#3AD8EF", borderRadius: 6, padding: 10, fontWeight: 600}} onClick={submitTransaction}>Crear</button>
            </div>
            </div>
                

            <div style={{position: "fixed", width: "100%", maxWidth: 420, display: "flex", alignItems: "flex-end", flexDirection: "column", flex: 1, bottom: 24, right: 24}}>
                <button style={{width: 50, height: 50, outline: "none", border: "none", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 1000, backgroundColor: "#976CF6"}} onClick={handleViewTransactions}><img alt="home" style={{width: 24, height: 24}} src={require("../img/house.png")}/></button>
            </div>
        </div>
    )
}
export default AddTransaction;