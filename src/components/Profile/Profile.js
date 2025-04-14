import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Nav from "../Navbar/Nav";

export default function LoginSignUpForm() {
  const [userDetails, setUserDetails] = useState({ name: "" });
  const [mobile, setMobile] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false); // ✅ new state

  const navigate = useNavigate();
  const otpRefs = useRef([]);

  useEffect(() => {
    otpRefs.current = Array(6)
      .fill()
      .map((_, i) => otpRefs.current[i] || React.createRef());
  }, []);

  const getUserInitials = (name) => {
    if (!name) return '';
    const nameParts = name.trim().split(' ');
    const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
    const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : '';
    return firstNameInitial + lastNameInitial;
  };

  const sendOtp = async () => {
    try {
      const waitingToastId = toast.info("Sending OTP...", { autoClose: false });

      const response = await fetch(
        "https://gxppcdmn7h.execute-api.ap-south-1.amazonaws.com/authgw/sendotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: mobile,
            groupId: 1703228300417,
          }),
        }
      );

      toast.dismiss(waitingToastId);

      if (response.ok) {
        setOtpSent(true);
        toast.success("OTP sent successfully!", { autoClose: 2000 });
      } else {
        toast.error("Failed to send OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again later.");
    }
  };

  const submitOtp = async () => {
    try {
      const response = await fetch(
        "https://4r4iwhot12.execute-api.ap-south-1.amazonaws.com/auth/auth/validateOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: mobile,
            otp: parseInt(otp.join(""), 10),
          }),
        }
      );

      if (response.ok) {
        toast.success("OTP validated successfully!", { autoClose: 2000 });
        setIsOtpVerified(true); // ✅ set verified
        setTimeout(() => {
          navigate("/shop");
        }, 2000);
      } else {
        setOtpError("Incorrect OTP");
        toast.error("Incorrect OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      toast.error("Failed to validate OTP. Please try again later.");
    }
  };

  const handleProceed = () => {
    if (!mobile) {
      toast.error("Please enter your mobile number.");
      return;
    }
    if (mobile.length !== 10) {
      toast.error("Mobile number must be 10 digits.");
      return;
    }
    sendOtp();
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].current.focus();
    }
  };

  const handleNameChange = (e) => {
    setUserDetails({ name: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {isOtpVerified && <Nav userDetails={userDetails} />} {/* ✅ only after OTP verified */}

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-pink-500 text-white flex items-center justify-center text-2xl font-semibold mb-4">
            {getUserInitials(userDetails.name)}
          </div>
          <input
            type="text"
            placeholder="Enter your full name (e.g. Vaibhav Sonawane)"
            value={userDetails.name}
            onChange={handleNameChange}
            className="border border-gray-300 p-2 rounded-md w-full text-center"
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-xl mb-4 overflow-hidden">
          <span className="px-4 bg-gray-100 text-gray-700">+91</span>
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={handleMobileChange}
            className="w-full p-3 focus:outline-none"
            maxLength="10"
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

        {otpSent && (
          <div className="flex mb-6 space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                ref={otpRefs.current[index]}
                className="w-12 h-12 text-center border border-gray-300 rounded-xl"
              />
            ))}
          </div>
        )}

        {otpError && <p className="text-red-500 text-sm mb-4">{otpError}</p>}

        <button
          onClick={otpSent ? submitOtp : handleProceed}
          disabled={!mobile || (otpSent && otp.some(digit => digit === ""))}
          className={`w-full p-3 rounded-xl font-semibold text-white transition duration-300 ${
            (!mobile || (otpSent && otp.some(digit => digit === ""))) 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {otpSent ? "Verify OTP" : "Send OTP"}
        </button>
      </div>
    </div>
  );
}
