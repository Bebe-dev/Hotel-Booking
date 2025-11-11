import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useState } from "react";
import { signOut } from "firebase/auth";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { IoChevronDownOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { VscGitStashApply } from "react-icons/vsc";
import { GrFavorite } from "react-icons/gr";
import { PiSignOutLight } from "react-icons/pi";
import { IoMdMenu } from "react-icons/io";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = async (e: any) => {
    e.preventDefault();
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <nav className="md:flex hidden justify-between items-center p-4">
        <div className="navbar-logo">
          <Link to="/">
            <img src="images/logo.svg" alt="Logo" height={40} />
          </Link>
        </div>
        <ul className="navbar-links navbar-center flex gap-6 text-[#A7A7A7]">
          <li>
            <Link
              to="/"
              className="hover:bg-[#E2E8F0] hover:text-black rounded-md p-2 transition ease-in"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/landlords/login"
              className="hover:bg-[#E2E8F0] hover:text-black rounded-md p-2 transition ease-in"
            >
              Landlords
            </Link>
          </li>
          <li>
            <Link
              to="/erasmus-life"
              className="hover:bg-[#E2E8F0] hover:text-black rounded-md p-2 transition ease-in"
            >
              Erasmus Life
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className=" hover:bg-[#E2E8F0] hover:text-black rounded-md p-2 transition ease-in"
            >
              About Us
            </Link>
          </li>
        </ul>
        <div className="navbar-actions relative flex gap-4 items-center">
          <div
            onClick={() => setOpen(!open)}
            className="ease-in-out duration-200"
          >
            {loading ? (
              <span className="border-1 p-2">Loading...</span>
            ) : user ? (
              <Menu>
                <MenuButton
                  bgColor="white"
                  as={Button}
                  rightIcon={<IoChevronDownOutline />}
                >
                  {user.displayName || user.email}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    icon={<RiAccountCircleLine />}
                    as="a"
                    href="/account"
                  >
                    Account
                  </MenuItem>
                  <MenuItem
                    icon={<VscGitStashApply />}
                    as="a"
                    href="/roomApplication"
                  >
                    Room Applications
                  </MenuItem>
                  <MenuItem icon={<GrFavorite />} as="a" href="">
                    Compare Favorites
                  </MenuItem>
                  <MenuItem
                    onClick={handleSignOut}
                    icon={<PiSignOutLight />}
                    as="a"
                    href="/login"
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="navbar-login hover:border-1 p-2 rounded-md"
              >
                Login
              </Link>
            )}
            {/* {loading ? (
              <span>loading...</span>
            ) : user ? (
              <div className="flex flex-col gap-2">
                <span className="flex gap-1 hover:cursor-pointer">
                  {user.displayName || user.email}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m7 10l5 5l5-5"
                        stroke-width="1"
                      />
                    </svg>
                  </span>
                </span>

                {open && (
                  <div className="flex flex-col gap-4 p-4 absolute z-10 mt-8 text-sm bg-white border border-gray-200 rounded shadow-lg">
                    <Link
                      to="/account"
                      className="flex gap-3 block hover:bg-[#F2F4F7] hover:p-1 ease-in-out duration-200"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M11.5 14c4.14 0 7.5 1.57 7.5 3.5V20H4v-2.5c0-1.93 3.36-3.5 7.5-3.5m6.5 3.5c0-1.38-2.91-2.5-6.5-2.5S5 16.12 5 17.5V19h13zM11.5 5A3.5 3.5 0 0 1 15 8.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8 8.5A3.5 3.5 0 0 1 11.5 5m0 1A2.5 2.5 0 0 0 9 8.5a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 14 8.5A2.5 2.5 0 0 0 11.5 6"
                          />
                        </svg>
                      </span>
                      Account
                    </Link>
                    <Link
                      to="/roomApplication"
                      className="flex gap-3 hover:bg-[#F2F4F7] hover:p-1 ease-in-out duration-200"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 16 16"
                        >
                          <g fill="currentColor">
                            <path
                              fill-rule="evenodd"
                              d="M7 3.207V5h1V3.207l2.647 2.647l.707-.708l-3.5-3.5h-.707l-3.5 3.5l.707.708z"
                              clip-rule="evenodd"
                            />
                            <path d="m1.5 9l-.5.5v5l.5.5h12l.5-.5v-5l-.5-.5H9.95a2.5 2.5 0 0 1-4.9 0zm9.163 1H13v4H2v-4h2.337a3.5 3.5 0 0 0 6.326 0M7 6h1v1H7zm0 2h1v1H7z" />
                          </g>
                        </svg>
                      </span>
                      Room Applications
                    </Link>
                    <Link
                      to="favorites"
                      className="flex gap-3 hover:bg-[#F2F4F7] hover:p-1 ease-in-out duration-200"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            d="m4.45 13.908l6.953 6.531c.24.225.36.338.5.366a.5.5 0 0 0 .193 0c.142-.028.261-.14.5-.366l6.953-6.53a5.203 5.203 0 0 0 .549-6.983l-.31-.399c-1.968-2.536-5.918-2.111-7.301.787a.54.54 0 0 1-.974 0C10.13 4.416 6.18 3.99 4.212 6.527l-.31.4a5.203 5.203 0 0 0 .549 6.981Z"
                            stroke-width="1"
                          />
                        </svg>
                      </span>
                      Compare Favorites
                    </Link>
                    <Link
                      to="/login"
                      onClick={handleSignOut}
                      className="flex gap-3 hover:bg-[#F2F4F7] hover:p-1 ease-in-out duration-300"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M13.354 8.646a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L11.207 12.5H20a.5.5 0 0 0 0-1h-8.793l2.147-2.146a.5.5 0 0 0 0-.708"
                          />
                          <path
                            fill="currentColor"
                            d="M9.778 3.5h2.444c.822 0 1.469 0 1.99.043c.53.043.974.133 1.377.338a3.5 3.5 0 0 1 1.53 1.53c.205.403.295.847.338 1.378c.043.52.043 1.168.043 1.989V9a.5.5 0 0 1-1 0v-.2c0-.848 0-1.455-.04-1.93c-.038-.469-.11-.766-.233-1.005a2.5 2.5 0 0 0-1.092-1.093c-.239-.121-.536-.194-1.005-.233c-.476-.039-1.082-.039-1.93-.039H9.8c-.848 0-1.455 0-1.93.04c-.469.038-.766.11-1.005.232a2.5 2.5 0 0 0-1.093 1.093c-.121.239-.194.536-.233 1.005C5.5 7.345 5.5 7.952 5.5 8.8v6.4c0 .848 0 1.454.04 1.93c.038.469.11.766.232 1.005a2.5 2.5 0 0 0 1.093 1.092c.239.122.536.195 1.005.234c.475.039 1.082.039 1.93.039h2.4c.848 0 1.455 0 1.93-.04c.469-.038.766-.11 1.005-.233a2.5 2.5 0 0 0 1.092-1.092c.122-.239.195-.536.234-1.005c.039-.476.039-1.082.039-1.93V15a.5.5 0 0 1 1 0v.222c0 .822 0 1.469-.043 1.99c-.043.53-.133.974-.338 1.377a3.5 3.5 0 0 1-1.53 1.53c-.403.205-.847.295-1.378.338c-.52.043-1.168.043-1.989.043H9.778c-.821 0-1.468 0-1.99-.043c-.53-.043-.974-.133-1.377-.338a3.5 3.5 0 0 1-1.53-1.53c-.205-.403-.295-.847-.338-1.378c-.043-.52-.043-1.167-.043-1.989V8.778c0-.821 0-1.468.043-1.99c.043-.53.133-.974.338-1.377a3.5 3.5 0 0 1 1.53-1.53c.403-.205.847-.295 1.378-.338c.52-.043 1.168-.043 1.989-.043"
                          />
                        </svg>
                      </span>
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="navbar-login">
                Login
              </Link>
            )} */}
          </div>

          <Link to="/listings" className="">
            <button className="hover:cursor-pointer hover:bg-[#E2E8F0] border-1 border-black rounded px-2 py-1">
              Rent a Room
            </button>
          </Link>
        </div>
      </nav>
      {/* MOBILE VIEW */}
      <nav>
        <div className="flex justify-between md:hidden px-2 py-1">
          <img src="/images/logo.svg" alt="logo" />

          <div className="flex gap-2">
            <div
              onClick={() => setOpen(!open)}
              className="ease-in-out duration-200"
            >
              {loading ? (
                <span className="border-1 p-2">Loading...</span>
              ) : user ? (
                <Menu>
                  <MenuButton
                    bgColor="white"
                    as={Button}
                    rightIcon={<IoChevronDownOutline />}
                  >
                    {user.displayName || user.email}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      icon={<RiAccountCircleLine />}
                      as="a"
                      href="/account"
                    >
                      Account
                    </MenuItem>
                    <MenuItem
                      icon={<VscGitStashApply />}
                      as="a"
                      href="/roomApplication"
                    >
                      Room Applications
                    </MenuItem>
                    <MenuItem icon={<GrFavorite />} as="a" href="">
                      Compare Favorites
                    </MenuItem>
                    <MenuItem
                      onClick={handleSignOut}
                      icon={<PiSignOutLight />}
                      as="a"
                      href="/login"
                    >
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link
                  to="/login"
                  className="navbar-login hover:border-1 p-2 rounded-md"
                >
                  Login
                </Link>
              )}
            </div>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<IoMdMenu size={30} />}
                variant="outline"
              />
              <MenuList>
                <MenuItem as="a" href="/">
                  Home
                </MenuItem>
                <MenuItem as="a" href="/landlords/login">
                  Landlords
                </MenuItem>
                <MenuItem as="a" href="/about">
                  About Us
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        {/* <div className="md:hidden">
          <ul>
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/landlords/login" className="hover:underline">
                Landlords
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:underline">
                Accounts
              </Link>
            </li>
            <li>
              <Link to="/roomApplication" className="hover:underline">
                Room Applications
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={handleSignOut}
                className="hover:underline"
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div> */}
      </nav>
    </div>
  );
}
