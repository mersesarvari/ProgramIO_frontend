import Cookies from "js-cookie";
import { selectCurrentUser } from "./auth/authSlice";
import { useSelector } from "react-redux";

export function GetUser() {
  const userStore = useSelector((state) => state?.auth?.user);
  try {
    const user = Cookies.get("user");
    if (user) {
      const userObject = JSON.parse(user);
      return userObject;
    } else if (userStore) {
      return userStore;
    } else {
      throw new Error("Could not parse USER from the cookie");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
