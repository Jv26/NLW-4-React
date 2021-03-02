import { Component, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext, CountdownProvider } from '../contexts/CountDowncontext';
import styles from '../styles/components/ChallengeBox.module.css'


export function ChallengeBox() {
  const { resetChallenge, activeChallenge, completedChallenge } = useContext(ChallengesContext)
  const { resetCountdown } = useContext(CountdownContext);


  function handleChallengeSucceeded() {
    completedChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header> {activeChallenge.amount}</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Level Up" />
            <strong> Novo desafio</strong>
            <p> {activeChallenge.description}.</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
              </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
x
        </div>
      ) : (
          <div className={styles.challengeNotactive}>
            <strong> Finalize um ciclo para receber um desafio </strong>
            <p>
              <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando desafios.
            </p>
          </div>
        )}
    </div>
  )
}