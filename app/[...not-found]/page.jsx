import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: "Page not found",
  description: "The page you are looking for doesn't exist",
};

const Not_found = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-12 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 relative z-10">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 animate-pulse">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">The page you are looking for doesn't exist.</h2>
          
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Back to home
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 animate-bounce-x" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Not_found
