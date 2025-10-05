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
  const [userData, setUserData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    position: "",
  });
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
        const fullName = `${metadata.first_name || ""} ${metadata.last_name || ""}`.trim();
        const newUserData = {
          fullName: fullName || user.email, // Fallback to email if no name
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

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      // Sign out the user (effectively "deletes" the session; for full deletion, you'd need admin API or a profiles table)
      // Note: Direct auth.users deletion requires service role key (not user-accessible for security)
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing out:", error);
      } else {
        console.log("Account session deleted (signed out).");
        navigate("/signin"); // Redirect to signin after "deletion"
      }
    } catch (error) {
      console.error("Unexpected error during deletion:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleEditClick = () => {
    navigate("/update");
  };

  // If still loading, show placeholders (no design change needed, as it uses the same structure)
  if (isLoading) {
    return (
      <GradientBackground>
        <div className="w-full h-screen grid grid-cols-12">
          <SideBar />
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
        <SideBar />

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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <DeleteModal
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </GradientBackground>
  );
}

export default ProfilePage;
