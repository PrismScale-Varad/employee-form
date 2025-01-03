import { Formik, Field, Form } from "formik";
import Button from "../components/Button/Button";
import TextField from "../components/TextField/TextField";
import { useState } from "react";
import Head from "next/head";
import { Poppins } from 'next/font/google'
import validationSchema from "./utils/validation";
import FilePreview from "../components/FilePreview/FilePreview";
import Image from "next/image"
import './form.css'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

const secret = process.env.NEXT_PUBLIC_SECRET;
const api_base = process.env.NEXT_PUBLIC_API_URL;
const handleSubmit = async (values, { setSubmitting }, files) => {
  // Create the FormData object
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
    const response = await fetch(`${api_base}`, {
      method: 'POST',
      body: formData,
      headers: {
        'authorization': `Bearer ${secret}`,        // Add token to the headers
      },
      mode: 'cors', // Important for cross-origin requests
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
};

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
    <div className={`form-container ${poppins.className}`}>
      <div className="logo-container">
        <Image src="/logo.webp" width={1000} height={100} alt="Logo" className="logo-image not-selectable" />
        <p className="create-text-mobile monument-extended not-selectable">Create Create</p>
        <p className="create-text-mobile-second monument-extended not-selectable">Create Create Create</p>
        <p className="create-text-desktop create monument-extended not-selectable">Create Create</p>
        <p className="create-text-desktop-second create_reverse monument-extended not-selectable">Create Create </p>
      </div>

      <p className="title monument-extended not-selectable">Employee Onboarding</p>
      <p className="subtitle">Please fill the details as asked below</p>

      <div className="form-wrapper">
        <Image className="absolute top-[15%] left-[-12%] not-selectable;" width={200} height={100} src="/gradient glass_1.webp" alt="Glass Gradient 1" />
        <Image className="absolute bottom-[40%] left-[85%] not-selectable;" width={200} height={100} src="/gradient glass_2.webp" alt="Glass Gradient 2" />
        <Image className="absolute bottom-[10%] left-[-10%] not-selectable;" width={300} height={100} src="/gradient glass_3.webp" alt="Glass Gradient 3" />
        
        <div className="form-content">
          <div className="form-divider">
            <img className="form-gradient" src='/form_gradient.webp' />
          </div>

          <div className="form-inner">
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
              onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting }, files)}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form className="form">
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
                    <label className="dob-label">Date of Birth</label>
                    <div className="dob-inputs">
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

                  <div className="file-upload-section">
                    <p className="file-upload-text">Upload photo for ID card. Please give us options (Min 2) (See preview for photo of relevant orientation)</p>
                    <p className="file-upload-hint">Upload up to 5 supported files. Max 10 MB per file.</p>
                    <FilePreview files={files} handleFileDelete={handleFileDelete} />
                  </div>

                  <div className="form-buttons">
                    <Button onClick={() => document.getElementById('fileInput').click()} type="button">
                      Add File +
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
                      Submit
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