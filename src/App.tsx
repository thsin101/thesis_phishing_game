import React, { useState } from 'react';
import './App.css';
import Mission1 from './components/Mission1';
import Mission2 from './components/Mission2';
import Mission3 from './components/Mission3';
import Mission4 from './components/Mission4';
import robotImage from './Roboter.png'; // Roboter-Bild importieren

type MissionKey = 'mission1' | 'mission2' | 'mission3' | 'mission4' | null;

const App: React.FC = () => {
  const [active, setActive] = useState<MissionKey>(null);
  const [completedMissions, setCompletedMissions] = useState<Set<MissionKey>>(new Set());
  const [showIntro, setShowIntro] = useState(true); // Zustand für das Intro-Fenster
  const [showPostMission1Modal, setShowPostMission1Modal] = useState(false); // Zustand für das Fenster nach Mission 1
  const [showPostMission2Modal, setShowPostMission2Modal] = useState(false); // Zustand für das Fenster nach Mission 2
  const [showPostMission4Modal, setShowPostMission4Modal] = useState(false); // Zustand für das Fenster nach Mission 4

  const openMission = (key: MissionKey) => setActive(key);

  const closeMission = () => {
    if (active) {
      const newCompleted = new Set(completedMissions);
      newCompleted.add(active);
      setCompletedMissions(newCompleted);

      // Fenster nach Mission 1, 2, 4 anzeigen
      if (active === 'mission1') {
        setShowPostMission1Modal(true);
      } else if (active === 'mission2') {
        setShowPostMission2Modal(true);
      } else if (active === 'mission4') {
        setShowPostMission4Modal(true);
      }
    }
    setActive(null);
  };

  const isMissionCompleted = (key: MissionKey) => key ? completedMissions.has(key) : false;

  return (
    <>
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-modal">
            <img src={robotImage} alt="Roboter Jeremy" className="intro-robot-image" />
            <div className="intro-text">
              <h2>Verdächtige Aktivitäten! Unterstützung gebraucht</h2>
              <p>
                Hi, ich bin der <strong>KI-Verteidigungsroboter Jerry</strong> des Unternehmens, der jedem Studenten im Unternehmen zugeordnet wird. Angreifende haben dich ins Visier genommen, um Informationen zu sammeln.
              </p>
              <p>
                Ich habe die Lage analysiert und eine Zusammenfassung erstellt. Lass uns gemeinsam herausfinden, wieso du das Ziel bist! Es gibt insgesamt <strong>4 Missionen</strong>, die du spielen kannst. Jede Mission hilft mir, die Angriffe besser zu verstehen und unser Unternehmen zu schützen.
              </p>
            </div>
            <button onClick={() => setShowIntro(false)} className="intro-button">Weiter gehts!</button>
          </div>
        </div>
      )}

      {showPostMission1Modal && (
        <div className="intro-overlay">
          <div className="intro-modal">
            <img src={robotImage} alt="Roboter Jeremy" className="intro-robot-image" />
            <div className="intro-text">
              <h2>Ich habe eine Idee!</h2>
              <p>
                Anscheinend haben Angreifende Killian Schuster als Ziel ausgewählt und ihn imitiert, um durch dich an sensible Informationen zu gelangen.
              </p>
              <p>
                Wie haben es die Angreifenden geschafft nur durch meine Sicherheitsmechanismen zu gelangen? Ich analysiere die Situation...
              </p>
              <p>
                Anscheinend haben die Angreifenden, öffentliche Informationen beschaffen und analysiert. Die Bezeichnung dafür ist OSINT.
                Finden wir heraus, wieso Killian ins Visier genommen wurde. Ich analysiere das Internet nach Informationen über Killian Schuster.
              </p>
            </div>
            <button onClick={() => setShowPostMission1Modal(false)} className="intro-button">Verstanden!</button>
          </div>
        </div>
      )}

      {showPostMission2Modal && (
        <div className="intro-overlay">
          <div className="intro-modal">
            <img src={robotImage} alt="Roboter Jeremy" className="intro-robot-image" />
            <div className="intro-text">
              <h2>Notfall detektiert!</h2>
              <p>
                Momentan wird das Unternehmen von Cyberangriffen anvisiert! Ich muss umgehend reagieren. Bereite einen Sicherheitsbericht vor, um die Künstliche Intelligenz zu verbessern und zukünftige Angriffe zu verhindern.
              </p>
            </div>
            <button onClick={() => setShowPostMission2Modal(false)} className="intro-button">Weiter</button>
          </div>
        </div>
      )}

      {showPostMission4Modal && (
        <div className="intro-overlay">
          <div className="intro-modal">
            <img src={robotImage} alt="Roboter Jeremy" className="intro-robot-image" />
            <div className="intro-text">
              <h2>Mission abgeschlossen!</h2>
              <p>
                Du kannst jetzt zur Studie zurückkehren, um die Post-Studie zu starten und die Erkenntnisse zu teilen. Danke für die Teilnahme!
              </p>
            </div>
            <button onClick={() => setShowPostMission4Modal(false)} className="intro-button">Zurück zur Studie</button>
          </div>
        </div>
      )}

      {/* Background content that is blurred when a mission or intro is active */}
      <div className={active || showIntro || showPostMission1Modal || showPostMission2Modal ? 'blur' : ''}>
        <div className="missions-container">
          <div className="mission-card">
            <div className="mission-title">Wo war die Sicherheitslücke?</div>
            <div className="mission-desc">
              Finde verdächtige Mails (Phishing & Spear-Phishing Mails), um den Angriff weiter einzuordnen.
            </div>
            <button onClick={() => openMission('mission1')} disabled={isMissionCompleted('mission1')}>Spiele Mission 1</button>
          </div>
          <div className="mission-card">
            <div className="mission-title">Wieso haben sie diese Person ins Visier genommen?</div>
            <div className="mission-desc">
              Finde heraus, woher Angreifende Informationen sammeln!
            </div>
            <button onClick={() => openMission('mission2')} disabled={!isMissionCompleted('mission1') || isMissionCompleted('mission2')}>Spiele Mission 2</button>
          </div>
          <div className="mission-card">
            <div className="mission-title">Ihr Amazon-Paket!</div>
            <div className="mission-desc">
              Auch wenn man etwas erwartet, sollte man achtsam sein. Sei bei Links oder QR-Codes vorsichtig.
            </div>
            <button onClick={() => openMission('mission3')} disabled={!isMissionCompleted('mission2') || isMissionCompleted('mission3')}>Spiele Mission 3</button>
          </div>
          <div className="mission-card">
          <div className="mission-title">Sicherheitsbericht</div>
          <div className="mission-desc">
            Fassen wir zusammen, worauf wir achten sollten.
          </div>
          <button onClick={() => openMission('mission4')} disabled={!isMissionCompleted('mission3') || isMissionCompleted('mission4')}>Spiele Mission 4</button>
        </div>
        </div>
      </div>

      {/* Modal overlay stays outside blurred container, remains sharp */}
      {active && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeMission}>×</button>
            {active === 'mission1' && <Mission1 onClose={closeMission} />}
            {active === 'mission2' && <Mission2 onClose={closeMission} />}
            {active === 'mission3' && <Mission3 onClose={closeMission} />}
            {active === 'mission4' && <Mission4 onClose={closeMission} />}
          </div>
        </div>
      )}

      

    
    </>
  );
};

export default App;