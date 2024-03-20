/** @format */
"use client";
import Container from "@/components/Container";
import CustomLayout from "@/components/CustomLayout";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { persistor, store } from "@/utils/store/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/** @format */

interface Props {
  children: React.ReactNode;
}
const MainLayout = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <SessionProvider>
          <Container>
            <Navbar />
            <Sidebar />
            <CustomLayout>{children}</CustomLayout>
          </Container>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default MainLayout;
