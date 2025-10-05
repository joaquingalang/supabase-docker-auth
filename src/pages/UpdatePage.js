import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GradientBackground from "../components/GradientBackground";
import SideBar from "../components/SideBar";
import CheckIcon from "../assets/check_icon.svg";
import CloseIcon from "../assets/close_icon.svg";
import UpdateInput from "../components/UpdateInput";
import { supabase } from "../supabaseClient";

function UpdatePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    position: "",
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Renamed for clarity
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch current user data from Supabase auth.users on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser ();

        if (error || !user) {
          console.error("No user session found. Redirecting to signin.");
          navigate("/signin");
          return;
        }

        // Extract data from auth.users (email from user.email, others from user_metadata)
        const metadata = user.user_metadata || {};
        setFormData({
          firstName: metadata.first_name || "",
          lastName: metadata.last_name || "",
          email: user.email || "",
          address: metadata.address || "",
          position: metadata.position || "",
        });

        console.log("User  data fetched for update:", formData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/signin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleCheck = async () => {
    try {
      // Update user_metadata and email if changed (email update sends confirmation email)
      const updateData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        position: formData.position,
      };

      const { data: { user: currentUser  } } = await supabase.auth.getUser ();
      if (formData.email && formData.email !== currentUser ?.email) {
        updateData.email = formData.email;
      }

      const { error } = await supabase.auth.updateUser ({ data: updateData });

      if (error) {
        console.error("Error updating user data:", error);
        alert("Update failed. Please try again."); // User feedback
        return;
      }

      console.log("User  data updated successfully");
      navigate("/profile"); 
    } catch (error) {
      console.error("Unexpected error during update:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleCross = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    console.log("Logout triggered!"); // Debug: Check if this logs from sidebar or icon
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    console.log("Modal closed."); // Debug
    setShowLogoutModal(false);
  };


  const handleLogout = async () => {
    console.log("Confirming logout..."); // Debug
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing out:", error);
        alert("Logout failed. Please try again."); // User feedback
        return;
      } 

      console.log("User  signed out successfully.");
      navigate("/signin"); 
    } catch (error) {
      console.error("Unexpected error during logout:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setShowLogoutModal(false);
    }
  };

  if (isLoading) {
    return (
      <GradientBackground>
        <div className="w-full h-screen grid grid-cols-12">
          <SideBar onLogout={handleLogoutClick} />
          <div className="col-span-10 bg-[#211A20] grid grid-cols-12 shadow-neomorphic-dark rounded-lg">
            <div className="col-span-12 flex justify-center items-center h-full">
              <p className="text-white">Loading update form...</p>
            </div>
          </div>
        </div>
      </GradientBackground>
    );
  }

  return (
    <>
      <GradientBackground>
        <div className="w-full h-screen grid grid-cols-12">
          {/* Pass onLogout prop to SideBar to make sidebar logout functional */}
          <SideBar onLogout={handleLogoutClick} />

          <div className="col-span-10 bg-[#211A20] grid grid-cols-12 shadow-neomorphic-dark rounded-lg relative">
            {/* LEFT PROFILE SECTION */}
            <div className="col-span-3 flex flex-col justify-center items-center">
              <div className="w-[200px] h-[200px] border-2 border-white rounded-full mb-5"></div>

              <p className="font-poppins text-3xl text-white font-medium">
                {formData.firstName} {formData.lastName}
              </p>

              <div className="w-[80%] h-[1px] bg-white mt-[11px] mb-[21px]"></div>

              <p className="font-poppins font-extralight text-white text-lg mb-2">
                {formData.position}
              </p>
              <p className="font-poppins font-extralight text-white text-lg">
                {formData.address}
              </p>

              <div className="h-[96px]"></div>

              <div className="flex">
                <img 
                  src={CheckIcon} 
                  onClick={handleCheck}
                  className="w-8 mr-10 cursor-pointer hover:opacity-80 transition" 
                  alt="Save Changes"
                />
                <img 
                  src={CloseIcon} 
                  onClick={handleCross}
                  className="w-8 cursor-pointer hover:opacity-80 transition" 
                  alt="Cancel"
                />
              </div>
            </div>

            {/* RIGHT UPDATE FORM */}
            <div className="col-span-9 flex justify-center items-center">
              <div className="w-full my-[73px] mr-10 py-5 shadow-neomorphic-dark rounded-xl">
                <div className="mx-[36px] my-[28px]">
                  <p className="font-poppins text-6xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FF97E0] via-[#969696] to-[#7C7C7C] mb-4">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="font-poppins font-extralight text-white text-lg mb-1">
                    {formData.position}
                  </p>
                  <p className="font-poppins font-extralight text-white text-lg mb-1">
                    {formData.address}
                  </p>

                  <div className="h-[100px]"></div>

                  <div className="grid grid-cols-10 gap-5">
                    <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">
                      First Name:
                    </p>
                    <div className="col-span-8">
                      <UpdateInput
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange("firstName")}
                      />
                    </div>

                    <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">
                      Last Name:
                    </p>
                    <div className="col-span-8">
                      <UpdateInput
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleChange("lastName")}
                      />
                    </div>

                    <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">
                      Email:
                    </p>
                    <div className="col-span-8">
                      <UpdateInput
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange("email")}
                      />
                    </div>

                    <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">
                      Address:
                    </p>
                    <div className="col-span-8">
                      <UpdateInput
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleChange("address")}
                      />
                    </div>

                    <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">
                      Position:
                    </p>
                    <div className="col-span-8">
                      <UpdateInput
                        placeholder="Enter position"
                        value={formData.position}
                        onChange={handleChange("position")}
                      />
                    </div>
                  </div>

                  {/* Logout Button (replaced misleading DeleteIcon) */}
                  <div className="w-full h-[80px] flex justify-end items-end mt-4">
                    <button
                      onClick={handleLogoutClick}
                      className="bg-red-600 hover:bg-red-700 text-white font-poppins font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer shadow-neomorphic-dark self-end"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GradientBackground>

      {/* Inline Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#211A20] p-6 rounded-lg shadow-neomorphic-dark max-w-md w-full mx-4">
            <h2 className="font-poppins text-2xl font-medium text-white mb-4">Confirm Logout?</h2>
            <p className="font-poppins text-white text-lg mb-6">
              Are you sure you want to log out? This will end your current session. Any unsaved changes will be lost.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-600 hover:bg-gray-700 text-white font-poppins font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-poppins font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdatePage;
