import { Formik, Form } from "formik";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import FilePreview from "../FilePreview/FilePreview";
import { useForm } from '@/context/FormContext';
import validationSchema from "../../utils/validation";
import './EmployeeForm.css';

const EmployeeForm = () => {
  const { files, formStatus, handleFileChange, handleFileDelete, handleSubmit } = useForm();

  return (
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
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
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
            <p className="file-upload-text">
              Upload photo for ID card. Please give us options (Min 2) 
              (See preview for photo of relevant orientation)
            </p>
            <p className="file-upload-hint">
              Upload up to 5 supported files. Max 10 MB per file.
            </p>
            <FilePreview files={files} handleFileDelete={handleFileDelete} />
          </div>

          <div className="form-buttons">
            <Button 
              onClick={() => document.getElementById('fileInput').click()} 
              type="button"
              disabled={formStatus.isSubmitting}
            >
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
            <Button 
              type="submit" 
              disabled={formStatus.isSubmitting || isSubmitting}
            >
              {formStatus.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>

          {formStatus.error && (
            <div className="error-message">
              {formStatus.error}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
