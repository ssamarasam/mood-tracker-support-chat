import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Date of Birth: {user.dob}</p>
      <p>Phone: {user.phone}</p>
      <p>Emergency Contact Name: {user.emergencyContactName}</p>
      <p>Emergency Contact Phone: {user.emergencyContactPhone}</p>
      <p>Emergency Contact Relationship: {user.emergencyContactRelationship}</p>
      <p>Healthcare Code: {user.healthcareCode}</p>
      <p>Professional Specialization: {user.professionalSpecialization}</p>
    </div>
  );
};

export default Profile;
