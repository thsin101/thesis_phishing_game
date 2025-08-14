import React, { useState } from 'react';
import './Mission4.css';

interface Props {
  onClose: () => void;
}

type Question = {
  id: number;
  type: 'single' | 'multiple';
  questionText: string;
  answerOptions: {
    answerText: string;
    isCorrect: boolean;
  }[];
  explanation: string;
};

const quizData: Question[] = [
  {
    id: 1,
    type: 'single',
    questionText: 'Wie konnten die Angreifer die finale E-Mail so überzeugend gestalten?',
    answerOptions: [
      { answerText: 'Einsatz von mehreren Phishing Versuchen.', isCorrect: false },
      { answerText: 'Einsatz von Amazon Mails', isCorrect: false },
      { answerText: 'Kombination von OSINT und Künstlicher Intelligenz zum Erstellen realistischer Emails.', isCorrect: true },
      { answerText: 'Die Angreifer sind im Unternehmen ansässig und hatten alle nötigen Informationen', isCorrect: false },
    ],
    explanation: 'Richtig! Die Angreifer haben Informationen aus dem öffentlichen LinkedIn-Profil (Mission 2) und mit KI verfeinert, um einen sehr gezielten und glaubwürdigen Angriff zu starten.'
  },
  {
    id: 2,
    type: 'multiple',
    questionText: 'Auf was sollte man bei Emails achten? (Mehrfachauswahl)',
    answerOptions: [
      { answerText: 'Titel der Emails', isCorrect: true },
      { answerText: 'Inhalt der Email', isCorrect: true },
      { answerText: 'Die Domain', isCorrect: true },
      { answerText: 'Begrüßung', isCorrect: true },
    ],
    explanation: 'Tatsächlich geben alle diese Punkte Hinweise auf die Glaubwürdigkeit einer E-Mail. Besonders der Inhalt und die Domain sind entscheidend, um Phishing zu erkennen. Achten Sie immer darauf, ob die E-Mail seriös wirkt und ob die Domain vertrauenswürdig ist.'
  },
  {
    id: 3,
    type: 'single',
    questionText: 'Wieso sollte man skeptisch auf QR-Codes oder Links reagieren?',
    answerOptions: [
      { answerText: 'Sie können direkt zu schädlichen Webseiten führen, die Malware verbreiten oder Daten stehlen.', isCorrect: true },
      { answerText: 'Weil das Scannen von QR-Codes immer unsicher ist und generell vermieden werden sollte.', isCorrect: false },
      { answerText: 'Sie verlangsamen das Smartphone oder den Computer.', isCorrect: false },
      { answerText: 'Nur Links in E-Mails sind gefährlich, QR-Codes sind immer sicher.', isCorrect: false },
    ],
    explanation: 'Genau. Hinter einem harmlos aussehenden Link oder QR-Code kann sich eine Phishing-Seite oder ein direkter Malware-Download verbergen. Prüfen Sie immer die URL, bevor Sie darauf klicken oder persönliche Daten eingeben.'
  },
  {
    id: 4,
    type: 'single',
    questionText: 'Wie nennt man E-Mails, die darauf abzielen, an vertrauliche Daten zu gelangen, indem sie den Empfänger täuschen?',
    answerOptions: [
      { answerText: 'Spam-Mails', isCorrect: false },
      { answerText: 'Phishing-Mails', isCorrect: true },
      { answerText: 'Werbe-Mails', isCorrect: false },
      { answerText: 'Kettenbriefe', isCorrect: false },
    ],
    explanation: 'Exakt! Phishing ist der Fachbegriff für diese Art von Betrugsversuch, bei dem nach vertraulichen Daten \'geangelt\' wird.'
  },
  {
    id: 5,
    type: 'single',
    questionText: 'Auf welchen Präfix sollte man bei Links bzw. Websites achten?',
    answerOptions: [
      { answerText: 'http://', isCorrect: false },
      { answerText: 'httpp://', isCorrect: false },
      { answerText: 'https://', isCorrect: true },
      { answerText: 'httpc://', isCorrect: false },
    ],
    explanation: 'Websites, die mit https:// starten, verwenden eine sichere Verbindung. Das "s" steht für "secure". Achten Sie immer darauf, dass die Verbindung sicher ist, besonders bei sensiblen Daten wie Passwörtern oder Kreditkarteninformationen.'
  },
  {
    id: 6,
    type: 'single',
    questionText: 'Geben Sie in der Studie folgende Zahl ein, um die post-game Studie zu starten:',
    answerOptions: [
      { answerText: '55', isCorrect: true },
      
    ],
    explanation: 'Websites, die mit https:// starten, verwenden eine sichere Verbindung. Das "s" steht für "secure". Achten Sie immer darauf, dass die Verbindung sicher ist, besonders bei sensiblen Daten wie Passwörtern oder Kreditkarteninformationen.'
  },
];

