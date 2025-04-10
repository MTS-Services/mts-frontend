import { Outlet } from "react-router";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { useTheme } from "./context/ThemeContext";
import MainFooter from "./layouts/footers/MainFooter/MainFooter";
import MainHeader from "./layouts/headers/MainHeader/MainHeader";
import CtaSection from "./components/Home/CtaSection/CtaSection";

function MainLayOut() {
  const { theme } = useTheme();
  return (
    <>
      <MainHeader />
      <main className={theme}>
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
