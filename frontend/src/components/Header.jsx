import React, { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Login from "./Login";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import Signin from "./Signin";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  const { user, setUser } = useContext(UserContext);
  console.log(user);

  async function logout() {
    const res = await axios.post("/logout");
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <header className="p-4 flex justify-between">
      <a className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 -rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-xl">airSnS</span>
      </a>
      <div className="flex border gap-2 border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div>Any week</div>
        <div className="border-l border-gray-300"></div>
        <div>Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center border gap-2 border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="bg-gray-500 border border-gray-500 text-white rounded-full overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!user && (
            <>
              <DropdownMenuItem>
                <span onClick={() => setShowSignin(true)}>Sign in </span>{" "}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span onClick={() => setShowLogin(true)}>Log in</span>
              </DropdownMenuItem>
            </>
          )}
          {user && (
            <>
              <DropdownMenuLabel>
                Welcome: {"  "}
                {user.fullName}
              </DropdownMenuLabel>
              <Link to={'/account'}>
                <DropdownMenuItem>Account</DropdownMenuItem>
              </Link>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>Airsns your home</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>
          {user && (
            <>
              <DropdownMenuSeparator />
              <div onClick={logout}>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {(showSignin || showLogin) && createPortal(<Backdrop />, document.body)}
      {showLogin &&
        createPortal(
          <Login onClose={setShowLogin} onSignin={setShowSignin} />,
          document.body
        )}

      {showSignin &&
        createPortal(
          <Signin onClose={setShowSignin} onLogin={setShowLogin} />,
          document.body
        )}
    </header>
  );
};

export default Header;
