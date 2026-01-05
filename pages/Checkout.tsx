import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePet } from '../context/PetContext';
import { ArrowLeft, Check, ShieldCheck, Info, Drumstick, Carrot, Fish, Pill } from 'lucide-react';

// Mock Package Data
const PACKAGES = [
  { id: 'pkg_2week', name: '双周尝鲜装', duration: '14天', weightMultiplier: 0.5, priceMultiplier: 0.55, tag: null },
  { id: 'pkg_month', name: '月度标准装', duration: '30天', weightMultiplier: 1.0, priceMultiplier: 1.0, tag: '推荐' },
  { id: 'pkg_quarter', name: '季度囤货装', duration: '90天', weightMultiplier: 3.0, priceMultiplier: 2.7, tag: '省 10%' },
];

export const Checkout: React.FC = () => {
  const { dogId } = useParams<{ dogId: string }>();
  const navigate = useNavigate();
  const { dogs } = usePet();
  
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg_month');
  
  // Base Pricing (Per KG)
  const UNIT_PRICE = 60; 

  const mainDog = dogs.find(d => d.id === dogId);

  // Calculation Logic
  const getPackageDetails = (dog: typeof mainDog, pkgId: string) => {
    if (!dog) return { price: 0, weight: 0 };
    const pkg = PACKAGES.find(p => p.id === pkgId) || PACKAGES[1];
    
    const weight = dog.totalFoodWeight * pkg.weightMultiplier;
    const price = Math.round((dog.totalFoodWeight * UNIT_PRICE) * pkg.priceMultiplier);
    
    return { price, weight, pkg };
  };

  const calculateTotal = () => {
    if (!mainDog) return 0;
    return getPackageDetails(mainDog, selectedPackageId).price;
  };

  if (!mainDog) return <div>Dog not found</div>;

  const currentPkgDetails = getPackageDetails(mainDog, selectedPackageId);
  const recipe = mainDog.recipe;
  
  // Ingredient Analysis Mockup based on recipe data
  const meatPct = recipe?.meatPercentage || 65;
  const vegPct = 25; // Mock fixed for now
  const microPct = 100 - meatPct - vegPct;

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Navbar */}
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-50 shadow-sm/50 backdrop-blur-md bg-white/80">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold ml-2">确认订单</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* 1. RECIPE TRANSPARENCY CARD (THE HERO) */}
        <div className="bg-white rounded-3xl p-5 shadow-xl shadow-gray-100 overflow-hidden relative border border-gray-100">
           {/* Header Tag */}
           <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <span className="inline-block px-2 py-1 bg-black text-white text-[10px] font-bold rounded mb-2 tracking-wider">
                  CUSTOM RECIPE
                </span>
                <h2 className="text-xl font-black text-gray-900 leading-tight">
                  {mainDog.name}的<br />
                  <span className="text-primary-500">{recipe?.name || '专属定制粮'}</span>
                </h2>
              </div>
              <img 
                src={mainDog.avatarUrl} 
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                alt={mainDog.name}
              />
           </div>

           {/* Ingredient Visuals (Icons) */}
           <div className="flex justify-between items-center mb-6 px-2 relative z-10">
              <div className="flex flex-col items-center space-y-2">
                 <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
                    <Drumstick size={24} />
                 </div>
                 <span className="text-xs font-medium text-gray-600">鲜肉源</span>
              </div>
              <div className="w-8 border-t-2 border-dashed border-gray-200"></div>
              <div className="flex flex-col items-center space-y-2">
                 <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                    <Carrot size={24} />
                 </div>
                 <span className="text-xs font-medium text-gray-600">果蔬纤维</span>
              </div>
              <div className="w-8 border-t-2 border-dashed border-gray-200"></div>
              <div className="flex flex-col items-center space-y-2">
                 <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                    <Fish size={24} />
                 </div>
                 <span className="text-xs font-medium text-gray-600">鱼油/微量</span>
              </div>
           </div>

           {/* The "Transparent" Ratio Bar */}
           <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
                 <span>成分分析</span>
                 <span className="flex items-center text-green-600">
                   <ShieldCheck size={12} className="mr-1" />
                   100% 透明
                 </span>
              </div>
              
              {/* Stacked Bar */}
              <div className="flex w-full h-4 rounded-full overflow-hidden mb-3">
                 <div style={{ width: `${meatPct}%` }} className="h-full bg-gradient-to-r from-orange-400 to-orange-500" />
                 <div style={{ width: `${vegPct}%` }} className="h-full bg-green-400" />
                 <div style={{ width: `${microPct}%` }} className="h-full bg-blue-400" />
              </div>

              {/* Legend Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                 <div>
                    <div className="text-lg font-black text-gray-900">{meatPct}%</div>
                    <div className="text-[10px] text-gray-400 font-medium">动物蛋白</div>
                 </div>
                 <div>
                    <div className="text-lg font-black text-gray-900">{vegPct}%</div>
                    <div className="text-[10px] text-gray-400 font-medium">果蔬植萃</div>
                 </div>
                 <div>
                    <div className="text-lg font-black text-gray-900">{microPct}%</div>
                    <div className="text-[10px] text-gray-400 font-medium">功能添加</div>
                 </div>
              </div>
           </div>

           {/* Decorative Background Blob */}
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary-50 to-orange-50 rounded-full blur-2xl -z-0 pointer-events-none"></div>
        </div>

        {/* 2. PACKAGE SELECTION */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">
            选择规格
          </h3>
          <div className="space-y-3">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;
              const details = getPackageDetails(mainDog, pkg.id);
              
              return (
                <div 
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`
                    relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center group
                    ${isSelected 
                      ? 'bg-gray-900 border-gray-900 shadow-lg scale-[1.02]' 
                      : 'bg-white border-gray-100 hover:border-gray-200'}
                  `}
                >
                  <div className="flex items-center space-x-4">
                     {/* Radio Circle */}
                     <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                        ${isSelected ? 'border-primary-500' : 'border-gray-200'}
                     `}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />}
                     </div>

                     <div>
                        <div className="flex items-center">
                           <span className={`text-base font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                             {pkg.name}
                           </span>
                           {pkg.tag && (
                              <span className="ml-2 px-1.5 py-0.5 bg-primary-500 text-white text-[10px] font-bold rounded">
                                 {pkg.tag}
                              </span>
                           )}
                        </div>
                        <div className={`text-xs mt-1 ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>
                           约 {details.weight.toFixed(1)}kg · 够吃{pkg.duration}
                        </div>
                     </div>
                  </div>

                  <div className="text-right">
                     <div className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        <span className="text-sm font-normal mr-0.5">¥</span>
                        {details.price}
                     </div>
                     {pkg.id === 'pkg_quarter' && (
                        <div className="text-[10px] text-gray-500 line-through">¥{Math.round(details.price * 1.1)}</div>
                     )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-100 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] safe-area-bottom z-50">
         <div className="flex justify-between items-center max-w-md mx-auto">
            <div>
               <div className="flex items-baseline space-x-1">
                 <span className="text-sm text-gray-900 font-bold">合计</span>
                 <span className="text-2xl font-black text-primary-600">
                   <span className="text-base mr-0.5">¥</span>{calculateTotal().toFixed(0)}
                 </span>
               </div>
               <p className="text-[10px] text-gray-400 mt-0.5">
                 {currentPkgDetails.weight.toFixed(1)}kg 定制粮 · 免运费
               </p>
            </div>
            <button 
              className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-xl shadow-gray-200 active:scale-95 transition-transform flex items-center"
              onClick={() => alert(`模拟下单: ¥${calculateTotal()}\n包含: ${mainDog.name} (${PACKAGES.find(p=>p.id===selectedPackageId)?.name})`)}
            >
              立即下单
            </button>
         </div>
      </div>

    </div>
  );
};