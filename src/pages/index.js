import { Formik, Field, Form } from "formik";
import Button from "../components/Button/Button";
import TextField from "../components/TextField/TextField";
import { useState } from "react";
import Head from "next/head";
import { Poppins } from 'next/font/google'
import validationSchema from "./utils/validation";
import FilePreview from "../components/FilePreview/FilePreview";
import Image from "next/image"

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
    <div className={` ${poppins.className} relative flex flex-col items-center justify-start min-h-screen bg-[url('/backdrop.webp')] bg-cover bg-top pb-20 overflow-hidden`}>

      <div className="relative w-full flex flex-col items-center">
        <Image src="/logo.webp" width={1000} height={100} alt="Logo" className="absolute top-0 self-center z-[1] not-selectable" />
        <p className="absolute md:hidden top-12 overflow-hidden whitespace-nowrap z-[0] monument-extended text-8xl opacity-10 bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-800 text-transparent bg-clip-text not-selectable">Create Create</p>
        <p className="absolute md:hidden top-36 overflow-hidden whitespace-nowrap z-[0] monument-extended text-8xl opacity-10 bg-gradient-to-l from-zinc-800 via-zinc-500 to-zinc-200 text-transparent bg-clip-text not-selectable">Create Create Create</p>
        <p className="absolute hidden md:block top-0 overflow-hidden whitespace-nowrap z-[0] monument-extended create opacity-10 bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-800 text-transparent bg-clip-text not-selectable">Create Create</p>
        <p className="absolute hidden md:block top-64 overflow-hidden whitespace-nowrap z-[0] monument-extended create_reverse opacity-10 bg-gradient-to-l from-zinc-800 via-zinc-500 to-zinc-200 text-transparent bg-clip-text not-selectable">Create Create </p>

      </div>
      <p className="monument-extended text-2xl md:text-6xl mt-28 md:mt-32 not-selectable z-[1] bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 text-transparent bg-clip-text">Employee Onboarding</p>
      <p className="text-xs md:text-2xl my-2 md:mt-8 md:mb-16 not-selectable z-[1]">Please fill the details as asked below</p>

      <div className="flex flex-col items-center relative max-w-screen px-3 sm:px-6 md:px-10">
        <Image className="absolute top-[15%] left-[-12%] not-selectable" width={200} height={100} src="/gradient glass_1.webp" alt="Glass Gradient 1" />
        <Image className="absolute bottom-[40%] left-[85%] not-selectable" width={200} height={100} src="/gradient glass_2.webp" alt="Glass Gradient 2" />
        <Image className="absolute bottom-[10%] left-[-10%] not-selectable" width={300} height={100} src="/gradient glass_3.webp" alt="Glass Gradient 3" />
        <div
          className="flex flex-col rounded-3xl border border-gray-200 max-w-screen-sm lg:max-w-screen-lg w-full backdrop-blur-sm"
          style={{
            background: 'linear-gradient(45deg, rgba(14, 14, 14, 0.5), rgba(34, 34, 34, 0.3), rgba(84, 84, 84, 0.2), rgba(14, 14, 14, 0.8), rgba(14, 14, 14, 0.8))',
          }}
        >
          <div className="w-32 relative border-t-[3px] border-gray-300 self-center">
            <img className="absolute top-0 opacity-50 scale-[120%] blur-lg z-[-1]" src='/form_gradient.webp' />
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
              onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting }, files)}
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
                    <FilePreview files={files} handleFileDelete={handleFileDelete} />
                  </div>

                  <div className="flex justify-between mt-4">
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
