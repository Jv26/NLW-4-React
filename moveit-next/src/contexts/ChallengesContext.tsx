import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../Components/LevelUpModal';


interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface Challenges {
  type: 'body | eye';
  description: string;
  amount: number;
}

interface challengesContextData {
  level: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenges;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as challengesContextData);

export function ChallengesProvider({ children,
  ...rest
}: ChallengesProviderProps) {

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setcurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setchallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, []
  )

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function closeLevelUpModal() {
    setIsLevelModalOpen(false);
  }

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)

    if (Notification.permission === 'granted') {
      new Audio('/notification.mp3').play();
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
        icon: '/favicon.png'
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setcurrentExperience(finalExperience);
    setActiveChallenge(null);
    setchallengesCompleted(challengesCompleted + 1);

  }

  return (
    <ChallengesContext.Provider value={{
      level,
      levelUp,
      startNewChallenge,
      currentExperience,
      challengesCompleted,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completedChallenge,
      closeLevelUpModal,
    }}>

      {children}

      { isLevelUpModalOpen && < LevelUpModal />}
    </ ChallengesContext.Provider>
  )
}