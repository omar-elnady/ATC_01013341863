import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import RotationLogin from "../components/RotationLogin";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const transitionDuration = 0.5;
  const { t, i18n } = useTranslation();
  const langauge = i18n.language;

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const mobileVariants = {
    initial: { rotateY: 90, opacity: 0, y: 50 },
    animate: { rotateY: 0, opacity: 1, y: 0 },
    exit: { rotateY: -90, opacity: 0, y: -50 },
  };
  const desktopPanelVariants =
    langauge === "en"
      ? {
          initial: { x: "0%" },
          animate: { x: isLogin ? "0%" : "100%" },
        }
      : {
          initial: { x: "100%" },
          animate: { x: isLogin ? "100%" : "0%" },
        };

  const desktopFormVariants =
    langauge === "en"
      ? {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -50 },
        }
      : {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 50 },
        };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-darkCard flex items-center justify-center">
      {isMobile ? (
        <div className="w-full ">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="signin"
                variants={mobileVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: transitionDuration, ease: "easeInOut" }}
              >
                <SignIn setIsLogin={setIsLogin} />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                variants={mobileVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: transitionDuration, ease: "easeInOut" }}
              >
                <SignUp setIsLogin={setIsLogin} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative w-full  flex h-screen">
          <motion.div
            className="absolute w-1/2 top-0 left-0 h-full z-20 bg-indigo-600"
            variants={desktopPanelVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: transitionDuration, ease: "easeInOut" }}
          >
            <div
              className="h-full px-12 flex flex-col items-center justify-center text-center"
              style={{ perspective: "1000px" }}
            >
              <RotationLogin isLogin={isLogin} />
            </div>
          </motion.div>

          <div className="w-full  z-10 flex items-center justify-center">
            <div className="w-full ">
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    variants={desktopFormVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      duration: transitionDuration,
                      ease: "easeInOut",
                    }}
                  >
                    <SignUp setIsLogin={setIsLogin} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="w-full ">
              <AnimatePresence>
                {isLogin && (
                  <motion.div
                    variants={desktopFormVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      duration: transitionDuration,
                      ease: "easeInOut",
                    }}
                  >
                    <SignIn setIsLogin={setIsLogin} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
