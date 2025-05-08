
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { UserProfile, IntentLevel } from '../data/types';

interface UserProfileContextType {
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  calculateIntentLevel: (answers: Record<number, IntentLevel>) => IntentLevel;
  isNewUser: boolean;
}

const initialProfile: UserProfile = {
  intentLevel: null,
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    // Try to load from localStorage on initial render
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : initialProfile;
  });
  
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

  // Check if user is new based on profile data
  useEffect(() => {
    if (userProfile.intentLevel !== null) {
      setIsNewUser(false);
    }
  }, [userProfile.intentLevel]);

  // Save to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  // Calculate intent level based on quiz answers
  const calculateIntentLevel = (answers: Record<number, IntentLevel>): IntentLevel => {
    // Count occurrences of each intent level
    const counts: Record<string, number> = {
      high: 0,
      medium: 0,
      low: 0
    };

    Object.values(answers).forEach(level => {
      if (level) counts[level]++;
    });

    // Determine dominant intent level
    if (counts.high >= Math.max(counts.medium, counts.low)) return 'high';
    if (counts.medium >= counts.low) return 'medium';
    return 'low';
  };

  return (
    <UserProfileContext.Provider value={{ 
      userProfile, 
      updateUserProfile, 
      calculateIntentLevel,
      isNewUser
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
