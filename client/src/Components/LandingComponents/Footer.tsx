export const Footer = () => {
    return (
      <footer className="border-t-2 border-stone-900 text-gray-400 py-10 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-white">100xDevs Courses</h4>
            <p className="mt-2 text-sm">Learn. Build. Grow your career in tech.</p>
          </div>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
        <div className="text-center text-xs mt-6">
          © 2025 100xDevs. All rights reserved.
        </div>
      </footer>
    );
  };
  