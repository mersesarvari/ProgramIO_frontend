import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export function GetUser() {
  const userRedux = useSelector((state) => state?.auth?.user);
  const userCookie = Cookies.get("user");
  try {
    if (!userRedux && !userCookie) null;
    else if (userCookie) {
      const userObject = JSON.parse(userCookie);
      return userObject;
    } else {
      return userRedux;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
