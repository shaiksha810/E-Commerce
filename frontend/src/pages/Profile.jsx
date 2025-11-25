import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;


const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/user/profile`, {
        withCredentials: true,
      });
      setData(res.data.profile);
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
      navigate("/user/profile"); 
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/user/logout`, {
        withCredentials: true,
      });

      // console.log(res.data.message);
      alert(res.data.message)
      
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  if (!data) return <p className="text-center mt-10 font-bold text-3xl">Please Login .</p> 
  
  return (
    <>
    
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center justify-center relative p-4">


      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
      >
        ← Back
      </button>

      {/* Profile Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px] flex flex-col items-center gap-4">

        {/* Profile Image (optional) */}
        <img
          src={data.profileImage || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
          alt="profile"
          className="w-28 h-28 rounded-full border-4 border-gray-300 object-cover"
        />

        {/* User Info */}
        <h2 className="text-2xl font-bold">{data.fullName}</h2>
        <p className="text-gray-600">{data.email}</p>
        <p className="text-gray-600 font-medium">Role: {data.role}</p>

        <div className="mt-4 text-center w-full">
          <p><span className="font-semibold">Phone:</span> {data.phone || "Not Provided"}</p>
          <p><span className="font-semibold">Address:</span> {data.address || "Not Provided"}</p>
        </div>

        {/* Logout Button */}
        <button
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
    
    </>
  );
};

export default Profile;
