import React from 'react';
import { usePet } from '../context/PetContext';
import { Edit3, Tag, Bone, Scale, AlertTriangle, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { currentDog } = usePet();
  const navigate = useNavigate();

  if (!currentDog) return null;

  const recipe = currentDog.recipe;
  const hasAllergens = currentDog.allergens && currentDog.allergens.length > 0;

  const handleDownloadRecipe = (e: React.MouseEvent, recipeName: string) => {
    e.stopPropagation();
    const btn = e.currentTarget as HTMLButtonElement;
    // Simple mock feedback
    const originalIcon = btn.innerHTML;
    btn.classList.add('text-green-600');
    setTimeout(() => {
        alert(`✅ 「${recipeName}」配方卡已下载`);
        btn.classList.remove('text-green-600');
    }, 500);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      
      {/* Basic Info Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-lg font-bold text-gray-900">基础档案</h2>
          <button 
            onClick={() => navigate(`/edit-dog/${currentDog.id}`)}
            className="text-primary-500 text-sm font-medium flex items-center space-x-1 p-2 -mr-2 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Edit3 size={14} />
            <span>编辑</span>
          </button>
        </div>
        
        {/* Updated Grid for Breed Support */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">品种</div>
            <div className="text-lg font-bold text-gray-800 truncate">{currentDog.breed || '未知'}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">年龄</div>
            <div className="text-lg font-bold text-gray-800">{currentDog.age} <span className="text-xs font-normal text-gray-500">岁</span></div>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">体重</div>
            <div className="text-lg font-bold text-gray-800">{currentDog.currentWeight} <span className="text-xs font-normal text-gray-500">kg</span></div>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 mb-1">绝育状态</div>
            <div className="text-lg font-bold text-gray-800">{currentDog.isNeutered ? '已绝育' : '未绝育'}</div>
          </div>
        </div>

        {/* Allergen Warning Section */}
        {hasAllergens && (
          <div className="mt-6 pt-5 border-t border-gray-100">
             <div className="flex items-center text-xs text-red-500 font-bold mb-2">
                <AlertTriangle size={14} className="mr-1" />
                <span>已知过敏源</span>
             </div>
             <div className="flex flex-wrap gap-2">
                {currentDog.allergens.map(a => (
                  <span key={a} className="px-2 py-1 rounded bg-red-50 text-red-600 text-xs font-medium border border-red-100">
                    {a}
                  </span>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* Recipe Card */}
      {recipe ? (
        <div className="bg-white rounded-2xl p-0 shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-primary-50 p-4 border-b border-primary-100 flex justify-between items-center">
             <div className="flex-1">
                <div className="text-xs text-primary-600 font-bold tracking-wider uppercase">Current Plan</div>
                <h2 className="text-lg font-bold text-gray-900">{recipe.name}</h2>
             </div>
             <div className="flex items-center space-x-3">
                 <button 
                    onClick={(e) => handleDownloadRecipe(e, recipe.name)}
                    className="p-2 bg-white/50 rounded-full text-primary-600 hover:bg-white transition-colors shadow-sm"
                    title="下载配方卡"
                 >
                    <Download size={18} />
                 </button>
             </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Meat % */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                 <span className="text-gray-500">含肉量</span>
                 <span className="font-bold text-gray-900">{recipe.meatPercentage}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${recipe.meatPercentage}%` }}></div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map(tag => (
                <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-secondary-50 text-secondary-500">
                   <Tag size={12} className="mr-1" />
                   {tag}
                </span>
              ))}
            </div>

            {/* Ingredients */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-2">核心成分</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {recipe.ingredients.join(' · ')}
              </p>
            </div>
            
            <div className="text-center">
                 <p className="text-xs text-gray-300">配方更新于: {recipe.lastUpdated}</p>
                 <button 
                    onClick={() => navigate(`/customize-plan/${currentDog.id}`)}
                    className="mt-4 text-xs text-primary-500 font-bold underline"
                 >
                    重新评估方案
                 </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-center">
            <Scale className="mx-auto text-gray-300 mb-2" size={32} />
            <p className="text-gray-500 text-sm">暂无激活配方</p>
            <button 
               onClick={() => navigate(`/customize-plan/${currentDog.id}`)}
               className="mt-2 text-primary-500 text-sm font-bold bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"
            >
               生成定制配方
            </button>
        </div>
      )}
    </div>
  );
};