import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, FileText, User } from 'lucide-react';
import { PetSwitcher } from './PetSwitcher';
import { usePet } from '../context/PetContext';

export const Layout: React.FC = () => {
  const location = useLocation();
  const { hasDogs } = usePet();
  
  // Routes where PetSwitcher should appear
  const showSwitcher = ['/home', '/profile'].includes(location.pathname) && hasDogs;
  const hideBottomNav = location.pathname.includes('/checkout') || location.pathname === '/'; // '/' is onboarding if no dogs

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative shadow-2xl overflow-hidden">
      
      {/* Top Pet Switcher */}
      {showSwitcher && (
        <div className="flex-none">
          <PetSwitcher />
        </div>
      )}

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      {!hideBottomNav && hasDogs && (
        <nav className="flex-none bg-white border-t border-gray-100 fixed bottom-0 w-full max-w-md z-50 safe-area-bottom">
          <div className="flex justify-around items-center h-16">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-500'
                }`
              }
            >
              <Home size={24} strokeWidth={2.5} />
              <span className="text-[10px] font-medium">喂养</span>
            </NavLink>
            
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-500'
                }`
              }
            >
              <FileText size={24} strokeWidth={2.5} />
              <span className="text-[10px] font-medium">档案</span>
            </NavLink>

            <NavLink
              to="/account"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-500'
                }`
              }
            >
              <User size={24} strokeWidth={2.5} />
              <span className="text-[10px] font-medium">我的</span>
            </NavLink>
          </div>
        </nav>
      )}
    </div>
  );
};