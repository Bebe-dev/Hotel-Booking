import { Outlet } from "react-router";
import Footer from "../components/Footer";

export default function FooterLayout () {
    return(
        <>
        <main>
            <Outlet />
        </main>
        <Footer />
        </>
    )
}