import Cookies from "js-cookie";
import { toast } from "react-toastify";

export function GetUser() {
  try {
    // TODO: Have to add local user store.
    const user = Cookies.get("user");
    if (user) {
      const userObject = JSON.parse(user);
      return userObject;
    } else {
      toast.error(
        "Your login session was invalid. The system will log you out!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
