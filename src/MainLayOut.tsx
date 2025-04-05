import { Outlet } from "react-router";
import MainFooter from "./layouts/footers/MainFooter/MainFooter";
import MainHeader from "./layouts/headers/MainHeader/MainHeader";

function MainLayOut() {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <MainFooter />
    </>
  );
}

export default MainLayOut;
