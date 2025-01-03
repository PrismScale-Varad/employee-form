import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

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

  const handleSubmit = async (values, { setSubmitting }) => {
    setFormStatus(prev => ({ ...prev, isSubmitting: true, error: null }));
    
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('designation', values.designation);
    formData.append('employeeID', values.employeeid);
    formData.append('phone', values.phone);
    formData.append('bloodGroup', values.blood);
    formData.append('dob', `${values.year}-${values.month}-${values.day}`);

    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'POST',
        body: formData,
        headers: {
          'authorization': `Bearer ${process.env.NEXT_PUBLIC_SECRET}`,
        },
        mode: 'cors',
      });

      if (response.status === 200) {
        setFormStatus(prev => ({ ...prev, isSuccess: true }));
        alert('Success: Form submitted successfully!');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setFormStatus(prev => ({ ...prev, error: error.message }));
      alert('Error:', error.message);
    } finally {
      setFormStatus(prev => ({ ...prev, isSubmitting: false }));
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFiles([]);
    setFormStatus({
      isSubmitting: false,
      isSuccess: false,
      error: null
    });
  };

  const value = {
    files,
    formStatus,
    handleFileChange,
    handleFileDelete,
    handleSubmit,
    resetForm
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};