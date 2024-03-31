import Cookies from "js-cookie";

export function GetUser() {
  try {
    // TODO: Have to add local user store.
    const user = Cookies.get("user");
    if (user) {
      const userObject = JSON.parse(user);
      return userObject;
    } else {
      console.error(
        "Your login session was invalid. The system will log you out!"
      );
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
