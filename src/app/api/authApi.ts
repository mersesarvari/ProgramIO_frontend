import { useMutation } from "@tanstack/react-query";
import api from "./api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

type LoginProps = {
  email: string;
  password: string;
  remember: boolean;
};

//LOGIN
export const useLoginMutation = () => {
  const navigate = useNavigate();
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
        //TODO: Save user data to session storage
      }
      //Handling user login
      navigate("/home");
      return data;
    },
  });
};
//LOGOUT
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const axiosResponse = await api.post("/auth/logout");
      return axiosResponse.data;
    },
    onSuccess: (data) => {
      return data;
    },
  });
};
