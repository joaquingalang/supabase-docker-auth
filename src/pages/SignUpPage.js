import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import GradientBackground from "../components/GradientBackground";
import { validateSignupForm } from "../components/Validation";
import { supabase } from "../supabaseClient";
import { supabase } from "../supabaseClient";

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const formErrors = validateSignupForm({
      firstName,
      lastName,
      email,
      password,
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;

    setIsLoading(true);
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

      // If email verification is off, user is logged in immediately
      navigate("/profile");
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
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
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />

              <FormInput
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />

              <FormInput
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />

              <FormInput
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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

