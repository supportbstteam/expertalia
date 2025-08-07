import { register } from "./action";
import Image from 'next/image';
import ToastComponent from "@/components/ToastComponent";

export default function RegisterPage({ searchParams }) {
  const error = searchParams?.error;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section */}
      <div className="flex flex-col justify-between p-12 bg-white">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-snug">
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

      {/* Right Section */}
      <div className="flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-blue-900">
            Create Account
          </h2>
          <p className="text-center text-sm text-gray-600 mt-1 mb-6">
            Join our trusted network to grow your business, and
            <br />
            collaborate with verified professionals.
          </p>

          <div className="flex justify-center mb-4 border-b border-gray-300">
            <a
              href="/login"
              className="w-1/2 text-center py-2 text-gray-500 hover:text-blue-600"
            >
              Login
            </a>
            <div className="w-1/2 text-center border-b-2 border-blue-600 font-semibold py-2">
              Signup
            </div>
          </div>

          {typeof error === "string" && error.trim() && (
            <ToastComponent error={error} />
          )}

          <form action={register} className="space-y-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                placeholder="Enter your first name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                placeholder="Enter your last name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="Enter your phone number"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* User Type */}
            <div>
              <label
                htmlFor="userType"
                className="block text-sm font-medium text-gray-700"
              >
                Account Type <span className="text-red-500">*</span>
              </label>
              <select
                id="userType"
                name="userType"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select account type</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Create a password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-md shadow hover:opacity-90 transition-transform transform hover:scale-[1.01]"
            >
              Sign up
            </button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
          </div>

          {/* Google Signup Button */}
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
  );
}
