import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

const mainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default mainLayout;