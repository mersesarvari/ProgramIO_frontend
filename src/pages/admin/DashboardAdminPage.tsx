import Navbar from "../../components/navigation/Navbar";
import Cookies from "js-cookie";
import Sidebar from "../../components/navigation/Sidebar";
import Adminbar from "../../components/navigation/Adminbar";

const DashboardAdminPage = () => {
  const TestRefreshToken = async () => {
    try {
      //Removing previous access token
      Cookies.remove("access_token");
      const response = await api.post("http://localhost:5000/auth/token");

      console.log("TestRefreshToken response:", response);
    } catch (error) {
      console.log("TestRefreshToken error:", error);
    }
  };
  console.log("DashboardAdminPage");

  const TestAccessToken = async () => {
    try {
      const response = await api.post("http://localhost:5000/auth/protected");
      console.log("TestAccessToken response:", response);
    } catch (error) {
      console.log("TestAccessToken error:", error);
    }
  };
  return (
    <>
      <div className=" flex flex-row w-full">
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
      </div>
    </>
  );
};

export default DashboardAdminPage;
