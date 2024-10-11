import React, { useContext } from "react";
import { UserContext } from "../../../../App";
import netflixLogo from "../../../stocks/image/netflix_logo.png";
import netflixLoginBg from "../../../stocks/image/netflix-login-bg.webp";

function LoginPage() {
  const { signInWithGoogle } = useContext(UserContext);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${netflixLoginBg})` }}>
      <img src={netflixLogo} alt="Netflix logo" className="w-60 mb-2" />
      <div className="text-center text-white mb-8">
        <h2 className="text-3xl font-bold mb-2">Unlimited Movies, TV Shows & More</h2>
        <p className="text-lg">Ready to watch? Sign up with Google</p>
      </div>
      <button
        className="bg-red-600 text-white font-semibold px-6 py-2 rounded shadow-lg hover:bg-red-700 transition duration-300"
        onClick={signInWithGoogle}
      >
        Sign in With Google
      </button>
    </div>
  );
}

export default LoginPage;
