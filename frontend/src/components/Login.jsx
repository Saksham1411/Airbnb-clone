import {UserContext} from "../context/UserContext.jsx";
import axios from "axios";
import React, { useContext, useState } from "react";

const Login = ({ onClose, onSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(UserContext);
  async function submitHandler(e){
    try {
      e.preventDefault();
      const res = await axios.post('/login',{email,password});
      const data = await res.data.user;
      setUser(data);
      onClose(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col gap-1 pb-4 w-1/3 border m-4 absolute left-1/3 top-12 rounded-lg box shadow-md z-20 bg-white">
      <div className="flex mb-4 border-b p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={() => onClose(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <span className="text-xl m-auto font-bold">Login</span>
      </div>
      <form className="flex flex-col gap-3 p-4 pb-0" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          className="border border-black rounded-md h-10 px-2 text-lg"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-black rounded-md h-10 px-2 text-lg"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md h-10 w-1/2 text-lg bg-primary outline-none text-white font-bold"
        >
          Login
        </button>
      </form>
      <span
        className="px-4 py-2 hover:text-blue-800 cursor-pointer"
        onClick={() => {
          onClose(false);
          onSignin(true);
        }}
      >
        Dont have account?
      </span>
    </div>
  );
};

export default Login;
