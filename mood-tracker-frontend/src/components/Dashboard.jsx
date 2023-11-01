import React, { useContext, useState, useEffect } from "react";
import PatientDashboard from "./PatientDashboard";
import ProfessionalDashboard from "./ProfessionalDashboard";
import { AuthContext } from "../context/AuthContext";
import Ably from "ably";
import { AblyProvider } from "ably/react";

const Dashboard = () => {
  const { user, role, logout } = useContext(AuthContext);
  const ablyApiKey = import.meta.env.VITE_ABLY_API_KEY;

  const [ablyClient, setAblyClient] = useState(null);

  useEffect(() => {
    const client = new Ably.Realtime({
      key: ablyApiKey,
      clientId: user ? user.id.toString() : null,
    });

    setAblyClient(client);

    return () => {
      if (client) {
        client.close();
      }
    };
  }, [user]);

  return (
    <div>
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
