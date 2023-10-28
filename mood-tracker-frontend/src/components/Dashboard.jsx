import React, { useContext, useState, useEffect } from "react";
import PatientDashboard from "./PatientDashboard";
import ProfessionalDashboard from "./ProfessionalDashboard";
import { AuthContext } from "../context/AuthContext";
import Ably from "ably";
import { AblyProvider } from "ably/react";

const Dashboard = () => {
  const { user, role, logout } = useContext(AuthContext);
  const ablyApiKey = import.meta.env.VITE_ABLY_API_KEY;
  console.log("doctor id: ", user.id);
  console.log("doctor role: ", role);

  const [ablyClient, setAblyClient] = useState(null);

  useEffect(() => {
    const client = new Ably.Realtime({
      key: ablyApiKey,
      clientId: user ? user.id.toString() : null,
    });
    console.log("client from dashboard: ", client);
    setAblyClient(client);

    return () => {
      if (client) {
        client.close();
      }
    };
  }, [user]);

  return (
    <div>
      {/* <h2>Dashboard for {role}</h2> */}
      {ablyClient && (
        <AblyProvider client={ablyClient}>
          {role === "Patient" && <PatientDashboard />}
          {role === "HealthCare Professional" && <ProfessionalDashboard />}
        </AblyProvider>
      )}
    </div>
  );
};

export default Dashboard;
