import React, { useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

const Signup = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/todo"); 
    } catch (error) {
      console.error("Google signup failed:", error);
      setError("Google signup failed. Please try again.");
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/todo");
    } catch (error) {
      console.error("Email signup failed:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-md rounded-md text-center">
        <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>} 
        <form onSubmit={handleEmailSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
          />
          <button
            type="submit"
            className="bg-[#ff5a60] text-white px-6 py-3 rounded-md hover:bg-[#f9787c] transition mb-4 w-full"
          >
            Sign Up with Email
          </button>
        </form>
        <button
          onClick={handleGoogleSignup}
          className="bg-[#4285F4] text-white px-6 py-3 rounded-md hover:bg-[#66aaff] transition w-full"
        >
          Sign Up with Google
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <a href="/" className="text-[#ff5a60] hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
