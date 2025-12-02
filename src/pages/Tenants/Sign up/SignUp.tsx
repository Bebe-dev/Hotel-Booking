import { useEffect, useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

export default function SignUp() {
    type FormData = {
        name: string;
        email: string;
        password: string;
        phoneNumber: string;
        nationality: string;
    }
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        nationality: ''
    });

    const handleNext = (values:any) => {
        if (values) {
            setFormData((prev) => ({...prev, ...values}))
        }
        setStep((prev) => prev + 1)
    };
    //const handleBack = () => setStep((prev) => prev - 1);

    
    const handleChange = (
        e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
        console.log("Sign up",formData)
    }, [])
  

    return (
        <div style={{ margin: '0 auto' }} className='max-w-8xl mx-auto'>
            <div>
                {step === 1 && <StepOne formData={formData} handleChange={handleChange} onNext={handleNext} />}
                {step === 2 && <StepTwo formData={formData} handleChange={handleChange} onNext={handleNext} />}
                {step === 3 && <StepThree formData={formData}/>}
            </div>
            <div style={{ marginTop: 16 }}>
                Step {step} of 3
            </div>
        </div>
    );
};

