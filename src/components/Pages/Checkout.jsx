import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../../components/context/OrderContext';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPopup = ({ orderName, amount, cashback, onClose }) => {
  const { t } = useTranslation();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 mt-5">
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
          <h3 className="text-2xl font-bold text-gray-800 mt-4">{t('order_success')}</h3>
          <p className="text-gray-600 mt-2">
            {t('order_for')} <span className="font-semibold">{orderName}</span> {t('has_been_placed')}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between py-2">
            <span className="text-gray-700">{t('amount_paid')}</span>
            <span className="font-bold">₹{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 text-green-600">
            <span>{t('cashback_earned')}</span>
            <span className="font-bold">₹{cashback.toLocaleString()}</span>
          </div>
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
            <span className="text-gray-700">{t('total_savings')}</span>
            <span className="font-bold text-green-600">₹{cashback.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mb-4">
          <p>{t('order_details_sent')}</p>
          <p>{t('track_order_message')}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          {t('continue_shopping')}
        </button>
      </div>
    </div>
  );
};

const Checkout = ({ cartItems = [] }) => {
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

  // Calculate subtotal safely
  const subtotal = Array.isArray(cartItems) 
    ? cartItems.reduce((total, item) => total + (item?.quantity || 0) * (item?.price || 0), 0)
    : 0;

  const validateForm = () => {
    const phoneValid = /^[0-9]{10}$/.test(phone);
    const pinCodeValid = /^[0-9]{6}$/.test(pinCode);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    return (
      name.trim() &&
      phoneValid &&
      location.trim() &&
      pinCodeValid &&
      district.trim() &&
      city.trim() &&
      emailValid
    );
  };

  const validateCardDetails = () => {
    return (
      /^[0-9]{16}$/.test(cardDetails.cardNumber) &&
      cardDetails.cardName.trim() &&
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

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPaymentOptions(true);
    }
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
    if (!Array.isArray(cartItems)) {
      alert(t('invalid_cart'));
      return;
    }

    if (cartItems.length === 0) {
      alert(t('empty_cart_alert'));
      return;
    }

    if (selectedPaymentMethod === 'card' && !validateCardDetails()) {
      alert(t('invalid_card_alert'));
      return;
    }

    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name || t('unnamed_product'),
        price: item.price || 0,
        quantity: item.quantity || 0
      })),
      total: subtotal,
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

    addOrder(order);
    setShowSuccessPopup(true);
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    navigate('/orders');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showSuccessPopup && (
        <PaymentSuccessPopup
          orderName={cartItems.map(item => item?.name || t('unnamed_product')).join(', ')}
          amount={subtotal}
          cashback={Math.floor(subtotal * 0.05)}
          onClose={handlePopupClose}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {showPaymentOptions ? t('payment_method') : t('shipping_info')}
          </h2>
          
          {!showPaymentOptions ? (
            <form className="space-y-6" onSubmit={handleProceedToPayment}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('full_name')} *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('phone_number')} *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      /^[0-9]{10}$/.test(phone) ? 'border-green-500' : 'border-red-500'
                    }`}
                    required
                  />
                  {!/^[0-9]{10}$/.test(phone) && phone && (
                    <p className="mt-1 text-sm text-red-600">{t('invalid_phone')}</p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('delivery_address')} *
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Pin Code */}
                <div>
                  <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('pin_code')} *
                  </label>
                  <input
                    id="pinCode"
                    type="text"
                    value={pinCode}
                    onChange={handlePinCodeChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      /^[0-9]{6}$/.test(pinCode) ? 'border-green-500' : 'border-red-500'
                    }`}
                    required
                  />
                  {!/^[0-9]{6}$/.test(pinCode) && pinCode && (
                    <p className="mt-1 text-sm text-red-600">{t('invalid_pincode')}</p>
                  )}
                </div>

                {/* District */}
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('district')} *
                  </label>
                  <input
                    id="district"
                    type="text"
                    value={district}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('city')} *
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                    required
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('email')} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-green-500' : 'border-red-500'
                    }`}
                    required
                  />
                  {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email && (
                    <p className="mt-1 text-sm text-red-600">{t('invalid_email')}</p>
                  )}
                </div>

                {/* Delivery Instructions */}
                <div className="md:col-span-2">
                  <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('delivery_instructions')}
                  </label>
                  <textarea
                    id="deliveryInstructions"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-6 rounded-md font-medium text-white ${
                  isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!isFormValid}
              >
                {t('proceed_to_payment')}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Payment Options */}
              <div className="space-y-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedPaymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect('cod')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPaymentMethod === 'cod'}
                      readOnly
                      className="h-5 w-5 text-blue-600"
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
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedPaymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect('card')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPaymentMethod === 'card'}
                      readOnly
                      className="h-5 w-5 text-blue-600"
                    />
                    <label className="ml-3 block text-lg font-medium text-gray-700">
                      {t('debit_credit_card')}
                    </label>
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
                        {t('card_number')} *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                          /^[0-9]{16}$/.test(cardDetails.cardNumber) ? 'border-green-500' : 'border-red-500'
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('name_on_card')} *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={cardDetails.cardName}
                        onChange={handleCardInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('expiry_date')} *
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardInputChange}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                            /^[0-9]{2}\/[0-9]{2}$/.test(cardDetails.expiry) ? 'border-green-500' : 'border-red-500'
                          }`}
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                            /^[0-9]{3,4}$/.test(cardDetails.cvv) ? 'border-green-500' : 'border-red-500'
                          }`}
                          placeholder="123"
                          maxLength="4"
                          required
                        />
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
                  className="flex-1 py-3 px-6 rounded-md font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
                >
                  {t('back')}
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={!selectedPaymentMethod || (selectedPaymentMethod === 'card' && !validateCardDetails())}
                  className={`flex-1 py-3 px-6 rounded-md font-medium text-white ${
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

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('order_summary')}</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              {Array.isArray(cartItems) && cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium">{item?.name || t('unnamed_product')}</span>
                      <span className="ml-2 text-gray-500 text-sm">x{item?.quantity || 0}</span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      ₹{(item?.quantity || 0) * (item?.price || 0)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 py-2">{t('empty_cart')}</p>
              )}
            </div>

            <div className="pt-2">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">{t('subtotal')}</span>
                <span className="text-gray-800 font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">{t('shipping')}</span>
                <span className="text-gray-800 font-medium">{t('free_shipping')}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                <span className="text-gray-800 font-bold">{t('total')}</span>
                <span className="text-blue-600 font-bold text-lg">₹{subtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;