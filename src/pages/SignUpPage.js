import FormInput from "../components/FormInput";
import GradientBackground from "../components/GradientBackground";
import { useNavigate } from "react-router-dom";
import { validateSignupForm } from "../components/Validation";

function SignUpPage() {
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState({});
    // const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // const validateForm = () => {
    //     const formErrors = validateSignupForm({ firstName, lastName, email, password });
    //     setErrors(formErrors);
    //     return Object.keys(formErrors).length === 0;
    // };

    // const handleSignup = async (e) => {
    //     e.preventDefault();
    //     setErrors({});
    //     if (!validateForm()) return;

    // setIsLoading(true);

    // try{
    //     //EDIT HERE WHEN CONNECTING TO SUPABASE
    //     const {data, error} = await supabase.auth.signUp({
    //         email,
    //         password,
    //         //OTHER TABLES DATA
    //         options: {
    //             data: {
    //                 first_name: firstName,
    //                 last_name: lastName,
    //                 address: '',
    //                 position: ''}
    //             }
    //     });

    //     if(error){
    //         setErrors({submit: error.message});
    //         return; 
    //     }

    //     //LOGIN AFTER SIGNUP
    //     const{error: loginError} = await supabase.auth.signInWithPassword({
    //         email,
    //         password,
    //     });

    //     if(loginError){
    //         setErrors({submit: loginError.message});
    //         return;
    //     }

    //     //REDIRECT TO PROFILE PAGE
    //     navigate('/profile');
    // }

    // catch(error){
    //     setErrors({submit: 'An unexpected error occurred. Please try again.'});
    //     console.error('Unexpected error:', error);
    // }
    // finally{
    //     setIsLoading(false);
    // }
    // };

    return (
        <GradientBackground>
            <div className="w-full h-screen flex justify-center items-center">

                <div className="w-[450px] h-[480px] bg-[#211A20] shadow-neomorphic-dark rounded-lg m-10">

                    <div className="h-full flex flex-col justify-between">

                        <form className="flex flex-col justify-center items-center py-[47px] px-[40px]">

                            <p className="font-poppins text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FF97E0] via-[#969696] to-[#7C7C7C] mb-6">SIGN UP</p>

                            <FormInput placeholder="Enter your first name"/>

                            <br/>

                            <FormInput placeholder="Enter your last name"/>

                            <br/>

                            <FormInput type="email" placeholder="Enter your email"/>

                            <br/>

                            <FormInput type="password" placeholder="Enter your password"/>

                            <br/>

                            <input type="submit" value="Sign Up" className="bg-[#FF97E0] w-[229px] h-[56px] rounded-full font-poppins text-base font-medium mt-4 cursor-pointer"/>

                        </form>

                        <p className="self-center text-[#715D6D] italic mb-7">Already have an account? <span className="text-[#FF97E0] font-semibold not-italic cursor-pointer" onclick={() => navigate('./signinpage')}>Log in</span></p>

                    </div>

                </div>

            </div>
        </GradientBackground>
    );
}

export default SignUpPage;