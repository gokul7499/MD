import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../../components/context/OrderContext';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPopup = ({ orderName, amount, cashback, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
        <div className="text-center mb-6">
          <svg
            className="w-16 h-16 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="text-2xl font-bold text-gray-800 mt-4">Order Placed Successfully!</h3>
          <p className="text-gray-600 mt-2">
            Your order for <span className="font-semibold">{orderName}</span> has been placed.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between py-2">
            <span className="text-gray-700">Amount Paid</span>
            <span className="font-bold">₹{amount}</span>
          </div>
          <div className="flex justify-between py-2 text-green-600">
            <span>Cashback Earned</span>
            <span className="font-bold">₹{cashback}</span>
          </div>
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
            <span className="text-gray-700">Total Savings</span>
            <span className="font-bold text-green-600">₹{cashback}</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mb-4">
          <p>Order details have been sent to your registered email.</p>
          <p>You can track your order in the "My Orders" section.</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

const Checkout = ({ cartItems }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addOrder } = useOrders();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const pinCodeData = {
    '110001': { district: 'Central Delhi', city: 'Delhi' },
    '400001': { district: 'South Mumbai', city: 'Mumbai' },
    '500001': { district: 'Hyderabad', city: 'Telangana' },
    '414001': { district: 'Ahmednagar', city: 'Ahmednagar' },
    '422605': { district: 'Ahmednagar', city: 'Sangamner' },
  };

  const validateForm = () => {
    const phoneValid = /^[0-9]{10}$/.test(phone);
    const pinCodeValid = /^[0-9]{6}$/.test(pinCode);
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    return (
      name &&
      phoneValid &&
      location &&
      pinCodeValid &&
      district &&
      city &&
      emailValid
    );
  };

  const validateCardDetails = () => {
    return (
      /^[0-9]{16}$/.test(cardDetails.cardNumber) &&
      cardDetails.cardName &&
      /^[0-9]{2}\/[0-9]{2}$/.test(cardDetails.expiry) &&
      /^[0-9]{3,4}$/.test(cardDetails.cvv)
    );
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [name, phone, location, pinCode, district, city, email]);

  const handlePinCodeChange = (e) => {
    const newPinCode = e.target.value;
    setPinCode(newPinCode);
    if (/^[0-9]{6}$/.test(newPinCode)) {
      const locationData = pinCodeData[newPinCode];
      if (locationData) {
        setDistrict(locationData.district);
        setCity(locationData.city);
      } else {
        setDistrict('');
        setCity('');
      }
    } else {
      setDistrict('');
      setCity('');
    }
  };

  const handleProceedToPayment = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = () => {
    if (selectedPaymentMethod === 'card' && !validateCardDetails()) {
      alert(t('invalid_card_alert'));
      return;
    }

    // Create order object
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: [...cartItems],
      total: cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
      shippingInfo: {
        name,
        phone,
        location,
        pinCode,
        district,
        city,
        email,
        deliveryInstructions
      },
      paymentMethod: selectedPaymentMethod === 'cod' ? t('cod') : t('card_payment'),
      status: 'Processing'
    };

    // Add to order context
    addOrder(order);

    // Show success popup
    setShowSuccessPopup(true);
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    // Redirect to orders page
    navigate('/orders');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-5">
      {/* Payment Success Popup */}
      {showSuccessPopup && (
        <PaymentSuccessPopup
          orderName={cartItems.map(item => item.name).join(', ')}
          amount={cartItems.reduce((total, item) => total + item.quantity * item.price, 0)}
          cashback={Math.floor(cartItems.reduce((total, item) => total + item.quantity * item.price, 0) * 0.05)}
          onClose={handlePopupClose}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
        {/* Left Column - Checkout Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {showPaymentOptions ? t('payment_method') : t('shipping_info')}
          </h2>
          
          {!showPaymentOptions ? (
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="w-full">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('full_name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder={t('name_placeholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div className="w-full">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('phone_number')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder={t('phone_placeholder')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      /^[0-9]{10}$/.test(phone) ? 'border-green-500' : 'border-red-500'
                    }`}
                  />
                  {!/^[0-9]{10}$/.test(phone) && phone && (
                    <p className="mt-1 text-sm text-red-600">{t('invalid_phone')}</p>
                  )}
                </div>

                {/* Location */}
                <div className="w-full">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('delivery_address')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder={t('address_placeholder')}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Pin Code */}
                <div className="w-full">
                  <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('pin_code')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="pinCode"
                    type="text"
                    placeholder={t('pincode_placeholder')}
                    value={pinCode}
                    onChange={handlePinCodeChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      /^[0-9]{6}$/.test(pinCode) ? 'border-green-500' : 'border-red-500'
                    }`}
                  />
                  {!/^[0-9]{6}$/.test(pinCode) && pinCode && (
                    <p className="mt-1 text-sm text-red-600">{t('invalid_pincode')}</p>
                  )}
                </div>

                {/* District (auto-filled) */}
                <div className="w-full">
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('district')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="district"
                    type="text"
                    value={district}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                  />
                </div>

                {/* City (auto-filled) */}
                <div className="w-full">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('city')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                  />
                </div>

                {/* Email */}
                <div className="w-full md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t('email_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
                        ? 'border-green-500'
                        : 'border-red-500'
                    }`}
                  />
                  {!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && email && (
                    <p className="mt-1 text-sm text-red-600">{t('invalid_email')}</p>
                  )}
                </div>

                {/* Delivery Instructions */}
                <div className="w-full md:col-span-2">
                  <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('delivery_instructions')}
                  </label>
                  <textarea
                    id="deliveryInstructions"
                    placeholder={t('instructions_placeholder')}
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  disabled={!isFormValid}
                  className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
                    isFormValid
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {t('proceed_to_payment')}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Payment Options */}
              <div className="space-y-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPaymentMethod === 'cod' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect('cod')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPaymentMethod === 'cod'}
                      onChange={() => {}}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-3 block text-lg font-medium text-gray-700">
                      {t('cod')}
                    </label>
                  </div>
                  <p className="mt-2 ml-8 text-sm text-gray-500">
                    {t('cod_description')}
                  </p>
                </div>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPaymentMethod === 'card' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect('card')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPaymentMethod === 'card'}
                      onChange={() => {}}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-3 block text-lg font-medium text-gray-700">
                      {t('debit_credit_card')}
                    </label>
                  </div>
                  <div className="mt-2 ml-8">
                    <div className="flex space-x-2 mb-2">
                      <div className="w-10 h-6 bg-gray-200 rounded-sm"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded-sm"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded-sm"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Details Form */}
              {selectedPaymentMethod === 'card' && (
                <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">{t('card_details')}</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('card_number')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder={t('card_number_placeholder')}
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          /^[0-9]{16}$/.test(cardDetails.cardNumber) ? 'border-green-500' : 'border-red-500'
                        }`}
                        maxLength="16"
                      />
                      {!/^[0-9]{16}$/.test(cardDetails.cardNumber) && cardDetails.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{t('invalid_card_number')}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('name_on_card')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        placeholder={t('card_name_placeholder')}
                        value={cardDetails.cardName}
                        onChange={handleCardInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('expiry')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          placeholder={t('expiry_placeholder')}
                          value={cardDetails.expiry}
                          onChange={handleCardInputChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            /^[0-9]{2}\/[0-9]{2}$/.test(cardDetails.expiry) ? 'border-green-500' : 'border-red-500'
                          }`}
                          maxLength="5"
                        />
                        {!/^[0-9]{2}\/[0-9]{2}$/.test(cardDetails.expiry) && cardDetails.expiry && (
                          <p className="mt-1 text-sm text-red-600">{t('invalid_expiry')}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('cvv')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder={t('cvv_placeholder')}
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            /^[0-9]{3,4}$/.test(cardDetails.cvv) ? 'border-green-500' : 'border-red-500'
                          }`}
                          maxLength="4"
                        />
                        {!/^[0-9]{3,4}$/.test(cardDetails.cvv) && cardDetails.cvv && (
                          <p className="mt-1 text-sm text-red-600">{t('invalid_cvv')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentOptions(false)}
                  className="flex-1 py-3 px-6 rounded-md font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  {t('back')}
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={!selectedPaymentMethod || (selectedPaymentMethod === 'card' && !validateCardDetails())}
                  className={`flex-1 py-3 px-6 rounded-md font-medium text-white transition-colors ${
                    selectedPaymentMethod && (selectedPaymentMethod !== 'card' || validateCardDetails())
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {t('place_order')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('order_summary')}</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <span className="ml-2 text-gray-500 text-sm">x{item.quantity}</span>
                  </div>
                  <span className="text-gray-800 font-medium">₹{item.quantity * item.price}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">{t('subtotal')}</span>
                <span className="text-gray-800 font-medium">
                  ₹{cartItems.reduce((total, item) => total + item.quantity * item.price, 0)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">{t('shipping')}</span>
                <span className="text-gray-800 font-medium">{t('free_shipping')}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                <span className="text-gray-800 font-bold">{t('total')}</span>
                <span className="text-blue-600 font-bold text-lg">
                  ₹{cartItems.reduce((total, item) => total + item.quantity * item.price, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;