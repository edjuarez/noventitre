import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { userData } from "../data/userData";

interface Props {
  visible: boolean;
}

export default function FloatingWhatsapp({ visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          layoutId="floating-whatsapp-button"
          href={`https://wa.me/${userData.number}?text=${encodeURIComponent(userData.defaultMessageText)}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{
            duration: 0.45,
            ease: "easeInOut",
          }}
          className="
            fixed
            bottom-8
            right-8
            z-[999]
            w-16
            h-16
            rounded-full
            bg-brand-rosa
            hover:bg-gray-800
            text-white
            shadow-xl
            flex
            items-center
            justify-center
            hover:scale-110
          "
        >
          <FaWhatsapp size={30} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}