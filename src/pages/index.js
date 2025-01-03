import { FormProvider } from '@/context/FormContext';
import FormContainer from '@/components/FormContainer/FormContainer';
import EmployeeForm from '@/components/EmployeeForm/EmployeeForm';

export default function FormPage() {
  return (
    <FormProvider>
      <FormContainer>
        <EmployeeForm />
      </FormContainer>
    </FormProvider>
  );
}