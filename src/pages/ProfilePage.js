import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GradientBackground from "../components/GradientBackground";
import SideBar from "../components/SideBar";
import EditIcon from "../assets/edit_icon.svg";
import DeleteIcon from "../assets/delete_icon.svg";
import DeleteModal from "../components/DeleteModal"; // ← Import your modal
import { supabase } from "../supabaseClient";

function ProfilePage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // New: For logout confirmation
  const [userData, setUserData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    position: "",
    id: "", 
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch current user data from Supabase auth.users on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser  ();

        if (error || !user) {
          console.error("No user session found. Redirecting to signin.");
          navigate("/signin");
          return;
        }

        // Extract data from auth.users 
        const metadata = user.user_metadata || {};
        const fullName = `${metadata.first_name || ""} ${metadata.last_name || ""}`.trim();
        const newUserData = {
          id: user.id,
          fullName: fullName || user.email,
          firstName: metadata.first_name || "",
          lastName: metadata.last_name || "",
          email: user.email || "",
          address: metadata.address || "",
          position: metadata.position || "",
        };
        setUserData(newUserData);

        console.log("User  data fetched:", newUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/signin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);


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

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => { 
    setShowDeleteModal(false);
    setIsLoading(false); 
  };

  
  const handleConfirmDelete = async () => {
    if (!userData.id) {
      console.error("No user ID found for deletion.");
      alert("Error: No user ID found. Please refresh and try again.");
      handleCloseDeleteModal();
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3001/api/delete-user', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userData.id }), 
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

  const handleEditClick = () => {
    navigate("/update");
  };

  if (isLoading) {
    return (
      <GradientBackground>
        <div className="w-full h-screen grid grid-cols-12">
          <SideBar onLogout={handleLogoutClick} /> {/* New: Pass onLogout for sidebar during loading */}
          <div className="col-span-10 bg-[#211A20] grid grid-cols-12 shadow-neomorphic-dark rounded-lg">
            {/* Placeholder content during load - same structure, but you can add a spinner if desired */}
            <div className="col-span-12 flex justify-center items-center h-full">
              <p className="text-white">Loading profile...</p>
            </div>
          </div>
        </div>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <div className="w-full h-screen grid grid-cols-12">
        <SideBar onLogout={handleLogoutClick} /> {/* New: Pass onLogout for sidebar */}

        <div className="col-span-10 bg-[#211A20] grid grid-cols-12 shadow-neomorphic-dark rounded-lg">
          <div className="col-span-3 flex flex-col justify-center items-center">
            <div className="w-[200px] h-[200px] border-2 border-white rounded-full mb-5"></div>

            <p className="font-poppins text-3xl text-white font-medium">{userData.fullName}</p>

            <div className="w-[80%] h-[1px] bg-white mt-[11px] mb-[21px]"></div>

            <p className="font-poppins font-extralight text-white text-lg mb-2">{userData.position}</p>
            <p className="font-poppins font-extralight text-white text-lg">{userData.address}</p>

            <div className="h-[96px]"></div>

            <img 
              src={EditIcon} 
              onClick={handleEditClick}
              className="w-8 cursor-pointer hover:opacity-80 transition" 
              alt="Edit Profile"
            />
          </div>

          <div className="col-span-9 flex justify-center items-center">
            <div className="w-full my-[73px] mr-10 py-5 shadow-neomorphic-dark rounded-xl">
              <div className="mx-[36px] my-[28px]">
                <p className="font-poppins text-6xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FF97E0] via-[#969696] to-[#7C7C7C] mb-4">
                  {userData.fullName}
                </p>
                <p className="font-poppins font-extralight text-white text-lg mb-1">{userData.position}</p>
                <p className="font-poppins font-extralight text-white text-lg mb-1">{userData.address}</p>

                <div className="h-[100px]"></div>

                <div className="grid grid-cols-10 gap-5">
                  <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">First Name:</p>
                  <p className="col-span-8 font-poppins font-extralight text-white text-lg">{userData.firstName}</p>

                  <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">Last Name:</p>
                  <p className="col-span-8 font-poppins font-extralight text-white text-lg">{userData.lastName}</p>

                  <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">Email:</p>
                  <p className="col-span-8 font-poppins font-extralight text-white text-lg">{userData.email}</p>

                  <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">Address:</p>
                  <p className="col-span-8 font-poppins font-extralight text-white text-lg">{userData.address}</p>

                  <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">Position:</p>
                  <p className="col-span-8 font-poppins font-extralight text-white text-lg">{userData.position}</p>
                </div>

                <div className="w-full h-[80px] flex justify-end">
                  <img
                    src={DeleteIcon}
                    onClick={handleDeleteClick}
                    className="self-end w-10 cursor-pointer hover:opacity-80 transition"
                    alt="Delete Account"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New: Logout Confirmation Modal (outside grid for proper overlay) */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#211A20] p-6 rounded-lg shadow-neomorphic-dark max-w-md w-full mx-4">
            <h2 className="font-poppins text-2xl font-medium text-white mb-4">Confirm Logout?</h2>
            <p className="font-poppins text-white text-lg mb-6">
              Are you sure you want to log out? This will end your current session.
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

      {/* Existing: Delete Modal moved outside grid for proper overlay (assumes DeleteModal uses fixed positioning) */}
      {showDeleteModal && (
        <DeleteModal
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </GradientBackground>
  );
}

export default ProfilePage;
