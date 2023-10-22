import React from "react";
import PatientDashboard from "./PatientDashboard";
import ProfessionalDashboard from "./ProfessionalDashboard";

const Dashboard = ({ role }) => {
  return (
    <div>
      <h2>Dashboard for {role}</h2>
      {role === "Patient" && <PatientDashboard />}
      {role === "HealthCare Professional" && <ProfessionalDashboard />}
    </div>
  );
};

export default Dashboard;
