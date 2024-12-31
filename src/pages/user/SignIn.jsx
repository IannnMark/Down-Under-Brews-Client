import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../components/OAuth";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`/api/auth/sign-in`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-slate-950 text-5xl text-center my-7">
        Welcome to
        <span className="text-red-900 font-bold">Down Under Brews</span>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex justify-center">
          <OAuth />
        </div>
        <div className="flex items-center my-3">
          <hr className="flex-grow border-gray-400" />
          <span className="mx-3 text-slate-950 font-semibold">or</span>
          <hr className="flex-grow border-gray-400" />
        </div>
        <p>Email</p>
        <input
          type="email"
          placeholder="sample@gmail.com"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <p>Password</p>
        <input
          type="password"
          placeholder="*****"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <div className="flex mt-5 gap-64">
          <p>Remember me</p>
          <p className="text-blue-600">Forgot Password</p>
        </div>
        <button className="bg-red-950 text-white p-3 rounded-lg text-xl hover:opacity-95 disabled:opacity-80 mt-5">
          {loading ? "Loading" : "Login now"}
        </button>
        <div className="flex gap-1 mt-5 justify-center">
          <p>Don't have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-500">Create one now</span>
          </Link>
        </div>
        {error && <p className="text-red-800">{error}</p>}
      </form>
    </div>
  );
}
