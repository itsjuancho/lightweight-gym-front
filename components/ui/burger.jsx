import { motion } from 'framer-motion';

const HamburgerIcon = ({ isOpen, toggle }) => {
  return (
    <button onClick={toggle} className="flex flex-col justify-center items-center w-10 h-10 z-50 md:hidden">
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: 45, y: 2 },
        }}
        transition={{ duration: 0.3 }}
        className="h-0.5 w-6 bg-white transform origin-left"
      />
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.2 }}
        className="h-0.5 w-6 bg-white my-1"
      />
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: -45, y: 6 },
        }}
        transition={{ duration: 0.3 }}
        className="h-0.5 w-6 bg-white transform origin-left"
      />
    </button>
  );
};

export default HamburgerIcon;
