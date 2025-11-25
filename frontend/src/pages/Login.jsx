import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;



const Login = () => {
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/auth/user/login`,
        formData,
        { withCredentials: true }
      );

      console.log(response.data.role);
      if (response.data.role == "admin") {
        alert(`Admin ${response.data.fullName} Login Successful`);
        navigation("/admin");
      } else {
        navigation("/");
        alert(`User ${response.data.fullName} Login Successful`);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-full transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
