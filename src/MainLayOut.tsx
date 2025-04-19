import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import CtaSection from './components/Home/CtaSection/CtaSection';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { useTheme } from './context/ThemeContext';
import MainFooter from './layouts/footers/MainFooter/MainFooter';
import MainHeader from './layouts/headers/MainHeader/MainHeader';

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
      <ToastContainer position='top-right' autoClose={3000} />
      <ScrollToTop />
    </>
  );
}

export default MainLayOut;
