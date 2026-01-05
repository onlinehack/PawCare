import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { usePet } from '../context/PetContext';
import { AlertCircle, ArrowRight, Frown, Smile, ShoppingBag } from 'lucide-react';

export const Home: React.FC = () => {
  const { currentDog } = usePet();
  const navigate = useNavigate();

  if (!currentDog) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  const isLowInventory = currentDog.inventoryDays < 5;
  
  // Data for the Donut Chart
  const chartData = [
    { name: 'Remaining', value: currentDog.remainingFoodWeight },
    { name: 'Consumed', value: currentDog.totalFoodWeight - currentDog.remainingFoodWeight },
  ];
  const chartColors = [isLowInventory ? '#ef4444' : '#f97316', '#e5e7eb'];

  return (
    <div className="px-4 py-6 space-y-6">
      
      {/* Header Greeting */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-gray-500 text-sm">Hi, {currentDog.name} 的铲屎官</h2>
          <h1 className="text-2xl font-bold text-gray-900">
            {isLowInventory ? '余粮告急 ⚠️' : '喂养计划正常'}
          </h1>
        </div>
      </div>

      {/* Main Status Card */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-100 border border-gray-100 relative overflow-hidden">
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-0 opacity-50"></div>

        <div className="flex flex-col items-center justify-center relative z-10">
          {/* Donut Chart */}
          <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                  paddingAngle={5}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-gray-400 text-xs uppercase tracking-wider">预计还剩</span>
              <span className={`text-4xl font-black ${isLowInventory ? 'text-red-500' : 'text-primary-600'}`}>
                {currentDog.inventoryDays}
              </span>
              <span className="text-gray-500 text-sm font-medium">天</span>
            </div>
          </div>

          {/* Details */}
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-800">{currentDog.remainingFoodWeight.toFixed(1)}kg</span>
            <span>/</span>
            <span>{currentDog.totalFoodWeight.toFixed(1)}kg</span>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate(`/checkout/${currentDog.id}`)}
            className={`
              mt-6 w-full py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all active:scale-95
              ${isLowInventory 
                ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                : 'bg-primary-500 text-white shadow-lg shadow-primary-200'}
            `}
          >
            {isLowInventory ? <AlertCircle size={20} /> : <ShoppingBag size={20} />}
            <span>给 {currentDog.name} 补货</span>
          </button>
        </div>
      </div>

      {/* Quick Actions - Poop Tracker */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">今日状态</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3 active:bg-green-50">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Smile size={20} />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-800">便便正常</div>
              <div className="text-xs text-gray-400">一键记录</div>
            </div>
          </button>

          <button className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3 active:bg-yellow-50">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <Frown size={20} />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-800">略有异常</div>
              <div className="text-xs text-gray-400">需调整配方?</div>
            </div>
          </button>
        </div>
      </div>

      {/* Promo / Insight */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-lg">专属健康周报</h4>
            <p className="text-indigo-100 text-sm mt-1">{currentDog.name} 本周体重变化 +0.1kg</p>
          </div>
          <div className="bg-white/20 p-2 rounded-full">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>

    </div>
  );
};