import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Dog, User } from '../types';
import { MOCK_DOGS, MOCK_USER } from '../services/mockData';

interface PetContextType {
  dogs: Dog[];
  currentDog: Dog | undefined;
  user: User;
  switchDog: (dogId: string) => void;
  addDog: (dog: Dog) => void;
  updateDog: (dog: Dog) => void;
  hasDogs: boolean;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentDogId, setCurrentDogId] = useState<string | null>(null);
  const [user] = useState<User>(MOCK_USER);

  // Initialize Data
  useEffect(() => {
    // Simulate API Fetch
    setTimeout(() => {
      setDogs(MOCK_DOGS);
      
      // Logic: Check localStorage first, otherwise find dog with min inventoryDays
      const savedId = localStorage.getItem('last_viewed_dog_id');
      
      if (savedId && MOCK_DOGS.find(d => d.id === savedId)) {
        setCurrentDogId(savedId);
      } else if (MOCK_DOGS.length > 0) {
        // Auto-select lowest inventory
        const lowestInventoryDog = [...MOCK_DOGS].sort((a, b) => a.inventoryDays - b.inventoryDays)[0];
        setCurrentDogId(lowestInventoryDog.id);
      }
    }, 500);
  }, []);

  const switchDog = (dogId: string) => {
    setCurrentDogId(dogId);
    localStorage.setItem('last_viewed_dog_id', dogId);
  };

  const addDog = (newDog: Dog) => {
    setDogs(prev => [...prev, newDog]);
    switchDog(newDog.id);
  };

  const updateDog = (updatedDog: Dog) => {
    setDogs(prev => prev.map(dog => dog.id === updatedDog.id ? updatedDog : dog));
  };

  const currentDog = dogs.find(d => d.id === currentDogId);
  const hasDogs = dogs.length > 0;

  return (
    <PetContext.Provider value={{ dogs, currentDog, user, switchDog, addDog, updateDog, hasDogs }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
};