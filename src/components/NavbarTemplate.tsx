"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { useNavigate } from "react-router-dom";
//import { logout } from "../features/auth/userSlice";
import { useLogoutMutation } from "../features/auth/authAPISlice";
import { logout as LogoutApiCall } from "../../src/features/auth/authSlice";
import { useDispatch } from "react-redux";

const NavbarTemplate = () => {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const Logout = async () => {
    try {
      if (!isLoading) {
        const logoutResponse = await logout({}).unwrap();
        await dispatch(LogoutApiCall({}));
        console.log("Logout response:", logoutResponse);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Flowbite>
      <Navbar fluid>
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
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                Logout();
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </Flowbite>
  );
};

export default NavbarTemplate;
