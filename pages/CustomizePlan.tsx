import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePet } from '../context/PetContext';
import { Recipe } from '../types';
import { Sparkles, CheckCircle, ShieldCheck, Activity, ArrowRight, Loader2, Download, Utensils, Share2 } from 'lucide-react';

export const CustomizePlan: React.FC = () => {
  const { dogId } = useParams<{ dogId: string }>();
  const navigate = useNavigate();
  const { dogs, updateDog } = usePet();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisStep, setAnalysisStep] = useState(0);

  const dog = dogs.find(d => d.id === dogId);

  // Analysis Steps Animation
  useEffect(() => {
    if (!dog) return;
    
    const steps = [
      "正在分析品种特征...",
      `正在计算 ${dog.currentWeight}kg 体重的热量需求...`,
      dog.allergens?.length ? `检测到过敏源，正在调整蛋白质来源...` : "正在优化微量元素配比...",
      "方案生成完毕！"
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsAnalyzing(false), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [dog]);

  if (!dog) return <div className="p-8">Dog not found</div>;

  // Mock Generation Logic based on Dog Data
  const hasChickenAllergy = dog.allergens?.some(a => a.includes('鸡'));
  const isPuppy = dog.age < 1;

  // Recipe Option A (Standard/Recommended)
  const recipeA: Recipe = {
    id: `r_${Date.now()}_A`,
    dogId: dog.id,
    name: hasChickenAllergy ? '深海鱼臻享配方' : '鲜鸡肉活力配方',
    tags: hasChickenAllergy ? ['低敏', '亮毛', '无谷'] : ['高蛋白', '易吸收', '强健'],
    meatPercentage: isPuppy ? 82 : 75,
    ingredients: hasChickenAllergy 
      ? ['三文鱼', '金枪鱼', '红薯', '南瓜', '鱼油'] 
      : ['鲜鸡胸肉', '鸡肝', '燕麦', '胡萝卜', '蛋黄'],
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  // Recipe Option B (Alternative)
  const recipeB: Recipe = {
    id: `r_${Date.now()}_B`,
    dogId: dog.id,
    name: '草饲牛壮骨配方',
    tags: ['强壮骨骼', '高能量'],
    meatPercentage: 78,
    ingredients: ['牛肉', '牛心', '西蓝花', '紫薯', '牛骨粉'],
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  const handleSelectRecipe = (recipe: Recipe, isDIY: boolean = false) => {
    // 1. Update Dog with new Recipe
    // 2. Set default inventory to 0 (user needs to buy)
    const updatedDog = {
      ...dog,
      recipe: recipe,
      inventoryDays: 0, 
      totalFoodWeight: 5.0, // Mock default target for ordering
      remainingFoodWeight: 0
    };
    
    updateDog(updatedDog);
    
    if (isDIY) {
       // Explain clearly what DIY mode means
       alert(`👨‍🍳 已切换至「自制喂养模式」\n\n系统逻辑已变更：\n1. 停止计算“成品粮库存预警”。\n2. 首页将为您展示“每日食材建议克重”。\n3. 营养分析将基于您实际制作的配比。`);
    }
    
    navigate('/home');
  };

  const handleDownloadRecipe = (e: React.MouseEvent, recipeName: string) => {
    e.stopPropagation();
    // Simulate Image Generation and Download
    const btn = e.currentTarget as HTMLButtonElement;
    const originalContent = btn.innerHTML;
    
    // Loading state
    btn.innerHTML = `<span class="animate-spin mr-1">⏳</span> 生成中...`;
    
    setTimeout(() => {
      alert(`✅ 「${recipeName}」详细配方卡已保存到相册！\n\n包含：\n- 原料配比表\n- 营养成分分析\n- 每日喂食建议`);
      btn.innerHTML = originalContent;
    }, 1000);
  };

  // ------------------- VIEW: ANALYZING -------------------
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-8">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="text-primary-500" size={40} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg">
             <Loader2 className="animate-spin text-primary-600" size={20} />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
          为 {dog.name} 定制中
        </h2>
        
        <div className="h-8 flex items-center justify-center">
           <p className="text-sm text-gray-500 animate-fade-in text-center">
             {[
               "正在分析品种特征...",
               `正在计算 ${dog.currentWeight}kg 体重的热量需求...`,
               dog.allergens?.length ? `检测到过敏源，正在调整蛋白质来源...` : "正在优化微量元素配比...",
               "方案生成完毕！"
             ][analysisStep]}
           </p>
        </div>

        {/* Fake Progress Bar */}
        <div className="w-64 h-1.5 bg-gray-100 rounded-full mt-8 overflow-hidden">
          <div 
            className="h-full bg-primary-500 transition-all duration-1000 ease-out" 
            style={{ width: `${(analysisStep + 1) * 25}%` }}
          />
        </div>
      </div>
    );
  }

  // ------------------- VIEW: SELECTION -------------------
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white px-4 py-5 shadow-sm sticky top-0 z-10">
        <h1 className="text-lg font-bold text-center">定制方案结果</h1>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-500 mb-4 px-1">
          根据 {dog.name} 的数据，我们为您生成了以下专属配方：
        </p>

        {/* Card A - Recommended */}
        <div className="bg-white rounded-2xl p-5 border-2 border-primary-500 shadow-xl shadow-primary-50 relative overflow-hidden group">
           <div className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
             AI 推荐
           </div>
           
           <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900">{recipeA.name}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {recipeA.tags.map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right mt-4">
                <div className="text-2xl font-black text-primary-600">{recipeA.meatPercentage}%</div>
                <div className="text-[10px] text-gray-400">含肉量</div>
              </div>
           </div>

           <div className="space-y-3 mb-6">
              <div className="flex items-center text-xs text-gray-600">
                 <ShieldCheck size={14} className="text-green-500 mr-2" />
                 <span>符合 AAFCO 营养标准</span>
              </div>
              {hasChickenAllergy && (
                <div className="flex items-center text-xs text-gray-600">
                  <CheckCircle size={14} className="text-green-500 mr-2" />
                  <span>已剔除过敏源：{dog.allergens?.join(', ')}</span>
                </div>
              )}
              <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-500 leading-relaxed">
                 <span className="font-bold text-gray-700">核心成分：</span>
                 {recipeA.ingredients.join('、')}
              </div>
           </div>

           {/* Main CTA */}
           <button 
             onClick={() => handleSelectRecipe(recipeA, false)}
             className="w-full bg-primary-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-200 active:scale-95 transition-transform flex items-center justify-center space-x-2 mb-4"
           >
             <span>采用此方案 (定制粮)</span>
             <ArrowRight size={16} />
           </button>

           {/* Secondary Actions Row */}
           <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button 
                onClick={(e) => handleDownloadRecipe(e, recipeA.name)}
                className="flex items-center space-x-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors px-2 py-1 rounded active:bg-gray-50"
              >
                <Download size={14} />
                <span>下载配方卡</span>
              </button>
              
              <div className="h-3 w-[1px] bg-gray-200"></div>

              <button 
                onClick={() => handleSelectRecipe(recipeA, true)}
                className="flex items-center space-x-1.5 text-xs text-orange-600 font-bold hover:text-orange-700 transition-colors px-2 py-1 rounded active:bg-orange-50"
              >
                <Utensils size={14} />
                <span>启用自制模式</span>
              </button>
           </div>
        </div>

        {/* Card B - Alternative */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative mt-4 opacity-90">
           <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-700">{recipeB.name}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {recipeB.tags.map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-400">{recipeB.meatPercentage}%</div>
                <div className="text-[10px] text-gray-400">含肉量</div>
              </div>
           </div>

           <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-500 leading-relaxed mb-4">
              <span className="font-bold text-gray-700">核心成分：</span>
              {recipeB.ingredients.join('、')}
           </div>

           <button 
             onClick={() => handleSelectRecipe(recipeB, false)}
             className="w-full bg-white border border-gray-200 text-gray-600 font-bold py-3 rounded-xl active:bg-gray-50 transition-colors mb-3"
           >
             选择备选方案
           </button>

           {/* Secondary Actions B */}
           <div className="flex justify-center pt-2">
              <button 
                onClick={(e) => handleDownloadRecipe(e, recipeB.name)}
                className="flex items-center space-x-1 text-xs text-gray-400 px-3 py-1"
              >
                <Download size={12} />
                <span>下载配方卡</span>
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};