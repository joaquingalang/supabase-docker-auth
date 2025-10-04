import FormInput from "../components/FormInput";
import GradientBackground from "../components/GradientBackground";

function SignInPage() {
    return (
        <GradientBackground>
            <div className="w-full h-screen flex justify-center items-center">

                <div className="w-[450px] h-[480px] bg-[#211A20] shadow-neomorphic-dark rounded-lg m-10">

                    <div className="h-full flex flex-col justify-between">

                        <form className="flex flex-col justify-center items-center py-[47px] px-[40px]">

                            <p className="font-poppins text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FF97E0] via-[#969696] to-[#7C7C7C] mb-6">LOG IN</p>

                            <FormInput type="email" placeholder="Enter your email"/>

                            <br/>

                            <FormInput type="password" placeholder="Enter your password"/>

                            <br/>

                            <input type="submit" value="Log In" className="bg-[#FF97E0] w-[229px] h-[56px] rounded-full font-poppins text-base font-medium mt-4 cursor-pointer"/>

                        </form>

                        <p className="self-center text-[#715D6D] italic mb-7">Don't have an account? <span className="text-[#FF97E0] font-semibold not-italic cursor-pointer">Sign Up</span></p>

                    </div>

                </div>

            </div>
        </GradientBackground>
    );
}

export default SignInPage;