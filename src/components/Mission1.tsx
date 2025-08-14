import React, { useState } from 'react';
import './Mission1.css';

type Message = { id: number; from: string; cc: string; subject: string; body: string; isPhish: boolean; date: string; explanation?: string };

interface Props { onClose: () => void; }

export const messages: Message[] = [
  { id: 1, from: 'Sonja.Hoffmann@QFConsulting.com', cc: 'Peter.Lumos@QFConsulting.com', subject: 'weitere Planung für Projektphase 3', body: `Hallo Team,

ich hoffe, diese E-Mail findet euch gut.

Ich möchte die weitere Planung für die bevorstehende Projektphase 3 besprechen. Es ist wichtig, dass wir uns abstimmen, um die nächsten Schritte effizient zu koordinieren.

Bitte nehmt am Meeting teil, damit wir die Details besprechen können.

Meeting-Details:
Datum: 28. Juni 2025
Zeit: 10:00 Uhr
Ort: Online-Meeting
Link: https://webex.com/meet/sonja.hoffmann

Bitte bereitet alle relevanten Unterlagen und eure Fragen vor. Eure Teilnahme ist entscheidend für den Erfolg des Projekts.

Ich freue mich auf eure Teilnahme.

Beste Grüße,

Sonja Hoffmann
Projektleiterin
QFConsulting`, isPhish: false, date: '2 hours ago' },
  { id: 4, from: 'no-reply@gewinnspiel-paradies.de', cc: '', subject: 'Herzlichen Glückwunsch! Ihr Preis wartet auf Sie!', body: `Sehr geehrte/r Nutzer/in,

Sie wurden als glücklicher Gewinner unseres monatlichen Gewinnspiels ausgewählt!

Sie haben ein brandneues iPhone 16 Pro gewonnen!

Um Ihren Preis zu beanspruchen, klicken Sie bitte auf den folgenden Link und bestätigen Sie Ihre Daten:
http://bit.ly/sicher-kein-betrug-iphone-gewinn

Beeilen Sie sich, das Angebot ist nur 24 Stunden gültig!

Mit freundlichen Grüßen,
Ihr Gewinnspiel-Team`, isPhish: true, date: '4 hours ago', explanation: "Diese E-Mail ist ein klassischer Phishing-Versuch. Anzeichen dafür sind: eine unseriöse Domaine , eine ungewöhnliche Begrüßung, die dringende Handlungsaufforderung (innerhalb von 24 Stunden), ein verdächtiger Link (Bitly-Link) und ein zu gutes Angebot, um wahr zu sein." },
  { id: 3, from: 'Killian.Schuster@QFCConsulting.com', cc: '', subject: 'Verkaufszahlen letztes Quartal', body: `Hallo,

wenn du Zeit hast, bräuchte ich bitte die Verkaufszahlen für das letzte Phoenix-Projekt. Kannst du mir die bitte eben raussuchen? 

Lade die Datei bitte auf unserem Sharepoint hoch: https://sharepoint.qfcconsulting.com/sales-data


Danke,
Killian Schuster
Director`, isPhish: true, date: '6 hours ago', explanation: "Diese E-Mail ist ein Spear-Phishing-Versuch. Achten Sie auf die Domain: '@QFCConsulting.com' statt 'QFConsulting.com'. Angreifende nutzen oft solche kleinen Abweichungen, um sich als vertrauenswürdige Kollegen auszugeben und an sensible Daten zu gelangen." },
  { id: 2, from: 'Lucas.Brandt@QFConsulting.com', cc: '', subject: 'Momentane Lage von Cyberskandale', body: `Hallo,

ich bereite eine Präsentation zur aktuellen Lage der Cyberkriminalität vor. Könntest du mir bitte die Folien vom letzten meeting zukommen lassen? Ich bräuchte sie bis heute Nachmittag.

Danke und beste Grüße,
Lucas Brandt`, isPhish: false, date: 'Yesterday' },
  { id: 5, from: 'Anna.Vogel@QFConsulting.com', cc: '', subject: 'Projekt-Migration: Nächstes Meeting', body: `Hallo zusammen,

um die nächsten Schritte für die Projekt-Migration zu besprechen, habe ich ein kurzes Meeting angesetzt.

Thema: Abstimmung Projekt-Migration
Datum: 30. Juni 2025
Zeit: 14:00 Uhr
Link: https://webex.com/meet/anna.vogel

Bitte lasst mich wissen, falls der Termin für euch nicht passt.

Danke und viele Grüße,
Anna Vogel`, isPhish: false, date: 'Yesterday' },
];

const Mission1: React.FC<Props> = ({ onClose }) => {
  const [selected, setSelected] = useState<Message | null>(messages[0]);
  const [feedback, setFeedback] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [classified, setClassified] = useState<Record<number, boolean>>({});

  const handleSelect = (report: boolean) => {
    if (!selected) return;
    const correct = report === selected.isPhish;
    setFeedback(correct ? 'Korrekt!' : 'Falsch.');
    setClassified((prev) => ({ ...prev, [selected.id]: true }));
    if (correct && selected.isPhish) {
      setExplanation(selected.explanation || '');
    } else {
      setExplanation('');
    }
  };

  const allClassified = messages.length === Object.keys(classified).length;

  return (
    <div className="mission1-container">
      <div className="mission1-header">
        <h2>Mission 1: Wo war die Sicherheitslücke?</h2>
        <p><strong>Aufgabe:</strong> Untersuche den Posteingang und identifizieren die Phishing-E-Mails. <strong>Spear-Phishing</strong> ist eine Form des Online-Betrugs, bei der Angreifer täuschend echte, persönlich zugeschnittene Nachrichten an ausgewählte Personen oder Organisationen senden, 
        um diese zur Preisgabe vertraulicher Informationen, zum Öffnen schädlicher Anhänge oder zum Klicken auf präparierte Links zu bewegen. Achte auf Verdächtiges in der Mail!
        </p>
      </div>
      <div className="mission1-content">
        <div className="email-list-container">
          <div className="email-list-header">
            <h3>Posteingang</h3>
          </div>
          <div className="email-list">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`email-item ${selected?.id === m.id ? 'active' : ''} ${classified[m.id] ? 'classified' : ''}`}
                onClick={() => { setSelected(m); setFeedback(''); setExplanation(''); }}
              >
                <div className="email-from">{m.from}</div>
                <div className="email-subject">{m.subject}</div>
                <div className="email-date">{m.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="email-view-container">
          {!selected ? (
            <div className="empty-view">Select an email to read</div>
          ) : (
            <div className="email-view">
              <div className="view-header">
                <h3>{selected.subject}</h3>
                <div className="view-details">
                  <span><strong>From:</strong> {selected.from}</span>
                  <span><strong>CC:</strong> {selected.cc}</span>
                  <span><strong>Date:</strong> {selected.date}</span>
                </div>
              </div>
              <div className="view-body">{selected.body}</div>
              <div className="actions">
                <button className="report-btn" onClick={() => handleSelect(true)}>Als Phishing melden</button>
                <button className="safe-btn" onClick={() => handleSelect(false)}>Als sicher markieren</button>
              </div>
              {feedback && (
                <div className={`feedback ${feedback === 'Korrekt!' ? 'correct' : 'incorrect'}`}>
                  <div>{feedback}</div>
                  {explanation && <div className="explanation">{explanation}</div>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mission1-footer">
        <button className="done-btn" onClick={onClose} disabled={!allClassified}>Mission beenden</button>
      </div>
    </div>
  );
};

export default Mission1;