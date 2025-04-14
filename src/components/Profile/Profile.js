import { useState, useRef } from "react";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import { useNavigate } from "react-router-dom";

export default function LoginSignUpForm() {
  const [mobile, setMobile] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // OTP array for 6 digits
  const [otpSent, setOtpSent] = useState(false); // Flag to track OTP sent status
  const [otpError, setOtpError] = useState(""); // To handle OTP validation error
  const navigate = useNavigate();

  // Refs for OTP input fields (6 inputs)
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  // Function to send OTP
  async function sendOtp() {
    try {
      const waitingToastId = toast.info("Sending OTP...", { autoClose: false });

      const response = await fetch("https://gxppcdmn7h.execute-api.ap-south-1.amazonaws.com/authgw/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: mobile,
          groupId: 1703228300417,
        }),
      });

      toast.dismiss(waitingToastId);

      if (response.ok) {
        setOtpSent(true);
        toast.success("OTP sent successfully!", { autoClose: 2000 }); // Toast auto closes faster
      } else {
        toast.error("Failed to send OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again later.");
    }
  }

  // Function to validate OTP
  async function submitOtp() {
    try {
      const response = await fetch("https://4r4iwhot12.execute-api.ap-south-1.amazonaws.com/auth/auth/validateOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: mobile,
          otp: parseInt(otp.join(""), 10), // Combine OTP array into a number
        }),
      });

      if (response.ok) {
        toast.success("OTP validated successfully!", { autoClose: 2000 });
        navigate("/shop"); // Navigate to the next page after successful OTP validation
      } else {
        setOtpError("Incorrect OTP");
        toast.error("Incorrect OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      toast.error("Failed to validate OTP. Please try again later.");
    }
  }

  const handleProceed = () => {
    if (!mobile) {
      toast.error("Please enter your mobile number.");
      return;
    }
    if (mobile.length !== 10) {
      toast.error("Mobile number must be 10 digits.");
      return;
    }
    sendOtp(); // Trigger OTP sending
  };

  // Restrict mobile input to only numeric and 10 digits
  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
    }
  };

  // Handle OTP input change and focus next input
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Focus next input if current input is filled
    if (e.target.value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login/Sign Up</h2>
        
        {/* Mobile number input */}
        <div className="flex items-center border border-gray-300 rounded-xl mb-4 overflow-hidden">
          <span className="px-4 bg-gray-100 text-gray-700">+91</span>
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={handleMobileChange} // Use the handler to ensure only numeric input
            className="w-full p-3 focus:outline-none"
          />
        </div>

        {/* WhatsApp Updates checkbox */}
        <label className="flex items-center text-sm mb-6">
          <input
            type="checkbox"
            checked={whatsappUpdates}
            onChange={(e) => setWhatsappUpdates(e.target.checked)}
            className="mr-2"
          />
          Get order updates on WhatsApp
        </label>

        {/* OTP Input (visible after OTP is sent) */}
        {otpSent && (
          <div className="flex mb-6 space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                ref={otpRefs[index]} // Add refs to OTP input fields
                className="w-12 h-12 text-center border border-gray-300 rounded-xl"
              />
            ))}
          </div>
        )}

        {/* OTP error message */}
        {otpError && <p className="text-red-500 text-sm mb-4">{otpError}</p>}

        <button
          onClick={otpSent ? submitOtp : handleProceed}
          disabled={!mobile || (otpSent && otp.join("").length < 6)} // Check for 6 digits
          className={`w-full p-3 rounded-xl font-semibold text-white transition duration-300 ${mobile ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-300 cursor-not-allowed"}`}
        >
          {otpSent ? "Submit OTP" : "Proceed"}
        </button>
      </div>
    </div>
  );
}
