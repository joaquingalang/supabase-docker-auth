import { useState } from "react";
import GradientBackground from "../components/GradientBackground";
import SideBar from "../components/SideBar";
import CheckIcon from "../assets/check_icon.svg";
import CloseIcon from "../assets/close_icon.svg";
import DeleteIcon from "../assets/delete_icon.svg";
import UpdateInput from "../components/UpdateInput";
import DeleteModal from "../components/DeleteModal";

function UpdatePage() {
  const [formData, setFormData] = useState({
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "jdelacruz@gmail.com",
    address: "San Francisco, CA",
    position: "Software Engineer",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleDelete = () => {
    // Add actual delete logic here (e.g., API call)
    console.log("Account deleted");
    setShowDeleteModal(false);
  };

  return (
    <GradientBackground>
      <div className="w-full h-screen grid grid-cols-12">
        <SideBar />

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
              <img src={CheckIcon} className="w-8 mr-10 cursor-pointer" />
              <img src={CloseIcon} className="w-8 cursor-pointer" />
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
                  <UpdateInput
                    placeholder="Juan"
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                  />

                  <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">
                    Last Name:
                  </p>
                  <UpdateInput
                    placeholder="Dela Cruz"
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                  />

                  <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">
                    Email:
                  </p>
                  <UpdateInput
                    type="email"
                    placeholder="jdelacruz@gmail.com"
                    value={formData.email}
                    onChange={handleChange("email")}
                  />

                  <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">
                    Address:
                  </p>
                  <UpdateInput
                    placeholder="San Francisco, CA"
                    value={formData.address}
                    onChange={handleChange("address")}
                  />

                  <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">
                    Position:
                  </p>
                  <UpdateInput
                    placeholder="Software Engineer"
                    value={formData.position}
                    onChange={handleChange("position")}
                  />
                </div>

                {/* Delete Icon */}
                <div className="w-full h-[80px] flex justify-end">
                  <img
                    src={DeleteIcon}
                    className="self-end w-10 cursor-pointer"
                    onClick={() => setShowDeleteModal(true)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <DeleteModal
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleDelete}
            />
          )}
        </div>
      </div>
    </GradientBackground>
  );
}

export default UpdatePage;
