import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "No numbers allowed")
    .max(25, "Name must be less than or equal to 25 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  designation: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "No numbers allowed")
    .max(25, "Designation must be less than or equal to 25 characters")
    .required("Designation is required"),
  employeeid: Yup.string()
    .matches(/^\d{3}$/, "Employee ID must be exactly 3 digits")
    .required("Employee ID is required"),
  phone: Yup.string()
    .matches(/^\+91 \d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  blood: Yup.string()
    .matches(/^(A|B|AB|O)[+-]$/, "Invalid blood group")
    .required("Blood group is required"),
  day: Yup.number()
    .min(1, "Invalid day")
    .max(31, "Invalid day")
    .required("Day is required"),
  month: Yup.number()
    .min(1, "Invalid month")
    .max(12, "Invalid month")
    .required("Month is required"),
  year: Yup.number()
    .min(1900, "Invalid year")
    .max(new Date().getFullYear(), "Invalid year")
    .required("Year is required"),
});

export default validationSchema;
