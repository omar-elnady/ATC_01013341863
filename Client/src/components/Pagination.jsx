import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { i18n } = useTranslation();

  const isRTL = i18n.language === "ar";
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full bg-white dark:bg-darkCard border border-gray-200 dark:border-gray-700 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        {isRTL ? <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" /> : <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
      </motion.button>

      {getPageNumbers().map((page) => (
        <motion.button
          key={page}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === page
              ? "bg-indigo-600 text-white"
              : "bg-white dark:bg-darkCard border border-gray-200 dark:border-gray-700 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full bg-white dark:bg-darkCard border border-gray-200 dark:border-gray-700 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        {isRTL ? <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" /> : <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
      </motion.button>
    </div>
  );
};

export default Pagination;