import React from "react";

interface EditCourseButtonProps {
  onClick: () => void;
}

const EditCourseButton: React.FC<EditCourseButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
    >
      Edit Course
    </button>
  );
};

export default EditCourseButton;