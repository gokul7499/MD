import { useState } from "react";

export default function LoginSignUpForm() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);

  const handleProceed = () => {
    if (!email || !mobile) {
      alert("Please enter both email and mobile number.");
      return;
    }
    // Dummy action
    alert(`Email: ${email}\nMobile: ${mobile}\nWhatsApp Updates: ${whatsappUpdates}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login/Sign Up</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <div className="flex items-center border border-gray-300 rounded-xl mb-4 overflow-hidden">
          <span className="px-4 bg-gray-100 text-gray-700">+91</span>
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-3 focus:outline-none"
          />
        </div>
        <label className="flex items-center text-sm mb-6">
          <input
            type="checkbox"
            checked={whatsappUpdates}
            onChange={(e) => setWhatsappUpdates(e.target.checked)}
            className="mr-2"
          />
          Get order updates on WhatsApp
        </label>
        <button
          onClick={handleProceed}
          disabled={!email || !mobile}
          className={`w-full p-3 rounded-xl font-semibold text-white transition duration-300 ${
            email && mobile ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
