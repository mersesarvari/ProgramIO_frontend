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

const Navbar = () => {
  const user = GetUser();

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
    <Flowbite>
      <NavbarFlowbite fluid>
        <div className="flex md:order-2">
          <DarkThemeToggle />
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.username}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => navigate("/dashboard")}>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/settings")}>
              Settings
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/account")}>
              Account
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                Logout();
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <NavbarFlowbite.Toggle />
        </div>
        <NavbarFlowbite.Collapse>
          <NavbarFlowbite.Link href="/" active>
            Home
          </NavbarFlowbite.Link>
          <NavbarFlowbite.Link href="#">About</NavbarFlowbite.Link>
          <NavbarFlowbite.Link href="#">Services</NavbarFlowbite.Link>
          <NavbarFlowbite.Link href="#">Pricing</NavbarFlowbite.Link>
          <NavbarFlowbite.Link href="#">Contact</NavbarFlowbite.Link>
        </NavbarFlowbite.Collapse>
      </NavbarFlowbite>
    </Flowbite>
  );
};

export default Navbar;
