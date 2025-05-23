import React from 'react';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CartDrawer = ({ isOpen, onClose, cartItems = [], onRemove = () => {}, onBuySingle = () => {} }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Safely calculate total
  const total = Array.isArray(cartItems) 
    ? cartItems.reduce((acc, item) => acc + (item?.price || 0) * (item?.quantity || 0), 0)
    : 0;

  const handleProceedToCheckout = () => {
    if (!Array.isArray(cartItems)) {  // Fixed: Added missing parenthesis
      alert(t('cart.invalidCart'));
      return;
    }

    if (cartItems.length === 0) {
      alert(t('cart.emptyCartAlert'));
      return;
    }

    onClose();
    navigate('/checkout');
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">{t('cart.title')}</h2>
        <button onClick={onClose}>
          <X className="text-gray-600" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 h-[calc(100%-160px)] overflow-y-auto space-y-4">
        {!Array.isArray(cartItems) ? (
          <p className="text-red-500">{t('cart.invalidCart')}</p>
        ) : cartItems.length === 0 ? (
          <p className="text-gray-500">{t('cart.emptyCart')}</p>
        ) : (
          cartItems.map((item = {}) => (
            <div
              key={item.id || Math.random().toString(36).substring(2, 9)}
              className="flex items-center gap-4 border p-3 rounded-md justify-between"
            >
              <div className="flex-1">
                <h3 className="font-medium text-sm text-gray-900">{item.name || t('cart.unnamedItem')}</h3>
                <p className="text-sm text-gray-600">₹{(item.price || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-400">{t('cart.quantity')}: {item.quantity || 0}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onBuySingle(item)}
                  className="bg-green-500 text-white px-2 py-1 text-xs rounded hover:bg-green-600 flex items-center gap-1"
                >
                  <ShoppingCart size={14} /> {t('cart.buy')}
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600 flex items-center gap-1"
                >
                  <Trash2 size={14} /> {t('cart.remove')}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex justify-between text-lg font-semibold text-gray-800 mb-3">
          <span>{t('cart.total')}</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
        <button
          onClick={handleProceedToCheckout}
          disabled={!Array.isArray(cartItems) || cartItems.length === 0}
          className={`w-full py-2 rounded-lg transition ${
            !Array.isArray(cartItems) || cartItems.length === 0
              ? 'bg-gray-300 cursor-not-allowed text-gray-600'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {t('cart.proceedToCheckout')}
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;