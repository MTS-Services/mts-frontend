import { Outlet } from "react-router";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
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
      <ScrollToTop />
    </>
  );
}

export default MainLayOut;
