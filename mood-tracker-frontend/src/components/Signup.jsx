import React, { useRef, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const signupSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(3, "Enter atleast 8 characters").max(15),
  name: z.string().min(3, "Enter atleast 3 characters").max(50),
  phone: z
    .string()
    .min(10, "Contact number must be 10 digits")
    .refine(
      (phone) => {
        const contactNumber = Number(phone);
        return isFinite(contactNumber);
      },
      {
        message: "Phone number should be a valid number",
      }
    ),
  emergencyContactName: z.string().min(3, "Enter atleast 3 characters").max(50),
  emergencyContactPhone: z
    .string()
    .min(10, "Contact number must be 10 digits")
    .refine(
      (phone) => {
        const contactNumber = Number(phone);
        return isFinite(contactNumber);
      },
      {
        message: "Phone number should be a valid number",
      }
    ),
  healthCareCodeRef: z.string().min(5, "Enter 5 chars").max(5),
});

const Signup = ({ toggleForm }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const genderRef = useRef(null);
  const dobRef = useRef(null);
  const phoneRef = useRef(null);
  const emergencyContactNameRef = useRef(null);
  const emergencyContactPhoneRef = useRef(null);
  const emergencyContactRelationshipRef = useRef(null);
  const healthCareCodeRef = useRef(null);
  const professionalSpecializationRef = useRef(null);
  const [relationship, setRelationship] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErros] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    healthcareCode: "",
    professionalSpecialization: "",
  });

  const navigate = useNavigate();

  const serverBaseUrl =
    import.meta.env.VITE_SERVER_URI || "http://localhost:3000";

  const clearErrorMessage = (e) => {
    const { name, value } = e.target;

    setFormErros({ ...formErrors, [name]: "" });
  };

  const handleRelationshipChange = (e) => {
    setRelationship(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupData = {
      email: "",
      password: "",
      name: "",
      role: "",
      gender: "",
      dob: "",
      phone: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
      healthcareCode: "",
      professionalSpecialization: "",
    };
    signupData.email = emailRef.current.value;
    signupData.password = passwordRef.current.value;
    signupData.name = nameRef.current.value;
    signupData.role = role;
    signupData.gender = gender;
    signupData.dob = dobRef.current.value;
    signupData.phone = phoneRef.current.value;
    signupData.emergencyContactName = emergencyContactNameRef.current.value;
    signupData.emergencyContactPhone = emergencyContactPhoneRef.current.value;
    signupData.emergencyContactRelationship = relationship;
    signupData.healthcareCode = healthCareCodeRef.current.value;
    signupData.professionalSpecialization =
      professionalSpecializationRef.current.value;

    try {
      const validateFormData = signupSchema.parse(signupData);
      const URL = "http://localhost:3000" + "/user-profile/signup";
      console.log("url: ", URL);
      const response = await axios.post(URL, signupData);
      console.log("response signup: ", response);
      if (response.status === 201) {
        // setDataStored(true);
        console.log("signup complete ");
        navigate("/dashboard");
      } else {
        if (response.data.message === "Unique Constraint Error") {
          // setDataStored(false);
          setErrorMessage("Student Record already exists");
        } else {
          // setDataStored(false);
          setErrorMessage("Server Error");
        }
      }
    } catch (err) {
      console.log("Error while signup");
      // setFormErros(err.formErrors);

      if (err.errors) {
        const listOfErrors = {};
        for (let formFieldErr of err.errors) {
          if (formFieldErr.path) {
            listOfErrors[formFieldErr.path[0]] = formFieldErr.message;
          }
        }

        setFormErros({ ...listOfErrors });
        setErrorMessage("Check all the fields and enter valid input");
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="text"
            id="email"
            name="email"
            className=""
            placeholder="enter email address"
            onChange={clearErrorMessage}
            required
          />
          {formErrors?.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            className=""
            placeholder="enter password"
            onChange={clearErrorMessage}
            required
          />
          {formErrors?.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            name="name"
            className=""
            placeholder="enter name"
            onChange={clearErrorMessage}
            required
          />
          {formErrors?.name && (
            <p className="error-message">{formErrors.name}</p>
          )}
        </div>
        <div className="row">
          <div className="field-container">
            <label htmlFor="text">
              Role
              <select onChange={handleRoleChange} ref={roleRef} required>
                <option value="">Select Role *</option>
                <option value="Patient">Patient</option>
                <option value="Healthcare Professional">
                  Healthcare Professional
                </option>
              </select>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="field-container">
            <label htmlFor="text">
              Gender
              <select onChange={handleGenderChange} ref={genderRef} required>
                <option value="">Select Gender *</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
        </div>

        <div className="row">
          <div className="field-container">
            <label htmlFor="dob">Date Of Birth *</label>
            <input
              type="date"
              id="dob"
              ref={dobRef}
              className="form_text_input"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="field-container">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              ref={phoneRef}
              className="form_text_input"
              placeholder="phone number"
              onChange={clearErrorMessage}
              required
            />
            {formErrors?.phone && (
              <p className="error-message">{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password">emergencyContact Contact Name</label>
          <input
            ref={emergencyContactNameRef}
            type="text"
            id="emergencyContactName"
            name="emergencyContactName"
            className=""
            placeholder="emergencyContact contact name"
            onChange={clearErrorMessage}
            required
          />
          {formErrors?.emergencyContactName && (
            <p className="error-message">{formErrors.emergencyContactName}</p>
          )}
        </div>
        <div className="row">
          <div className="field-container">
            <label htmlFor="text">
              Emergency Contact Relationship
              <select
                onChange={handleRelationshipChange}
                ref={emergencyContactRelationshipRef}
                required
              >
                <option value="">Select Relationship *</option>
                <option value="Parent">Parent</option>
                <option value="Guardian">Guardian</option>
                <option value="Sibling">Sibling</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="field-container">
            <label htmlFor="contact">Emegency Contact Phone</label>
            <input
              type="text"
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              ref={emergencyContactPhoneRef}
              className="form_text_input"
              placeholder="emergencyContactPhone"
              onChange={clearErrorMessage}
              required
            />
            {formErrors?.emergencyContactPhone && (
              <p className="error-message">
                {formErrors.emergencyContactPhone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="healthcareCode">Healthcare Code</label>
            <input
              ref={healthCareCodeRef}
              type="text"
              id="healthcareCode"
              name="healthcareCode"
              className=""
              placeholder="healthcareCode"
              onChange={clearErrorMessage}
              required
            />
            {formErrors?.healthcareCode && (
              <p className="error-message">{formErrors.healthcareCode}</p>
            )}
          </div>
          <div>
            <label htmlFor="specialization">Specialization</label>
            <input
              ref={professionalSpecializationRef}
              type="text"
              id="professionalSpecialization"
              name="professionalSpecialization"
              className=""
              placeholder="Professional Specialization"
              onChange={clearErrorMessage}
              required
            />
            {formErrors?.professionalSpecialization && (
              <p className="error-message">
                {formErrors.professionalSpecialization}
              </p>
            )}
          </div>
        </div>
        <div className="">
          <div className="">
            <button type="submit">Signup</button>
          </div>
          <button onClick={toggleForm}>Toggle to Login</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
