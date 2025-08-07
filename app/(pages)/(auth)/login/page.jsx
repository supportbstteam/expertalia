"use client";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      
      if (res.ok) {
        const session = await getSession();
        if (session?.user?.userType === "seller") {
          router.push("/seller/dashboard");
        } else if (session?.user?.userType === "buyer") {
          router.push("/");
        } else if(session?.user?.userType === "admin"){
          router.push("/admin/dashboard");
        }
      } else {
        alert("Login failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Panel */}
      <div className="flex flex-col justify-between p-12 bg-white">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Business Gateway
            <br />
            Starts Here
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your deals, discover new business
            <br />
            opportunities, and connect with trusted partners.
          </p>
        </div>
        <div className="pt-6">
          <Image
            src="/header_logo.png"
            alt="Expertalia Logo"
            width={150}
            height={100}
            priority // Optional: prioritize loading for LCP
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-blue-900">
            Welcome Back
          </h2>
          <p className="text-center text-sm text-gray-600 mt-1 mb-6">
            Sign in to manage your deals, discover opportunities,
            <br />
            and connect with verified partners.
          </p>

          <div className="flex justify-center mb-4 border-b border-gray-300">
            <div className="w-1/2 text-center border-b-2 border-blue-600 font-semibold py-2">
              Login
            </div>
            <a
              href="/register"
              className="w-1/2 text-center py-2 text-gray-500 hover:text-blue-600"
            >
              Signup
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="relative mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="example@expertalia.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••••"
                />
                <div
                  className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff /> : <Eye />}
                </div>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-md shadow hover:opacity-90 transition-transform transform hover:scale-[1.01] flex items-center justify-center"
            >
              <span>Sign in</span>
              {isLoading && (
                <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]"></span>
              )}
            </button>
          </form>

          <div className="mt-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
