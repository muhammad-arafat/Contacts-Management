import { motion } from "framer-motion";
import { links } from "../lib/data";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className='z-[999] relative'>
      <motion.div
        className=' fixed top-0 left-1/2  h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[40rem] sm:rounded-full'
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>
      <nav className='flex fixed top-[0.15rem] left-1/2  -translate-x-1/2 h-12 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0'>
        <ul className=' text-gray-500 flex w-[22rem] items-center justify-center gap-y-1 text-[1rem] flex-wrap font-medium sm:w-[initial] sm:flex-nowrap sm:gap-5'>
          {links.map(link => (
            <motion.li
              className='flex items-center justify-center h-3/4'
              key={link.name}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <NavLink
                className={({ isActive }) =>
                  `flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition ${
                    isActive
                      ? "  text-gray-950 font-bold underline transition"
                      : ""
                  }`
                }
                to={link.path}
              >
                {link.name}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
