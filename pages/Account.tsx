import React from 'react';
import { usePet } from '../context/PetContext';
import { Settings, MapPin, Phone, HelpCircle, Package, LogOut } from 'lucide-react';

export const Account: React.FC = () => {
  const { user } = usePet();

  const menuItems = [
    { icon: Package, label: '我的订单' },
    { icon: MapPin, label: '收货地址' },
    { icon: HelpCircle, label: '联系客服' },
    { icon: Settings, label: '通用设置' },
  ];

  return (
    <div className="px-4 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
            <img src="https://picsum.photos/id/64/200/200" alt="User" className="w-full h-full object-cover"/>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.mobile}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {menuItems.map((item, index) => (
          <button 
            key={item.label}
            className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-primary-50 text-primary-500 p-2 rounded-lg">
                <item.icon size={20} />
              </div>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
            <div className="text-gray-400">›</div>
          </button>
        ))}
      </div>

      <button className="mt-8 w-full flex items-center justify-center space-x-2 text-gray-400 py-3">
        <LogOut size={18} />
        <span>退出登录</span>
      </button>
    </div>
  );
};