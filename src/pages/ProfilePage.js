import GradientBackground from "../components/GradientBackground";
import SideBar from "../components/SideBar";
import EditIcon from "../assets/edit_icon.svg";
import DeleteIcon from "../assets/delete_icon.svg";

function ProfilePage() {
    return (
        <GradientBackground>
            <div className="w-full h-screen grid grid-cols-12">
                
                <SideBar></SideBar>

                <div className="col-span-10 bg-[#211A20] grid grid-cols-12">

                    <div className="col-span-3 border border-white flex flex-col justify-center items-center">

                        <div className="w-[200px] h-[200px] border-2 border-white rounded-full mb-5"></div>

                        <p className="font-poppins text-3xl text-white font-medium">Juan Dela Cruz</p>

                        <div className="w-[80%] h-[1px] bg-white mt-[11px] mb-[21px]"></div>

                        <p className="font-poppins font-extralight text-white text-lg mb-2">Software Engineer</p>

                        <p className="font-poppins font-extralight text-white text-lg">San Francisco, CA</p>

                        <div className="h-[96px]"></div>

                        <img src={EditIcon} className="w-8"/>

                    </div>

                    <div className="col-span-9">

                        <div className="my-[73px] mr-10 border-2 border-white">

                            <div className="mx-[36px] my-[28px]">
                                <p className="font-poppins text-6xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FF97E0] via-[#969696] to-[#7C7C7C] mb-4">Juan Dela Cruz</p>
                                <p className="font-poppins font-extralight text-white text-lg mb-1">Software Engineer</p>
                                <p className="font-poppins font-extralight text-white text-lg mb-1">San Francisco, CA</p>

                                <div className="h-[100px]"></div>

                                <div className="grid grid-cols-10 gap-5">

                                    <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">First Name:</p>

                                    <p className="col-span-8 font-poppins font-extralight text-white text-lg">Juan</p>

                                    <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">Last Name:</p>

                                    <p className="col-span-8 font-poppins font-extralight text-white text-lg">Dela Cruz</p>

                                    <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">Email:</p>

                                    <p className="col-span-8 font-poppins font-extralight text-white text-lg">jdelacruz@gmail.com</p>

                                    <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">Address:</p>

                                    <p className="col-span-8 font-poppins font-extralight text-white text-lg">San Francisco, CA</p>

                                    <p className="col-span-2 font-poppins font-semibold text-[#FF97E0] text-lg">Position:</p>

                                    <p className="col-span-8 font-poppins font-extralight text-white text-lg">Software Engineer</p>                                    

                                </div>

                                <div className="w-full h-[80px] flex justify-end">
                                    <img src={DeleteIcon} className="self-end w-10"/>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                
            </div>
        </GradientBackground>
    );
}

export default ProfilePage;