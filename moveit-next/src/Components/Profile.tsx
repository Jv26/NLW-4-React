import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/Jv26.png" alt="João victor"></img>
      <div>
        <strong>João victor </strong>
        <p>
          <img src='icons/Level.svg' alt="Level" />
          level {level}</p>
      </div>
    </div>
  );
}