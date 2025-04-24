
    export interface CourseModelProps {
        onClose: () => void;
        onSubmit: (description: string) => void;
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



    export function CourseModel({
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
    }: CourseModelProps) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                <div className="bg-black border-2 border-stone-900 text-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-center">Add/Edit Course</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit(description); // Pass the description to onSubmit
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 h-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter each point on a new line"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Original Price</label>
                            <input
                                type="text"
                                value={original_price}
                                onChange={(e) => setOriginal_price(e.target.value)}
                                className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="₹999"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Discount Price</label>
                            <input
                                type="text"
                                value={discount_price}
                                onChange={(e) => setDiscount_price(e.target.value)}
                                className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="₹499"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Discount (%)</label>
                            <input
                                type="text"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="50%"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://..."
                            />
                        </div>
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
    }