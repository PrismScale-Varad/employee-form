import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { useState } from "react";
import Head from "next/head";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

// Define validation schema using Yup
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

export default function FormPage() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length + files.length <= 5) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    } else {
      alert("You can upload up to 5 files only.");
    }
  };

  const handleFileDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className={` ${poppins.className} relative flex flex-col items-center justify-start min-h-screen bg-[url('/backdrop.svg')] bg-cover bg-top pb-20 overflow-hidden`}>
      <Head>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
      </Head>
      <div className="relative w-full flex flex-col">
        <img src="/logo.svg" alt="Logo" className="absolute top-0 self-center z-[1]" />
        <img src="/create1.svg" alt="Logo" className="absolute top-0 pt-12 md:pt-24 w-full self-center z-[0]" />
        <img src="/create2.svg" alt="Logo" className="absolute top-0 pt-24 md:pt-56 lg:mt-64 w-full self-center z-[0]" />
      </div>
      <img src="/EmployeeOnboarding.svg" alt="Employee Onboarding" className="w-full px-6 lg:h-16 mt-28 md:mt-32 md:h-10 self-center z-[1]" />
      <img src="/FillDetails.svg" alt="Fill Details" className="w-full h-4 self-center mb-10 md:mb-16 mt-4 z-[1]" />
      <div className="flex flex-col items-center relative max-w-screen px-3 sm:px-6 md:px-10">
        <img className="absolute top-[15%] left-[-12%]" src="/gradient glass_1.svg" alt="Glass Gradient 1"></img>
        <img className="absolute bottom-[40%] left-[85%]" src="/gradient glass_2.svg" alt="Glass Gradient 2"></img>
        <img className="absolute bottom-[10%] left-[-10%]" src="/gradient glass_3.svg" alt="Glass Gradient 3"></img>
        <div
          className="flex flex-col rounded-3xl border border-gray-200 max-w-screen-sm lg:max-w-screen-lg w-full backdrop-blur-md md:backdrop-blur-sm"
          style={{
            background: 'linear-gradient(45deg, rgba(14, 14, 14, 0.5), rgba(34, 34, 34, 0.3), rgba(84, 84, 84, 0.20), rgba(14, 14, 14, 0.8), rgba(14, 14, 14, 0.8))',
          }}
        >
          <div className="w-32 relative border-t-[3px] border-gray-300 self-center">
            <img className="absolute top-0 opacity-50 scale-[120%] blur-lg z-[-1]" src='/form_gradient.svg'></img>
          </div>

          <div className="p-4 md:px-12 py-12 px-6">
            <Formik
              initialValues={{
                name: "",
                email: "",
                designation: "",
                employeeid: "",
                phone: "+91 ",
                blood: "",
                day: "",
                month: "",
                year: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('email', values.email);
                formData.append('designation', values.designation);
                formData.append('employeeID', values.employeeid);
                formData.append('phone', values.phone);
                formData.append('bloodGroup', values.blood);
                formData.append('dob', `${values.year}-${values.month}-${values.day}`);

                // Append files
                files.forEach((file) => {
                  formData.append('files', file);
                });

                try {
                  const response = await fetch('https://https://employee-form-backend-5932.onrender.com/form', {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                  });

                  if (response.status === 200) {
                    alert('Success: Form submitted successfully!');
                  } else {
                    alert('Error:', response);
                  }
                } catch (error) {
                  alert('Error:', error);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form className="md:space-y-12 lg:px-12 md:py-8 text-xs md:text-sm lg:text-base">
                  <TextField
                    label="Name"
                    name="name"
                    placeholder="Your Full Name"
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    placeholder="Your Email Address"
                  />
                  <TextField
                    label="Designation"
                    name="designation"
                    placeholder="Your Designation"
                  />
                  <TextField
                    label="Employee ID"
                    name="employeeid"
                    placeholder="3 letter employee ID"
                  />
                  <div>
                    <label className={`block font-medium mb-2`}>Date of Birth</label>
                    <div className="flex flex-row gap-2 w-full">
                      <TextField
                        name="day"
                        placeholder="DD"
                      />
                      <TextField
                        name="month"
                        placeholder="MM"
                      />
                      <TextField
                        name="year"
                        placeholder="YYYY"
                      />
                    </div>
                  </div>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    placeholder="+91 00000 00000"
                  />
                  <TextField
                    label="Blood Group"
                    name="blood"
                    placeholder="Your Bloodgroup. eg. O+"
                  />

                  <div className="mt-4">
                    <p className="block mb-1">Upload photo for ID card. Please give us options (Min 2) (See preview for photo of relevant orientation)</p>
                    <p className="block mb-6 text-blue-400">Upload up to 5 supported files. Max 10 MB per file.</p>

                    <div className="mb-4">
                      {files.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                          {files.map((file, index) => (
                            <div key={index} className="relative">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  className="text-red-500"
                                  onClick={() => handleFileDelete(index)}
                                >
                                <img
                                  className="w-16 h-16 object-cover rounded-md"
                                  src={URL.createObjectURL(file)}
                                  alt={`file-preview-${index}`}
                                />
                                <span class="material-icons"></span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button onClick={() => document.getElementById('fileInput').click()} type="button">
                      <img className="w-36 lg:w-56 md:w-44" src="/AddButton.svg" alt="Add" />
                    </Button>
                    <input
                      id="fileInput"
                      type="file"
                      multiple
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                      <img className="w-36 lg:w-56 md:w-44" src="/SUBMIT.svg" alt="Submit" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
