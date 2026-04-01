import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import { BiArrowToTop } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import ScrollOnTop from "../../utils/ScrollOnTop";

const PageWrapper = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="w-full">
      <ScrollOnTop />
      <div className="announcementBar">
        <AnnouncementBar />
      </div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-34 cursor-pointer right-6 bg-gradient-to-r from-sky-500 to-cyan-500 text-white p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-110 transition z-50"
        >
          <BiArrowToTop className="w-6 h-6" />
        </button>
      )}
      <a
        href="https://wa.me/+923183516990"
        target="_blank"
        rel="noopener noreferrer"
        className="
    fixed bottom-6 right-6 
    w-14 h-14 
    flex items-center justify-center 
    rounded-full 
    bg-green-500 
    text-white 
    shadow-lg 
    hover:scale-110 
    hover:shadow-2xl 
    transition 
    duration-300 
    z-50
   
  "
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default PageWrapper;
