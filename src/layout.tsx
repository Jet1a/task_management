import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./components/GlobalModal";
import { ToasterProvider } from "./provider/ToasterProvider";

const RootLayout = () => {
  return (
    <div className="flex flex-row min-h-screen">
      <Navbar />
      <main className="container flex-grow p-4">
        <ModalProvider>
          <ToasterProvider />
          <GlobalModal />
          <Outlet />
        </ModalProvider>
      </main>
    </div>
  );
};

export default RootLayout;
