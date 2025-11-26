import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"
import { Link } from "react-router"
import { IoPersonOutline } from "react-icons/io5";


export default function LandNavbar() {

    const [user, loading] = useAuthState(auth)
    return(
        <div className="bg-[#FAFAFA]">
            <nav className="flex justify-between items-center p-4 md:px-6">
                <img src="/images/logo.svg" alt="Logo" height={40} />
                <div className=" flex gap-2 items-center bg-white p-2 rounded-md">
                    <IoPersonOutline />
                    {loading ? (<span>loading...</span>) : user ? (<span>{user.displayName}</span>) : (<Link to="/landlords/login">Login</Link>)}
                </div>
            </nav>
        </div>
    )
}