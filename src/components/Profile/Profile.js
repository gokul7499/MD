// src/components/Profile/Profile.js

import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Nav from "../Navbar/Nav";

export default function LoginSignUpForm({ setUserDetails }) {
  const [user, setUser] = useState({ name: "" });
  const [mobile, setMobile] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const otpRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    otpRefs.current = Array(6).fill().map((_, i) => otpRefs.current[i] || React.createRef());
  }, []);

  const sendOtp = async () => {
    try {
      const toastId = toast.info("Sending OTP...", { autoClose: false });

      const response = await fetch(
        "https://gxppcdmn7h.execute-api.ap-south-1.amazonaws.com/authgw/sendotp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: mobile, groupId: 1703228300417 }),
        }
      );

      toast.dismiss(toastId);

      if (response.ok) {
        setOtpSent(true);
        toast.success("OTP sent!");
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      toast.error("Error sending OTP.");
    }
  };

  const submitOtp = async () => {
    try {
      const response = await fetch(
        "https://4r4iwhot12.execute-api.ap-south-1.amazonaws.com/auth/auth/validateOtp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: mobile, otp: parseInt(otp.join(""), 10) }),
        }
      );

      if (response.ok) {
        toast.success("OTP validated!");
        setIsOtpVerified(true);

        localStorage.setItem("userDetails", JSON.stringify(user));
        setUserDetails(user);

        // ✅ Force refresh so App.js reloads state
        setTimeout(() => {
          window.location.href = "/shop";
        }, 0);
      } else {
        setOtpError("Incorrect OTP");
        toast.error("Incorrect OTP. Try again.");
      }
    } catch (error) {
      toast.error("OTP validation failed.");
    }
  };

  const handleProceed = () => {
    if (!user.name) return toast.error("Enter your name.");
    if (!mobile || mobile.length !== 10) return toast.error("Enter a valid mobile number.");
    sendOtp();
  };

  const getUserInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(" ");
    return parts[0][0].toUpperCase() + (parts[1]?.[0]?.toUpperCase() || '');
  };

  const handleOtpChange = (e, i) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);

    if (val && i < otp.length - 1) {
      otpRefs.current[i + 1].current.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {isOtpVerified && <Nav userDetails={user} />}

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-pink-500 text-white flex items-center justify-center text-2xl font-bold mb-4">
            {getUserInitials(user.name)}
          </div>
          <input
            type="text"
            placeholder="Enter your full name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="border p-2 rounded-md w-full text-center"
          />
        </div>

        <div className="flex items-center border rounded-xl mb-4 overflow-hidden">
          <span className="px-4 bg-gray-100 text-gray-700">+91</span>
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,10}$/.test(val)) setMobile(val);
            }}
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
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, i)}
                ref={otpRefs.current[i]}
                className="w-10 h-10 text-center border rounded"
              />
            ))}
          </div>
        )}

        {otpError && <p className="text-red-500 text-sm mb-4">{otpError}</p>}

        <button
          onClick={otpSent ? submitOtp : handleProceed}
          disabled={!mobile || (otpSent && otp.some((d) => d === ""))}
          className={`w-full p-3 rounded-xl font-semibold text-white transition duration-300 ${
            (!mobile || (otpSent && otp.some((d) => d === "")))
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
