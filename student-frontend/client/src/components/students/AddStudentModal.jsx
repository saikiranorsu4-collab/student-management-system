import { motion } from "framer-motion";
import { X } from "lucide-react";

import StudentForm from "./StudentForm";

function AddStudentModal({
  isOpen,
  onClose,
  onAdd,
}) {

  if (!isOpen) return null;

  return (

    <div
      className="
      fixed inset-0
      bg-black/60
      backdrop-blur-sm
      flex items-center justify-center
      z-50
      px-4
    "
    >

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
        w-full
        max-w-5xl

        bg-[#0F172A]
        border border-gray-800

        rounded-3xl
        p-8
      "
      >

        <div
          className="
          flex
          justify-between
          items-center
          mb-6
        "
        >

          <div>

            <h2 className="text-3xl font-bold">
              Add Student
            </h2>

            <p className="text-gray-400 mt-1">
              Create a new student profile
            </p>

          </div>

          <button
            onClick={onClose}
            className="
            w-10 h-10
            rounded-xl
            bg-[#111C33]
            flex items-center justify-center
          "
          >

            <X size={18} />

          </button>

        </div>

        <StudentForm
          onSubmit={onAdd}
        />

      </motion.div>

    </div>

  );

}

export default AddStudentModal;