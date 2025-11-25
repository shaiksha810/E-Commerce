import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
 
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/auth/user/register`,
        formData,
        { withCredentials: true }
      );

      console.log(response.data);
      if(response.data.role == "admin") return <Admin />

      navigation('/')
      alert("Registration Successful ✅");

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
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
        </div>

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

        {/* Role */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Role</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>{" "}
            {/* optional use only if needed */}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-full transition duration-300"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
