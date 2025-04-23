import React from "react";

export interface CourseModelProps {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  original_price: string;
  setOriginal_price: (value: string) => void;
  discount_price: string;
  setDiscount_price: (value: string) => void;
  discount: string;
  setDiscount: (value: string) => void;
  image: string;
  setImage: (value: string) => void;
}

const CourseModel: React.FC<CourseModelProps> = ({
  onClose,
  onSubmit,
  title,
  setTitle,
  description,
  setDescription,
  original_price,
  setOriginal_price,
  discount_price,
  setDiscount_price,
  discount,
  setDiscount,
  image,
  setImage,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-black border-2 border-stone-900 text-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Course</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
          <Input label="Title" value={title} onChange={setTitle} />
          <Textarea label="Description" value={description} onChange={setDescription} />
          <Input label="Original Price" value={original_price} onChange={setOriginal_price} />
          <Input label="Discount Price" value={discount_price} onChange={setDiscount_price} />
          <Input label="Discount (%)" value={discount} onChange={setDiscount} />
          <Input label="Image URL" value={image} onChange={setImage} />

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};