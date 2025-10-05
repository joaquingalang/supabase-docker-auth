import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import GradientBackground from "../components/GradientBackground";
import { validateSignupForm } from "../components/Validation";
import { supabase } from "../supabaseClient";

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    // Temporary debugging: Log the values being validated
    console.log("Validating form with values:", {
      firstName,
      lastName,
      email,
      password,
    });

    const formErrors = validateSignupForm({
      firstName,
      lastName,
      email,
      password,
    });

    console.log("Validation errors:", formErrors);

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    

    console.log("Form states before validation:", {
      firstName,
      lastName,
      email,
      password,
    });

    setErrors({});
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            address: "",
            position: "",
          },
        },
      });

      if (error) {
        setErrors({ submit: error.message });
        return;
      }

      setTimeout(() => {
        navigate("/signin");
      }, 1500); 
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Temporary debugging: Log state changes on input
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    console.log("First name changed to:", value);
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    console.log("Last name changed to:", value);
    setLastName(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    console.log("Email changed to:", value);
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    console.log("Password changed to:", value.length, "characters");
    setPassword(value);
  };

  return (
    <GradientBackground>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[450px] h-[480px] bg-[#211A20] shadow-neomorphic-dark rounded-lg m-10">
          <div className="h-full flex flex-col justify-between">
            <form
              onSubmit={handleSignup}
              className="flex flex-col justify-center items-center py-[47px] px-[40px]"
            >
              <p
                className="font-poppins text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FF97E0] via-[#969696] to-[#7C7C7C] mb-6 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                SIGN UP
              </p>

              <FormInput
                placeholder="Enter your first name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mb-3">{errors.firstName}</p>
              )}
              <br />

              <FormInput
                placeholder="Enter your last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm mb-3">{errors.lastName}</p>
              )}
              <br />

              <FormInput
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mb-3">{errors.email}</p>
              )}
              <br />

              <FormInput
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mb-3">{errors.password}</p>
              )}
              <br />

              {errors.submit && (
                <p className="text-red-400 text-sm mb-3">{errors.submit}</p>
              )}

              <input
                type="submit"
                value={isLoading ? "Signing up..." : "Sign Up"}
                className="bg-[#FF97E0] w-[229px] h-[56px] rounded-full font-poppins text-base font-medium mt-4 cursor-pointer disabled:opacity-60"
                disabled={isLoading}
              />
            </form>

            <p className="self-center text-[#715D6D] italic mb-7">
              Already have an account?{" "}
              <span
                className="text-[#FF97E0] font-semibold not-italic cursor-pointer"
                onClick={() => navigate("/signin")}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}

export default SignUpPage;
