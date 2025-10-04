import LoginIcon from "../assets/login_icon.svg";
import AppLogo from "../assets/app_logo.svg";

function SideBar({onLogout}) {
    return (
        <div className="col-span-2 flex flex-col justify-between items-center">
            <img src={AppLogo} className="w-[150px] m-10"/>
            <div onClick={onLogout} className="flex m-10 cursor-pointer">
                <img src={LoginIcon} className="w-6 mr-3"/>
                <p className="font-poppins text-[#FF97E0] text-xl font-light">Logout</p>
            </div>
        </div>
    );
}

export default SideBar;