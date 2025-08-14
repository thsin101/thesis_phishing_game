import React, { useState } from 'react';
import './Mission2.css';
import profileImage from '../Profilbild.png'; // Import the image

interface Props { onClose: () => void; }

const Mission2: React.FC<Props> = ({ onClose }) => {
  const [clicked, setClicked] = useState<Record<string, boolean>>({});
  const [showInstruction, setShowInstruction] = useState(true); // Zustand für das Anleitungsfenster

  const explanations: Record<string, string | React.ReactNode> = {
    children: (
      <>
        Die Angabe von Familieninformationen kann für <strong>Social Engineering</strong> missbraucht werden. <strong>Social Engineering</strong> bezeichnet den zwischenmenschlichen Angriff auf die Schwachstelle Mensch, bei dem durch Täuschung sicherheitsrelevante Informationen erschlichen werden. Insbesondere persönliche Informationen können genutzt werden, um Gefühle oder Mitgefühl zu manipulieren.
      </>
    ),
    vacation: "Die öffentliche Bekanntgabe von Abwesenheiten wie Urlaub kann Angreifende ermöglichen, unbemerkt gezielte Attacken durchzuführen.",
    birthday: "Das Teilen des genauen Geburtstags und Alters kann Identitätsdieben helfen, Sicherheitsfragen zu beantworten oder Konten zu kompromittieren. Phishing-Angriffe wie in der Mail zuvor können durch solche Informationen verstärkt werden.",
    project: "Die Nennung interner Projektnamen wie 'Phoenix' kann Angreifern wertvolle Informationen für gezielte Phishing-Angriffe auf das Unternehmen liefern."
  };

  const handleClick = (id: string) => {
    setClicked(prev => ({ ...prev, [id]: true }));
  };

  const allFound = Object.keys(clicked).length === 4;

  const aktivitaeten = [
    {
      id: 'vacation',
      text: 'Nach meiner Beförderung zum Director bei QF-Consulting freue ich mich auf einen wohlverdienten Urlaub mit meiner Familie auf Mallorca! Ich bin ab dem 15. Juli wieder erreichbar.',
      date: 'vor 2 Tagen'
    },
    {
      id: 'article',
      text: 'Habe gerade einen spannenden Artikel über die neuesten Phishing-Taktiken gelesen. Es ist erschreckend, wie raffiniert die Betrüger werden. Wachsamkeit ist der Schlüssel! #cybersecurity #phishing Mehr dazu hier: https://www.cyber-weekly.com/neue-phishing-wellen',
      date: 'vor 1 Woche'
    },
    {
      id: 'birthday',
      text: 'Vielen Dank für die ganzen Glückwünsche zu meinem 40. Geburtstag! 🎉',
      date: 'vor 3 Wochen'
    }
  ];

  const erfahrung = [
    {
      id: 'project',
      company: 'QF-Consulting',
      logo: 'QFC',
      title: 'Director',
      period: 'Apr 2024 - Heute',
      description: ["Leitung der IAM-Abteilung und des Projekts 'Phoenix' zur Migration von Gesundheitsdaten in die Cloud.", "Strategische Planung und Umsetzung von Sicherheitsmaßnahmen zum Schutz der Unternehmens- und Kundendaten."],
      location: 'Düsseldorf, Nordrhein-Westfalen'
    },
    {
      id: 'securefinance',
      company: 'SecureFinance Inc.',
      logo: 'SFI',
      title: 'Senior Cybersecurity Analyst',
      period: 'Jan 2022 - Mär 2024',
      description: ['Fokus auf Bedrohungsanalyse und Implementierung von Sicherheitsprotokollen zum Schutz von Finanzdaten. Regelmäßige Durchführung von Phishing-Simulationen und Mitarbeiterschulungen.'],
      location: 'Düsseldorf, Nordrhein-Westfalen'
    },
    {
      id: 'dataprotect',
      company: 'DataProtect Corp.',
      logo: 'DPC',
      title: 'Junior IT-Sicherheitsspezialist',
      period: 'Jun 2020 - Dez 2021',
      description: ['Unterstützung bei der Verwaltung der Netzwerksicherheit und Reaktion auf Sicherheitsvorfälle. Grundlegende Kenntnisse in Cybersecurity-Frameworks erworben.'],
      location: 'Köln, Nordrhein-Westfalen'
    }
  ];

  const ausbildung = [
    {
      institution: 'Technische Universität München',
      logo: 'TUM',
      degree: 'Master of Science - Informatik & IT-Sicherheit',
      period: '2018 - 2020',
      description: 'Spezialisierung auf Netzwerksicherheit und Kryptographie.'
    },
    {
      institution: 'Hochschule für Technik Stuttgart',
      logo: 'HFT',
      degree: 'Bachelor of Science - Informatik',
      period: '2015 - 2018',
      description: 'Grundlagen der Softwareentwicklung und Datenbanksysteme.'
    }
  ];

  return (
    <>
      {showInstruction && (
        <div className="instruction-overlay">
          <div className="instruction-modal">
            <h2>Deine Aufgabe:</h2>
            <p>Das ist das öffentliche Social Media Profil von Killian Schuster</p>
            <p>Klicke auf alle Informationen, die Angreifende für einen gezielten Phishing-Angriff missbrauchen könnten.</p>
            <button onClick={() => setShowInstruction(false)}>Verstanden</button>
          </div>
        </div>
      )}
      <div className={`mission2-container ${showInstruction ? 'blur' : ''}`}>
        <div className="profile-card">
          <img src={profileImage} alt="Thomas Schuster" className="profile-picture" />
          <div className="profile-info">
            <h1>Killian Schuster</h1>
            <div className="profile-info-item">
              <p>Director bei QF-Consulting | Cybersecurity-Experte | <span id="children" onClick={() => handleClick('children')} className={`clickable ${clicked['children'] ? 'clicked' : ''}`}>Vater von 3 Kinder</span></p>
              {clicked['children'] && <div className="explanation-box">{explanations.children}</div>}
            </div>
            <p className="profile-location">Hilden, Nordrhein-Westfalen, Deutschland • 500+ Kontakte</p>
          </div>
        </div>

        <div className="experience-section">
          <h2>Aktivitäten</h2>
          {aktivitaeten.map(post => (
            <div className="activity-item-container" key={post.id}>
              <div
                id={post.id}
                onClick={() => ['vacation', 'birthday'].includes(post.id) && handleClick(post.id)}
                className={`activity-item ${['vacation', 'birthday'].includes(post.id) ? 'clickable' : ''} ${clicked[post.id] ? 'clicked' : ''}`}>
                <p className="activity-text">{post.text}</p>
                <p className="activity-date">{post.date}</p>
              </div>
              {clicked[post.id] && <div className="explanation-box">{explanations[post.id]}</div>}
            </div>
          ))}
        </div>

        <div className="experience-section">
          <h2>Erfahrung</h2>
          {erfahrung.map((pos, index) => (
            <div className="experience-item-container" key={index}>
              <div className="experience-item">
                <div className="company-logo">{pos.logo}</div>
                <div className="experience-details">
                  <h3>{pos.title}</h3>
                  <p>{pos.company}</p>
                  <p className="experience-location">{pos.location}</p>
                  <p>{pos.period}</p>
                  <div className="experience-description">
                    {pos.description.map((desc, i) => (
                      <p key={i} 
                         id={pos.id}
                         onClick={() => pos.id === 'project' && i === 0 && handleClick('project')}
                         className={`${pos.id === 'project' && i === 0 ? 'clickable' : ''} ${clicked['project'] && pos.id === 'project' && i === 0 ? 'clicked' : ''}`}>
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              {clicked[pos.id] && <div className="explanation-box">{explanations[pos.id]}</div>}
            </div>
          ))}
        </div>

        <div className="experience-section">
          <h2>Ausbildung</h2>
          {ausbildung.map((edu, index) => (
            <div className="experience-item" key={index}>
              <div className="company-logo">{edu.logo}</div>
              <div className="experience-details">
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
                <p>{edu.period}</p>
                <p className="experience-description">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mission2-footer">
          <button className="done-btn" onClick={onClose} disabled={!allFound}>Mission beenden</button>
        </div>
      </div>
    </>
  );
};

export default Mission2;