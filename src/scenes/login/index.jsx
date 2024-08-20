import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate(); // Get the navigate function

    const handleFormSubmit = async (values) => {
        try {
          const response = await fetch("api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          });
    
          if (!response.ok) {
            throw new Error("Failed to log in");
          }
    
          const data = await response.json();
          console.log("Login successful:", data);
          // Handle successful login, such as storing tokens or redirecting the user
            // Save token to local storage or session storage
        localStorage.setItem("access_token", data.access_token);

        // Redirect to home page
        navigate("/");
        } catch (error) {
          console.error("Error logging in:", error);
          // Handle error, such as showing an error message to the user
        }
      };
  return (
    <Box m="20px">
      <h1>Login</h1>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={loginInitialValues}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="20px">
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
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const loginInitialValues = {
  email: "",
  password: "",
};

export default LoginForm;
