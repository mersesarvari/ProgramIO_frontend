import Cookies from "js-cookie";
import api from "../api";
import Navbar from "../components/NavbarTemplate";

const AdminPage = () => {
  const TestRefreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        console.error("Refresh token not found.");
        return;
      }

      const response = await api.post(
        "http://localhost:5000/auth/token",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      console.log("TestRefreshToken response:", response);
    } catch (error) {
      console.log("TestRefreshToken error:", error);
    }
  };

  const TestAccessToken = async () => {
    try {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        console.error("Refresh token not found.");
        return;
      }

      const response = await api.post("http://localhost:5000/auth/protected");

      console.log("TestAccessToken response:", response);
    } catch (error) {
      console.log("TestAccessToken error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12">
        <div className="row-span-12 col-span-12">
          <label>User access needed</label>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{ marginTop: "20px" }}
            onClick={() => TestRefreshToken()}
          >
            TestRefreshToken
          </button>
        </div>
        <div className="row-span-12 col-span-12">
          <label>User access needed</label>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{ marginTop: "20px" }}
            onClick={() => TestAccessToken()}
          >
            TestAccessToken
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
