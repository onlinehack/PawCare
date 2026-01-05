import React from 'react';
import { Dog as DogIcon, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center bg-white">
      <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <DogIcon size={64} className="text-primary-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">欢迎来到宠爱定制+</h1>
      <p className="text-gray-500 mb-8">
        还没有添加爱宠档案。<br />添加您的第一只狗狗，开启科学喂养之旅。
      </p>
      
      <button
        onClick={() => navigate('/add-dog')}
        className="flex items-center justify-center space-x-2 w-full py-4 bg-primary-500 text-white rounded-xl font-bold shadow-lg shadow-primary-200 active:scale-95 transition-transform"
      >
        <PlusCircle size={20} />
        <span>添加我的爱宠</span>
      </button>
    </div>
  );
};