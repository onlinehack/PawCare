import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PetProvider, usePet } from './context/PetContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Account } from './pages/Account';
import { Checkout } from './pages/Checkout';
import { Onboarding } from './pages/Onboarding';
import { AddDog } from './pages/AddDog';
import { EditDog } from './pages/EditDog';
import { CustomizePlan } from './pages/CustomizePlan';

const AppRoutes: React.FC = () => {
  const { hasDogs } = usePet();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Redirect root based on dog existence */}
        <Route index element={hasDogs ? <Navigate to="/home" replace /> : <Onboarding />} />
        
        <Route path="home" element={hasDogs ? <Home /> : <Navigate to="/" replace />} />
        <Route path="profile" element={hasDogs ? <Profile /> : <Navigate to="/" replace />} />
        <Route path="account" element={<Account />} />
      </Route>
      
      {/* Full screen routes outside layout shell */}
      <Route path="/checkout/:dogId" element={<Checkout />} />
      <Route path="/add-dog" element={<AddDog />} />
      <Route path="/edit-dog/:dogId" element={<EditDog />} />
      <Route path="/customize-plan/:dogId" element={<CustomizePlan />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <PetProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </PetProvider>
  );
};

export default App;