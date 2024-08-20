import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const UserProfileForm = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profiles/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      const data = await response.json();
      if (data.status === "success") {
        // Redirect to another page after successful submission
        navigate("/profile-success"); // Adjust the path as needed
      } else {
        console.error("Profile creation failed:", data);
        // Optionally show an error message
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      // Handle error, such as showing an error message to the user
    }
  };

  return (
    <Box m="20px">
      <h1>Create User Profile</h1>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
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
                label="User ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.user_id}
                name="user_id"
                error={!!touched.user_id && !!errors.user_id}
                helperText={touched.user_id && errors.user_id}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Profile For"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profile_for}
                name="profile_for"
                error={!!touched.profile_for && !!errors.profile_for}
                helperText={touched.profile_for && errors.profile_for}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.user_name}
                name="user_name"
                error={!!touched.user_name && !!errors.user_name}
                helperText={touched.user_name && errors.user_name}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Date of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date_of_birth}
                name="date_of_birth"
                error={!!touched.date_of_birth && !!errors.date_of_birth}
                helperText={touched.date_of_birth && errors.date_of_birth}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Gotra"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gotra}
                name="gotra"
                error={!!touched.gotra && !!errors.gotra}
                helperText={touched.gotra && errors.gotra}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Mother Gotra"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mother_gotra}
                name="mother_gotra"
                error={!!touched.mother_gotra && !!errors.mother_gotra}
                helperText={touched.mother_gotra && errors.mother_gotra}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Mother Tongue"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mother_tongue}
                name="mother_tongue"
                error={!!touched.mother_tongue && !!errors.mother_tongue}
                helperText={touched.mother_tongue && errors.mother_tongue}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Native Place"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.native_place}
                name="native_place"
                error={!!touched.native_place && !!errors.native_place}
                helperText={touched.native_place && errors.native_place}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Height"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.height}
                name="height"
                error={!!touched.height && !!errors.height}
                helperText={touched.height && errors.height}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Physique"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.physique}
                name="physique"
                error={!!touched.physique && !!errors.physique}
                helperText={touched.physique && errors.physique}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Complexion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.complexion}
                name="complexion"
                error={!!touched.complexion && !!errors.complexion}
                helperText={touched.complexion && errors.complexion}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Weight"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.weight}
                name="weight"
                error={!!touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Blood Group"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.blood_group}
                name="blood_group"
                error={!!touched.blood_group && !!errors.blood_group}
                helperText={touched.blood_group && errors.blood_group}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Hobbies"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hobbies}
                name="hobbies"
                error={!!touched.hobbies && !!errors.hobbies}
                helperText={touched.hobbies && errors.hobbies}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Family Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.family_status}
                name="family_status"
                error={!!touched.family_status && !!errors.family_status}
                helperText={touched.family_status && errors.family_status}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Place of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.place_of_birth}
                name="place_of_birth"
                error={!!touched.place_of_birth && !!errors.place_of_birth}
                helperText={touched.place_of_birth && errors.place_of_birth}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Time of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.time_of_birth}
                name="time_of_birth"
                error={!!touched.time_of_birth && !!errors.time_of_birth}
                helperText={touched.time_of_birth && errors.time_of_birth}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Have Horoscope"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.have_horoscope}
                name="have_horoscope"
                error={!!touched.have_horoscope && !!errors.have_horoscope}
                helperText={touched.have_horoscope && errors.have_horoscope}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Manglik"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.manglik}
                name="manglik"
                error={!!touched.manglik && !!errors.manglik}
                helperText={touched.manglik && errors.manglik}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Unmarried Brothers"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.unmarried_brothers}
                name="unmarried_brothers"
                error={!!touched.unmarried_brothers && !!errors.unmarried_brothers}
                helperText={touched.unmarried_brothers && errors.unmarried_brothers}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Married Brothers"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.married_brothers}
                name="married_brothers"
                error={!!touched.married_brothers && !!errors.married_brothers}
                helperText={touched.married_brothers && errors.married_brothers}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Married Sisters"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.married_sisters}
                name="married_sisters"
                error={!!touched.married_sisters && !!errors.married_sisters}
                helperText={touched.married_sisters && errors.married_sisters}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Unmarried Sisters"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.unmarried_sisters}
                name="unmarried_sisters"
                error={!!touched.unmarried_sisters && !!errors.unmarried_sisters}
                helperText={touched.unmarried_sisters && errors.unmarried_sisters}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Marital Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.marital_status}
                name="marital_status"
                error={!!touched.marital_status && !!errors.marital_status}
                helperText={touched.marital_status && errors.marital_status}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Number of Children"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.no_of_children}
                name="no_of_children"
                error={!!touched.no_of_children && !!errors.no_of_children}
                helperText={touched.no_of_children && errors.no_of_children}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Academic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.academic}
                name="academic"
                error={!!touched.academic && !!errors.academic}
                helperText={touched.academic && errors.academic}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Profession"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profession}
                name="profession"
                error={!!touched.profession && !!errors.profession}
                helperText={touched.profession && errors.profession}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Salary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salary}
                name="salary"
                error={!!touched.salary && !!errors.salary}
                helperText={touched.salary && errors.salary}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Company"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.company}
                name="company"
                error={!!touched.company && !!errors.company}
                helperText={touched.company && errors.company}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Occupation Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation_address}
                name="occupation_address"
                error={!!touched.occupation_address && !!errors.occupation_address}
                helperText={touched.occupation_address && errors.occupation_address}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Smoke"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.smoke}
                name="smoke"
                error={!!touched.smoke && !!errors.smoke}
                helperText={touched.smoke && errors.smoke}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Drink"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.drink}
                name="drink"
                error={!!touched.drink && !!errors.drink}
                helperText={touched.drink && errors.drink}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Diet"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.diet}
                name="diet"
                error={!!touched.diet && !!errors.diet}
                helperText={touched.diet && errors.diet}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Other Amusements"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.other_amusements}
                name="other_amusements"
                error={!!touched.other_amusements && !!errors.other_amusements}
                helperText={touched.other_amusements && errors.other_amusements}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Address}
                name="Address"
                error={!!touched.Address && !!errors.Address}
                helperText={touched.Address && errors.Address}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name="state"
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name="country"
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Pin Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pin_code}
                name="pin_code"
                error={!!touched.pin_code && !!errors.pin_code}
                helperText={touched.pin_code && errors.pin_code}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email_address}
                name="email_address"
                error={!!touched.email_address && !!errors.email_address}
                helperText={touched.email_address && errors.email_address}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact_number}
                name="contact_number"
                error={!!touched.contact_number && !!errors.contact_number}
                helperText={touched.contact_number && errors.contact_number}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Father's Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.father_name}
                name="father_name"
                error={!!touched.father_name && !!errors.father_name}
                helperText={touched.father_name && errors.father_name}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="About Self"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.about_self}
                name="about_self"
                error={!!touched.about_self && !!errors.about_self}
                helperText={touched.about_self && errors.about_self}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="About Preference"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.about_preference}
                name="about_preference"
                error={!!touched.about_preference && !!errors.about_preference}
                helperText={touched.about_preference && errors.about_preference}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Show Picture Publicly"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.show_picture_publiclly}
                name="show_picture_publiclly"
                error={!!touched.show_picture_publiclly && !!errors.show_picture_publiclly}
                helperText={touched.show_picture_publiclly && errors.show_picture_publiclly}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = yup.object().shape({
  user_id: yup.string().required("Required"),
  profile_for: yup.string().required("Required"),
  gender: yup.string().required("Required"),
  user_name: yup.string().required("Required"),
  date_of_birth: yup.string().required("Required"),
  gotra: yup.string().required("Required"),
  mother_gotra: yup.string().required("Required"),
  mother_tongue: yup.string().required("Required"),
  native_place: yup.string().required("Required"),
  height: yup.string().required("Required"),
  physique: yup.string().required("Required"),
  complexion: yup.string().required("Required"),
  weight: yup.string().required("Required"),
  blood_group: yup.string().required("Required"),
  hobbies: yup.string().required("Required"),
  family_status: yup.string().required("Required"),
  place_of_birth: yup.string().required("Required"),
  time_of_birth: yup.string().required("Required"),
  have_horoscope: yup.string().required("Required"),
  manglik: yup.string().required("Required"),
  unmarried_brothers: yup.string().required("Required"),
  married_brothers: yup.string().required("Required"),
  married_sisters: yup.string().required("Required"),
  unmarried_sisters: yup.string().required("Required"),
  marital_status: yup.string().required("Required"),
  no_of_children: yup.string().required("Required"),
  academic: yup.string().required("Required"),
  profession: yup.string().required("Required"),
  salary: yup.string().required("Required"),
  company: yup.string().required("Required"),
  occupation_address: yup.string().required("Required"),
  smoke: yup.string().required("Required"),
  drink: yup.string().required("Required"),
  diet: yup.string().required("Required"),
  other_amusements: yup.string().required("Required"),
  Address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
  country: yup.string().required("Required"),
  pin_code: yup.string().required("Required"),
  email_address: yup.string().email("Invalid email").required("Required"),
  contact_number: yup.string().required("Required"),
  father_name: yup.string().required("Required"),
  about_self: yup.string().required("Required"),
  about_preference: yup.string().required("Required"),
  show_picture_publiclly: yup.string().required("Required"),
});

const initialValues = {
  user_id: "",
  profile_for: "",
  gender: "",
  user_name: "",
  date_of_birth: "",
  gotra: "",
  mother_gotra: "",
  mother_tongue: "",
  native_place: "",
  height: "",
  physique: "",
  complexion: "",
  weight: "",
  blood_group: "",
  hobbies: "",
  family_status: "",
  place_of_birth: "",
  time_of_birth: "",
  have_horoscope: "",
  manglik: "",
  unmarried_brothers: "",
  married_brothers: "",
  married_sisters: "",
  unmarried_sisters: "",
  marital_status: "",
  no_of_children: "",
  academic: "",
  profession: "",
  salary: "",
  company: "",
  occupation_address: "",
  smoke: "",
  drink: "",
  diet: "",
  other_amusements: "",
  Address: "",
  city: "",
  state: "",
  country: "",
  pin_code: "",
  email_address: "",
  contact_number: "",
  father_name: "",
  about_self: "",
  about_preference: "",
  show_picture_publiclly: ""
};

export default UserProfileForm;
