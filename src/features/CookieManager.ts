import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export function GetUser() {
  const userRedux = useSelector((state) => state?.auth?.user);
  const userCookie = Cookies.get("user");
  try {
    if (!userRedux && !userCookie)
      throw new Error("Cannot get user informations from cookie or redux");
    if (userCookie) {
      const userObject = JSON.parse(user);
      return userObject;
    } else {
      return userRedux;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
