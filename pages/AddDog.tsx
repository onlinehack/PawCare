import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePet } from '../context/PetContext';
import { Dog } from '../types';
import { BREED_OPTIONS } from '../services/mockData';
import { ArrowLeft, Camera, AlertTriangle } from 'lucide-react';

export const AddDog: React.FC = () => {
  const navigate = useNavigate();
  const { addDog, hasDogs } = usePet();
  
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [isNeutered, setIsNeutered] = useState(false);
  const [allergensInput, setAllergensInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !weight || !breed) return;

    // Parse allergens from input string
    const allergensList = allergensInput
      .split(/[,，\s]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && s !== '无' && s !== '无过敏');

    // Create Dog WITHOUT a recipe initially
    const newDog: Dog = {
      id: `d_${Date.now()}`,
      name,
      breed,
      allergens: allergensList,
      avatarUrl: `https://picsum.photos/seed/${encodeURIComponent(name)}/200/200`,
      currentWeight: parseFloat(weight),
      age: parseFloat(age) || 0,
      isNeutered,
      inventoryDays: 0, // No food yet
      totalFoodWeight: 0,
      remainingFoodWeight: 0,
      status: 'active',
      recipe: undefined // Recipe will be set in the next step
    };

    addDog(newDog);
    
    // Redirect to the new Plan Customization Flow
    navigate(`/customize-plan/${newDog.id}`);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-100">
        {hasDogs && (
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 mr-2">
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-900">添加爱宠</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8 flex-1 overflow-y-auto pb-20">
        
        {/* Avatar Setup Visual */}
        <div className="flex flex-col items-center">
           <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 relative mb-2">
              <Camera className="text-gray-400" size={32} />
           </div>
           <span className="text-xs text-gray-400">上传头像 (自动生成)</span>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">狗狗昵称</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
              placeholder="请输入昵称"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">狗狗品种</label>
            <input 
              type="text"
              required
              list="breed-options"
              value={breed}
              onChange={e => setBreed(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
              placeholder="请输入或选择品种"
            />
            <datalist id="breed-options">
              {BREED_OPTIONS.map(b => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">体重 (kg)</label>
              <input 
                type="number" 
                required
                step="0.1"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                placeholder="0.0"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">年龄 (岁)</label>
              <input 
                type="number" 
                step="0.1"
                value={age}
                onChange={e => setAge(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">绝育状态</label>
             <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setIsNeutered(true)}
                  className={`py-3 rounded-xl border font-medium transition-all ${isNeutered ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-200 text-gray-500'}`}
                >
                  已绝育
                </button>
                <button
                  type="button"
                  onClick={() => setIsNeutered(false)}
                  className={`py-3 rounded-xl border font-medium transition-all ${!isNeutered ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-200 text-gray-500'}`}
                >
                  未绝育
                </button>
             </div>
          </div>

          {/* Allergens Selection */}
          <div>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <AlertTriangle size={16} className="text-orange-500 mr-1" />
              过敏源回避
            </label>
            <input 
              type="text"
              value={allergensInput}
              onChange={e => setAllergensInput(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
              placeholder="例如：鸡肉，玉米，大豆 (用逗号分隔)"
            />
            <p className="mt-2 text-xs text-gray-400">我们将根据过敏源自动调整配方成分。</p>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-200 active:scale-95 transition-transform mt-8 flex items-center justify-center space-x-2"
        >
          <span>下一步：定制专属方案</span>
        </button>

      </form>
    </div>
  );
};