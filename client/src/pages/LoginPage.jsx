import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#111b21]">
      <div className="bg-[#202c33] p-8 rounded-2xl w-100 shadow-lg">
        <h1 className="text-3xl text-green-500 mb-6 text-center font-bold">
          SyncTalk
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-[#2a3942] text-white outline-none"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-[#2a3942] text-white outline-none"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-gray-400 mt-4 text-center">
          No account?{" "}
          <Link to="/register" className="text-green-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;