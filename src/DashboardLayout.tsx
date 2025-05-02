import { ToastContainer } from "react-toastify";
import DashboardSideber from "./components/DashboardSideber/DashboardSideber";

const DashboardLayout = () => {
  return (
    <>
      <main>
        <DashboardSideber />
      </main>
      <ToastContainer position="top-right" autoClose={6000} />
    </>
  );
};

export default DashboardLayout;
