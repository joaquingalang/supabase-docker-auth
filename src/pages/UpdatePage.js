import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GradientBackground from "../components/GradientBackground";
import SideBar from "../components/SideBar";
import CheckIcon from "../assets/check_icon.svg";
import CloseIcon from "../assets/close_icon.svg";
import DeleteIcon from "../assets/delete_icon.svg";
import UpdateInput from "../components/UpdateInput";
import DeleteModal from "../components/DeleteModal";
import { supabase } from "../supabaseClient";

function UpdatePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    job_position: "",
    id: "", 
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser ();

        if (error || !user) {
          console.error("No user session found. Redirecting to signin.");
          navigate("/signin");
          return;
        }

        const metadata = user.user_metadata || {};
        const newFormData = {
          id: user.id, 
          firstName: metadata.first_name || "",
          lastName: metadata.last_name || "",
          email: user.email || "",
          address: metadata.address || "",
          job_position: metadata.job_position || "",
        };
        setFormData(newFormData);

        console.log("User  data fetched for update:", newFormData);
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
    if (!formData.id) {
      alert("Error: No user ID found. Please refresh and try again.");
      return;
    }

    try {
      setIsLoading(true); 
      const updateData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        job_position: formData.job_position,
      };

      const { data: { user: currentUser  } } = await supabase.auth.getUser (); 
      if (formData.email && formData.email !== currentUser ?.email) {
        updateData.email = formData.email;
      }

      const { error: authError } = await supabase.auth.updateUser ({ data: updateData });

      if (authError) {
        console.error("Error updating auth.users metadata:", authError);
        alert("Auth update failed. Please try again.");
        return;
      }


      const profileData = {
        id: formData.id,  
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        job_position: formData.job_position,
      };

      const { error: publicError } = await supabase
        .from('users')
        .upsert(profileData);  
      if (publicError) {
        console.error("Error upserting public.users profile:", publicError);
        alert(`Profile update failed: ${publicError.message || 'Please check permissions.'}`);
        return;
      }

      console.log("User  data updated successfully in auth.users and public.users");
      navigate("/profile"); 
    } catch (error) {
      console.error("Unexpected error during update:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCross = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    console.log("Logout triggered from sidebar!");
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    console.log("Logout modal closed.");
    setShowLogoutModal(false);
  };

  const handleLogout = async () => {
    console.log("Confirming logout...");
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing out:", error);
        alert("Logout failed. Please try again.");
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

  const handleConfirmDelete = async () => {
    if (!formData.id) {
      console.error("No user ID found for deletion.");
      alert("Error: No user ID found. Please refresh and try again.");
      setShowDeleteModal(false);
      return;
    }

    try {
      setIsLoading(true); 
      const response = await fetch('http://localhost:3001/api/delete-user', { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: formData.id }), // Send current user's ID
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Account deleted successfully from auth.users and public.users");
        alert("Account deleted successfully. Signing out...");
        

        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          console.error("Error signing out after deletion:", signOutError);
        }
        navigate("/signin");
      } else {
        console.error("Deletion failed:", data.error);
        alert(`Error: ${data.error || 'Failed to delete account. Please try again.'}`);
      }
    } catch (error) {
      console.error("Network error during deletion:", error);
      alert(`Network error: ${error.message}. Please check if the server is running on port 3001.`);
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false); 
    }
  };

  if (isLoading) {
    return (
      <GradientBackground>
        <div className="w-full h-screen grid grid-cols-12">
          <SideBar onLogout={handleLogoutClick} /> {/* Pass onLogout for sidebar during loading */}
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
    <GradientBackground>
      <div className="w-full h-screen grid grid-cols-12">
        <SideBar onLogout={handleLogoutClick} /> {/* Pass onLogout for sidebar */}

        <div className="col-span-10 bg-[#211A20] grid grid-cols-12 shadow-neomorphic-dark rounded-lg relative">
          {/* LEFT PROFILE SECTION */}
          <div className="col-span-3 flex flex-col justify-center items-center">
            <div className="w-[200px] h-[200px] border-2 border-white rounded-full mb-5"></div>

            <p className="font-poppins text-3xl text-white font-medium">
              {formData.firstName} {formData.lastName}
            </p>

            <div className="w-[80%] h-[1px] bg-white mt-[11px] mb-[21px]"></div>

            <p className="font-poppins font-extralight text-white text-lg mb-2">
              {formData.job_position}
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
                  {formData.job_position}
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
                      value={formData.job_position}
                      onChange={handleChange("job_position")}
                    />
                  </div>
                </div>

                {/* Delete Icon (for full account deletion) */}
                <div className="w-full h-[80px] flex justify-end">
                  <img
                    src={DeleteIcon}
                    className="self-end w-10 cursor-pointer hover:opacity-80 transition"
                    onClick={() => setShowDeleteModal(true)}
                    alt="Delete Account"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal (outside grid for proper overlay) */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#211A20] p-6 rounded-lg shadow-neomorphic-dark max-w-md w-full mx-4">
            <h2 className="font-poppins text-2xl font-medium text-white mb-4">Confirm Logout?</h2>
            <p className="font-poppins text-white text-lg mb-6">
              Are you sure you want to log out? This will end your current session. Any unsaved changes will be lost.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseLogoutModal}
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

      {/* Delete Confirmation Modal (outside grid for proper overlay) */}
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </GradientBackground>
  );
}

export default UpdatePage;
