import { useTheme } from './context/ThemeContext';
import DashboardSideber from './components/DashboardSideber/DashboardSideber';

const DashboardLayout = () => {
  const { theme } = useTheme();

  return (
    <>
      <main className={theme}>
        <DashboardSideber />
      </main>
    </>
  );
};

export default DashboardLayout;
