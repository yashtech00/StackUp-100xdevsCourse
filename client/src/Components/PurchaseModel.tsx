import { courseProp } from "./DashboardPage";
import axios from "axios";

export const BuyNowModel = ({ course, courseId }: { course: courseProp, courseId: any }) => {

    const handlePayment = async () => {
        try {
            // Step 1: Create order
            const res = await axios.post("http://localhost:8001/user/payment", {
                amount: course.discount_price,
                currency: "INR"
            }, { withCredentials: true });
            console.log(res,"payment res");
            

            const { id: order_id, amount } = res.data;

            // Step 2: Razorpay Options
            const options = {
                key: "YOUR_PUBLIC_KEY", // Best to use env var
                amount: amount.toString(),
                currency: "INR",
                name: "100xdevs",
                description: "Transaction for course purchase",
                order_id,
                handler: async function (response: any) {
                    const { razorpay_payment_id, razorpay_order_id } = response;
                  
                    await axios.post(`http://localhost:8001/user/purchase/${courseId}`, {
                      payment_id: razorpay_payment_id,
                      order_id: razorpay_order_id
                    }, { withCredentials: true });
                  },
                prefill: {
                    name: "Your Name",
                    email: "your.email@example.com",
                    contact: "1234567890"
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

            // Optional: handle failure
            rzp.on('payment.failed', function (response: any) {
                alert("Payment Failed");
                console.error(response.error);
            });

        } catch (e: any) {
            console.error("Error creating Razorpay order", e.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-black border-2 border-stone-900 text-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
                <div>
                    <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded-md" />
                    <div className="mt-4">
                        <p className="text-xl font-semibold">{course.title}</p>
                        <p className="text-sm text-gray-400 mb-2">Course Summary</p>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Payment currency:</span> INR</p>
                            <p><span className="font-medium">Price (Including GST):</span> ₹{course.discount_price}</p>
                            <p><span className="font-bold">Total:</span> ₹{course.discount_price}</p>
                        </div>
                    </div>
                    <div className="w-full bg-blue-500 flex justify-center py-2 mt-4 rounded-lg hover:cursor-pointer hover:bg-blue-600 transition">
                        <button className="font-semibold text-lg" onClick={handlePayment}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
