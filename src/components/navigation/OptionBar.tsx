"use client";

import { Avatar, Dropdown, Navbar as NavbarFlowbite } from "flowbite-react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { useNavigate } from "react-router-dom";
//import { logout } from "../features/auth/userSlice";
import { useLogoutMutation } from "../../features/auth/authAPISlice";
import { logout as LogoutApiCall } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { GetUser } from "../../features/CookieManager";

type OptionBarProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const OptionBar: React.FC<OptionBarProps> = ({ value, setValue }) => {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const Logout = async () => {
    try {
      if (!isLoading) {
        const logoutResponse = await logout({}).unwrap();
        await dispatch(LogoutApiCall({}));
        Cookies.remove("user");

        console.log("Logout response:", logoutResponse);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div
      style={{
        marginTop: "88vh",
        zIndex: 999,
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <div role="tablist" className="tabs tabs-boxed">
        <a
          role="tab"
          onClick={() => {
            setValue(0);
          }}
          className={`tab ${value === 0 ? "tab-active" : ""}`}
          style={{ width: "150px" }}
        >
          List view
        </a>
        <a
          role="tab"
          onClick={() => {
            setValue(1);
          }}
          className={`tab ${value === 1 ? "tab-active" : ""}`}
          style={{ width: "150px" }}
        >
          Map view
        </a>
        <a
          role="tab"
          onClick={() => {
            setValue(2);
          }}
          className={`tab ${value === 2 ? "tab-active" : ""}`}
          style={{ width: "150px" }}
        >
          AI
        </a>
      </div>
    </div>
  );
};

export default OptionBar;