const Mission4: React.FC<Props> = ({ onClose }) => {
  const [answers, setAnswers] = useState<Record<number, { selectedIndices: number[], isCorrect: boolean | null } | null>>({});
  const [showExplanations, setShowExplanations] = useState(false);

  const handleAnswerClick = (questionId: number, answerIndex: number, questionType: 'single' | 'multiple') => {
    const question = quizData.find(q => q.id === questionId);
    if (!question) return;

    if (questionType === 'single') {
      const isCorrect = question.answerOptions[answerIndex].isCorrect;
      setAnswers(prev => ({
        ...prev,
        [questionId]: { selectedIndices: [answerIndex], isCorrect }
      }));

      if (!isCorrect) {
        setTimeout(() => {
          setAnswers(prev => ({ ...prev, [questionId]: null }));
        }, 1000);
      }
    } else {
      const currentAnswer = answers[questionId] || { selectedIndices: [], isCorrect: null };
      let newSelectedIndices = [...currentAnswer.selectedIndices];

      if (newSelectedIndices.includes(answerIndex)) {
        newSelectedIndices = newSelectedIndices.filter(i => i !== answerIndex);
      } else {
        newSelectedIndices.push(answerIndex);
      }

      setAnswers(prev => ({ ...prev, [questionId]: { ...currentAnswer, selectedIndices: newSelectedIndices, isCorrect: null } }));
    }
  };

  const checkAnswers = (questionId: number) => {
    const question = quizData.find(q => q.id === questionId);
    if (!question) return;

    const correctIndices = question.answerOptions
      .map((opt, index) => opt.isCorrect ? index : -1)
      .filter(index => index !== -1);

    const selectedIndices = answers[questionId]?.selectedIndices || [];

    const isCorrect = correctIndices.length === selectedIndices.length && correctIndices.every(i => selectedIndices.includes(i));

    setAnswers(prev => ({ ...prev, [questionId]: { ...prev[questionId]!, isCorrect } }));

    if (!isCorrect) {
      setTimeout(() => {
        setAnswers(prev => ({ ...prev, [questionId]: { ...prev[questionId]!, isCorrect: null } }));
      }, 1000);
    }
  };

  const allCorrect = quizData.every(q => answers[q.id]?.isCorrect === true);

  return (
    <div className="mission4-container">
      <div className="mission4-header">
        <h2>Mission 4: Abschlussbericht</h2>
        <p>Schreiben Sie einen Einsatzbericht, damit die Künstliche Intelligenz verbessert wird.</p>
      </div>
      <div className="quiz-container">
        {quizData.map((q) => {
          const answerState = answers[q.id];
          const isQuestionCorrect = answerState?.isCorrect === true;

          return (
            <div key={q.id} className="question-block">
              <h3>{q.id}. {q.questionText}</h3>
              <div className="answer-options">
                {q.answerOptions.map((opt, index) => {
                  let buttonClass = 'answer-btn';
                  if (answerState) {
                    if (answerState.selectedIndices.includes(index)) {
                      if (answerState.isCorrect === true) {
                        buttonClass += ' correct';
                      } else if (answerState.isCorrect === false) {
                        buttonClass += ' incorrect';
                      } else {
                        buttonClass += ' selected';
                      }
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(q.id, index, q.type)}
                      className={buttonClass}
                      disabled={isQuestionCorrect || (q.type === 'single' && answerState?.isCorrect === false)}
                    >
                      {opt.answerText}
                    </button>
                  );
                })}
              </div>
              {q.type === 'multiple' && !isQuestionCorrect && (
                <button onClick={() => checkAnswers(q.id)} className="check-answer-btn">
                  Antworten prüfen
                </button>
              )}
              {showExplanations && isQuestionCorrect && (
                <div className="explanation-box correct">
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {allCorrect && (
        <div className="results-box">
          <p className="correct">Danke für den Bericht!</p>
          {!showExplanations && <button onClick={() => setShowExplanations(true)} className="show-explanation-btn">Erklärungen anzeigen</button>}
        </div>
      )}
      <div className="mission4-footer">
        <button className="done-btn" onClick={onClose} disabled={!allCorrect}>
          Spiel beenden
        </button>
      </div>
    </div>
  );
};

export default Mission4;
