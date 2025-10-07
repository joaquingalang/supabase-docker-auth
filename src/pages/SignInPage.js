import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import GradientBackground from "../components/GradientBackground";
import { supabase } from "../supabaseClient";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateSignInForm = ({ email, password }) => {
    const formErrors = {};

    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    return formErrors;
  };

  const validateForm = () => {
    const formErrors = validateSignInForm({ email, password });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrors({ submit: error.message });
        return;
      }

      if (data.user) {
        console.log("User  logged in successfully! ID:", data.user.id);
        navigate("/profile");
      } else {
        setErrors({ submit: "Login failed. Please try again." });
      }
    } catch (error) {
      console.error("Unexpected error during signin:", error);
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <GradientBackground>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[450px] h-[480px] bg-[#211A20] shadow-neomorphic-dark rounded-lg m-10">
          <div className="h-full flex flex-col justify-between">
            <form
              onSubmit={handleSignIn}
              className="flex flex-col justify-center items-center py-[47px] px-[40px]"
            >
              <p className="font-poppins text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FF97E0] via-[#969696] to-[#7C7C7C] mb-6">
                LOG IN
              </p>

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
                value={isLoading ? "Logging in..." : "Log In"}
                className="bg-[#FF97E0] w-[229px] h-[56px] rounded-full font-poppins text-base font-medium mt-4 cursor-pointer disabled:opacity-60"
                disabled={isLoading}
              />
            </form>

            <p className="self-center text-[#715D6D] italic mb-7">
              Don't have an account?{" "}
              <span
                className="text-[#FF97E0] font-semibold not-italic cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}

export default SignInPage;
