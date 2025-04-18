import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../context/OrderContext';

const Orders = () => {
  const { t } = useTranslation();
  const { orders, cancelOrder } = useOrders();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('my_orders')}</h1>
        {orders.length > 0 && (
          <div className="flex items-center">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
              {orders.length}
            </span>
            <span className="text-gray-600">{t('orders')}</span>
          </div>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <img
            src="https://img.icons8.com/ios/100/empty-box.png"
            alt="No Orders"
            className="mx-auto mb-4 opacity-60"
          />
          <h3 className="text-lg font-semibold text-gray-700">{t('no_orders')}</h3>
          <p className="text-gray-500">{t('no_orders_description')}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white border rounded-lg p-5 shadow hover:shadow-md transition duration-200"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">{t('order_placed_on')} {new Date(order.date).toLocaleDateString()}</p>
                  <h2 className="text-md font-semibold text-gray-800">{t('order')} #{order.id}</h2>
                  <p className={`text-sm font-medium ${order.status === 'delivered' ? 'text-green-600' : 'text-yellow-600'} capitalize`}>
                    {order.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('delivery_by')}: <span className="text-black font-medium">{new Date(order.deliveryDate).toDateString()}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{t('total')}</p>
                  <p className="text-lg font-bold text-blue-600">₹{order.total}</p>
                  {order.status !== 'delivered' && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="mt-2 text-sm text-red-600 hover:underline"
                    >
                      {t('cancel_order')}
                    </button>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y pt-4 border-t">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-4 gap-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded border"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.quantity} × ₹{item.price}</p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-800 self-center">
                      ₹{item.quantity * item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;