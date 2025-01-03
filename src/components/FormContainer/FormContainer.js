import { Poppins } from 'next/font/google';
import Image from "next/image";
import './FormContainer.css';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

const FormContainer = ({ children }) => {
  return (
    <div className={`form-container ${poppins.className}`}>
      <div className="logo-container">
        <Image 
          src="/logo.webp" 
          width={1000} 
          height={100} 
          alt="Logo" 
          className="logo-image not-selectable" 
        />
        <p className="create-text-mobile monument-extended not-selectable">
          Create Create
        </p>
        <p className="create-text-mobile-second monument-extended not-selectable">
          Create Create Create
        </p>
        <p className="create-text-desktop create monument-extended not-selectable">
          Create Create
        </p>
        <p className="create-text-desktop-second create_reverse monument-extended not-selectable">
          Create Create 
        </p>
      </div>

      <p className="title monument-extended not-selectable">
        Employee Onboarding
      </p>
      <p className="subtitle">
        Please fill the details as asked below
      </p>

      <div className="form-wrapper">
        <Image 
            className="absolute top-[15%] left-[-12%] not-selectable" 
            width={200} 
            height={100} 
            src="/gradient glass_1.webp" 
            alt="Glass Gradient 1" 
        />
        <Image 
            className="absolute bottom-[40%] left-[85%] not-selectable" 
            width={200} 
            height={100} 
            src="/gradient glass_2.webp" 
            alt="Glass Gradient 2" 
        />
        <Image 
            className="absolute bottom-[10%] left-[-10%] not-selectable" 
            width={300} 
            height={100} 
            src="/gradient glass_3.webp" 
            alt="Glass Gradient 3" 
        />
        
        <div className="form-content">
          <div className="form-divider">
            <img className="form-gradient" src='/form_gradient.webp' alt="Form Gradient" />
            
          </div>

          <div className="form-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
