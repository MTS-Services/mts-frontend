import { Outlet } from "react-router";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { useTheme } from "./context/ThemeContext";
import MainFooter from "./layouts/footers/MainFooter/MainFooter";
import MainHeader from "./layouts/headers/MainHeader/MainHeader";

function MainLayOut() {
  const { theme } = useTheme();
  return (
    <>
      <MainHeader />
      <main className={theme}>
        <Outlet />
      </main>
      <MainFooter />
      <ScrollToTop />
    </>
  );
}

export default MainLayOut;
