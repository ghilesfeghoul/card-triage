import AppProvider from "./context/AppContext";
import AppFooter from "./components/Footer/AppFooter";
import AppContent from "./components/Content/AppContent";
import React from "react";
import AppNotif from "./components/Notification/AppNotif";
import AppNavbar from "./components/Navbar/AppNavbar";

function App() {
    return (
        <>
            <AppProvider>
                <AppNavbar />
                <AppContent />
                <AppNotif />
            </AppProvider>
            <AppFooter />
        </>

    );
}

export default App;
