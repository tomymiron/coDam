import LoadingSpinner from "../components/LoadingSpinner";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Transaction from "../components/Transaction";
import React, { useEffect, useState } from "react";
import { auth, db } from "../database/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Home(){
    const history = useNavigate()

    const handleLogout = () =>{
        signOut(auth).then(val=>{
            console.log(val,"val")
            history('/')
        })
    }
    const handleAddTransaction = () => {
        history('/addTransaction')
    }

    const [transactionsList, setTransactionsList] = useState([]);
    useEffect(() => {
        const getTransactionsList = async () => {
            try{
                const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));
                const data = await getDocs(q);
                const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
                setTransactionsList(filteredData);
            }catch(err){
                console.log(err);
            }
        }
        getTransactionsList();
    })
    return(
        <div style={{backgroundColor: "#0F1112", display: "flex", justifyContent: "center", width: "100vw", flexDirection: "column", alignItems: "center", height: "100vh"}}>
            <div style={{width: "100%", maxWidth: 420, display: "flex", justifyContent: "flex-start", flexDirection: "column", flex: 1}}>
            <h1 style={{color: "#EEF0FA"}}>Home</h1>
            {transactionsList.length === 0 ? <LoadingSpinner /> : 
            (
                <div style={{width: "100%", maxWidth: 380, margin: "0 auto"}}>
                    {transactionsList.map((transaction) => <Transaction key={transaction.id} {...transaction}/>)}
                </div>
            )}
            </div>

            <div style={{position: "fixed", width: "100%", maxWidth: 420, display: "flex", alignItems: "flex-end", flexDirection: "column", flex: 1, top: 12, right: 12}}>
                <button style={{width: 50, height: 50, outline: "none", border: "none", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 1000, backgroundColor: "#976CF6"}} onClick={handleLogout}><img alt="logout" style={{width: 24, height: 24}} src={require("../img/close.png")}/></button>
            </div>
            <div style={{position: "fixed", width: "100%", maxWidth: 420, display: "flex", alignItems: "flex-end", flexDirection: "column", flex: 1, bottom: 24, right: 24}}>
                <button style={{width: 50, height: 50, outline: "none", border: "none", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 1000, backgroundColor: "#976CF6"}} onClick={handleAddTransaction}><img alt="newTransaction" style={{width: 24, height: 24}} src={require("../img/plus.png")}/></button>
            </div>
        </div>
    )
}
export default Home;