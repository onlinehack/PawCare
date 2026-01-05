import React from 'react';
import { usePet } from '../context/PetContext';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PetSwitcher: React.FC = () => {
  const { dogs, currentDog, switchDog } = usePet();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white border-b border-gray-100 pt-3 pb-3 px-4 shadow-sm z-20 relative">
      <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar">
        
        {dogs.map((dog) => {
          const isActive = currentDog?.id === dog.id;
          return (
            <button
              key={dog.id}
              onClick={() => switchDog(dog.id)}
              className="flex flex-col items-center flex-shrink-0 transition-all duration-200 focus:outline-none"
            >
              <div 
                className={`
                  relative rounded-full overflow-hidden border-2 transition-all duration-200
                  ${isActive ? 'w-[52px] h-[52px] border-primary-500 ring-2 ring-primary-100' : 'w-[42px] h-[42px] border-transparent opacity-70'}
                `}
              >
                <img 
                  src={dog.avatarUrl} 
                  alt={dog.name} 
                  className="w-full h-full object-cover"
                />
                {/* Low Inventory Badge */}
                {dog.inventoryDays < 5 && !isActive && (
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></div>
                )}
              </div>
              <span 
                className={`mt-1 text-xs max-w-[4rem] truncate font-medium ${isActive ? 'text-primary-600' : 'text-gray-500'}`}
              >
                {dog.name}
              </span>
            </button>
          );
        })}

        {/* Add Dog Button */}
        <button 
          className="flex flex-col items-center flex-shrink-0 group"
          onClick={() => navigate('/add-dog')}
        >
          <div className="w-[42px] h-[42px] rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 group-active:bg-gray-100">
            <Plus size={20} className="text-gray-400" />
          </div>
          <span className="mt-1 text-xs text-gray-400">添加</span>
        </button>
      </div>
    </div>
  );
};