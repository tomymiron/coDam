import React from 'react';
import {timeSince} from "../constants/timeAgo";
import { auth } from '../database/firestore';
import { useNavigate } from 'react-router-dom';

export default function Transaction({id, createdAt, email, fullname, tickets, seller}){
  const history = useNavigate();
    return (
      <div style={{ backgroundColor: "#131517", width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: 10, minHeight: 90, borderRadius: 6, marginBottom: 6 }} onClick={() => history("editTransaction", { state: { transactionId: id } })}>
        <p style={{ margin: 0, color: "#7d7d7d", fontWeight: 200, fontSize: 12, textAlign: "left"}} >hace {timeSince(createdAt)} </p>
        <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", flex: 1 }} >
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", }} >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 0, }} >
              <p style={{ margin: 0, color: "#EEF0FA", textAlign: "left", fontSize: 12 }}>
                <strong style={{color: seller == auth.currentUser.displayName ? "#3AD8EF" : "#EEF0FA"}}>{seller}</strong> acredito a <strong>{fullname}</strong>
              </p>
            </div>
              <p style={{ margin: 0, color: "#EEF0FA", textAlign: "left", fontSize: 12 }}>{email}</p>
              <p style={{ margin: 0, color: "#7d7d7d", textAlign: "left", fontSize: 9 }}>{tickets.map((ticket) => " [ " + ticket + " ] ")}</p>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center", display: "flex", }} >
            <div style={{ backgroundColor: "#3AD8EF", borderRadius: 6, padding: "10px 16px", }} >
              <p style={{ color: "#0F11112", fontSize: 16, fontWeight: 700, margin: 0, }} >${tickets.length * 1000}</p>
            </div>
          </div>
        </div>
      </div>
    );
}