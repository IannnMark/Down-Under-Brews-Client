import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-slate-950 text-5xl text-center my-7">
        Register to
        <span className="text-red-900 font-bold"> Down Under Brews</span>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex justify-center">
          <OAuth />
        </div>
        <div className="flex items-center my-3">
          <hr className="flex-grow border-gray-400" />
          <span className="mx-3 text-slate-900 font-semibold">or</span>
          <hr className="flex-grow border-gray-400" />
        </div>
        <p>Username</p>
        <input
          type="text"
          placeholder="eg. John"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <p>Email</p>
        <input
          type="email"
          placeholder="email@gmail.com"
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
        <button className="bg-red-950 text-white p-3 rounded-lg text-xl hover:opacity-95 disabled:opacity-80 mt-5">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-1 mt-5 justify-center">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500">Log in now</span>
        </Link>
      </div>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}
