'use client';

const Footer = () => {
  return (
    <>
      <footer className="ml-64 fixed bottom-0 left-0 right-0 bg-white border-t border-b border-gray-200 py-4 px-6 text-sm flex items-center justify-between">
        <div className="text-gray-500">
          &copy; {new Date().getFullYear()} <strong className="text-gray-700">BetaSoft</strong>. All rights reserved.
        </div>
        <div className="text-gray-500">
          Designed by <a href="#" className="text-blue-600 hover:underline">BetaSoft</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
