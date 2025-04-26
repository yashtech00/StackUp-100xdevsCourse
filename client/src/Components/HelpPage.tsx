export const HelpPage = () => {
    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Need Help?</h1>
            <p className="text-gray-400 mb-6">
                We're here to assist you with any issues or questions you might have about your courses, purchases, or your account.
            </p>

            <div className="space-y-4">
                <div className="border border-gray-700 rounded-lg p-4 bg-stone-900">
                    <h2 className="text-xl font-semibold">📚 Course Access Issues</h2>
                    <p className="text-gray-400">Can't access a course you purchased? Try refreshing or check your Purchased page. If it still doesn't show up, contact support.</p>
                </div>

                <div className="border border-gray-700 rounded-lg p-4 bg-stone-900">
                    <h2 className="text-xl font-semibold">💳 Payment Questions</h2>
                    <p className="text-gray-400">If you're unsure whether a payment went through or if you were charged twice, check your email for a confirmation or reach out to us.</p>
                </div>

                <div className="border border-gray-700 rounded-lg p-4 bg-stone-900">
                    <h2 className="text-xl font-semibold">👤 Account Help</h2>
                    <p className="text-gray-400">Having trouble logging in or forgot your password? Use the "Forgot Password" option or contact support for help.</p>
                </div>
            </div>

            <div className="mt-8">
                <p className="text-gray-400">
                    Still need assistance? Email us at <span className="text-blue-400">support@coursesite.com</span> and we'll get back to you within 24 hours.
                </p>
            </div>
        </div>
    );
};
