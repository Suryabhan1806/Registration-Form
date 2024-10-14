import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    const nameRegex = /^[A-Za-z]+$/; // Only allows alphabetic characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; 
    // At least one letter, one number, one special character, and at least 8 characters long

    // Capitalize the first and last names
    const capitalizedFirstname = capitalizeFirstLetter(formData.firstname.trim());
    const capitalizedLastname = capitalizeFirstLetter(formData.lastname.trim());

    // Validate first name
    if (!capitalizedFirstname) {
      validationErrors.firstname = "First name is required";
    } else if (!nameRegex.test(capitalizedFirstname)) {
      validationErrors.firstname = "First name should contain only letters";
    }

    // Validate last name
    if (!capitalizedLastname) {
      validationErrors.lastname = "Last name is required";
    } else if (!nameRegex.test(capitalizedLastname)) {
      validationErrors.lastname = "Last name should contain only letters";
    }

    // Validate email
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    // Validate password
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      validationErrors.password =
        "Password must contain at least 8 characters, one letter, one number, and one special character";
    }

    // Validate confirm password
    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Update formData with capitalized names before submitting
      setFormData({
        ...formData,
        firstname: capitalizedFirstname,
        lastname: capitalizedLastname,
      });
      alert("Form Submitted");
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* First name */}
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          placeholder="Firstname"
          autoComplete="off"
          onChange={handleChange}
        />
        {errors.firstname && <span>{errors.firstname}</span>}
      </div>

      {/* Last name */}
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastname"
          placeholder="Lastname"
          autoComplete="off"
          onChange={handleChange}
        />
        {errors.lastname && <span>{errors.lastname}</span>}
      </div>

      {/* Email */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          autoComplete="off"
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      {/* Password */}
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder=""
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      {/* Confirm Password */}
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder=""
          onChange={handleChange}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegistrationForm;
