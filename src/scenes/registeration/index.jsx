import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate(); // Get the navigate function

  const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.firstName + " " + values.lastName,
          email: values.email,
          password: values.password,
          phone:values.contact,
          passwordConfirm: values.password,
          photo: "your-photo-path-here", // If you have a photo upload, this should be the photo path or binary data
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success (e.g., show a message, redirect, etc.)
        console.log("Registration successful", data);
        navigate("/login");
      } else {
        // Handle errors (e.g., show error messages)
        console.error("Registration failed", data);
        setErrors({ api: data.message || "Registration failed" });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrors({ api: "An unexpected error occurred. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <h1>Register</h1>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={registrationInitialValues}
        validationSchema={registrationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="20px">
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passwordConfirm}
                name="passwordConfirm"
                error={!!touched.passwordConfirm && !!errors.passwordConfirm}
                helperText={touched.passwordConfirm && errors.passwordConfirm}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
              />
            </Box>
            {errors.api && (
              <Box color="red" mt="10px">
                {errors.api}
              </Box>
            )}
            <Box display="flex" justifyContent="center" mt="20px">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
              >
                Register
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const registrationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  address1: yup.string().required("Required"),
  address2: yup.string().required("Required"),
});

const registrationInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  contact: "",
  address1: "",
  address2: "",
};

export default RegistrationForm;
