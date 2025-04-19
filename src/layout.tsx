import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./components/GlobalModal";

const RootLayout = () => {
  return (
    <div className="flex flex-row min-h-screen">
      <Navbar />
      <main className="container mx-auto flex-grow p-4">
        <ModalProvider>
          <Outlet />
          <GlobalModal />
        </ModalProvider>
      </main>
    </div>
  );
};

export default RootLayout;
