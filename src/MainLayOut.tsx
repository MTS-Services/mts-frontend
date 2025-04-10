import { Outlet } from "react-router";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import MainFooter from "./layouts/footers/MainFooter/MainFooter";
import MainHeader from "./layouts/headers/MainHeader/MainHeader";
import CtaSection from "./components/Home/CtaSection/CtaSection";

function MainLayOut() {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
       {/* <Services></Services> */}
      <CtaSection></CtaSection>
      <MainFooter />
      <ScrollToTop />
    </>
  );
}

export default MainLayOut;
