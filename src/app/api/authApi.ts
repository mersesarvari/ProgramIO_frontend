import { useMutation } from "@tanstack/react-query";
import api from "./api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut, setCredentials } from "../slices/authSlice";

type LoginProps = {
  email: string;
  password: string;
  remember: boolean;
};

//LOGIN
export const useLoginMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async ({ email, password, remember }: LoginProps) => {
      const axiosResponse = await api.post(
        "/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return axiosResponse.data;
    },
    onSuccess: async (data: any, variables) => {
      console.info("Login successful", data);
      //Saving login information
      if (variables.remember) {
        Cookies.set("user", JSON.stringify(data));
      } else {
        console.log("We don't save login data");
        console.log("Data:", data);
        //TODO: Save user data to session storage
        dispatch(setCredentials({ user: data }));
      }
      //Handling user login
      navigate("/home");
      return data;
    },
  });
};
//LOGOUT
export const useLogoutMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const axiosResponse = await api.post("/auth/logout");
      return axiosResponse.data;
    },
    onSuccess: async (data) => {
      console.log("Logging out...");
      Cookies.remove("user");
      dispatch(logOut());
      navigate("/login");
      return data;
    },
  });
};
