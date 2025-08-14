import React, { useState } from 'react';
import './Mission3.css';
import deliveryStatusBar from '../amazon-zustellleiste.png';

interface Props {
  onClose: () => void;
}

const Mission3: React.FC<Props> = ({ onClose }) => {
  const [showUrl, setShowUrl] = useState(false);
  const [classification, setClassification] = useState<'safe' | 'phishing' | null>(null);

  const handleQrClick = () => {
    setShowUrl(true);
  };

  const handleClassification = (decision: 'safe' | 'phishing') => {
    setClassification(decision);
  };

  const isCorrect = classification === 'phishing';

  return (
    <div className="mission3-container">
      <div className="email-simulation">
        <div className="email-header">
          <p><strong>Von:</strong> Amazon-Lieferung <span className="sender-email">&lt;bestellbestaetigung@amazonn.de&gt;</span></p>
          <p><strong>An:</strong> Thomas.Müller@gmail.com</p>
          <p><strong>Betreff:</strong> Bestellt: "MB ASRock AMD AM5 B850M Pro-A"</p>
        </div>
        <div className="email-body">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" className="amazon-logo" />
          <h2>Ihre Sendung konnte nicht zugestellt werden</h2>
          <img src={deliveryStatusBar} alt="Zustellleiste" className="delivery-status-bar" />
          <p>
            Hallo Thomas Müller,
          </p>
          <p>
            leider gab es ein Problem bei der Zustellung Ihres Pakets. Es wird zu einer Verspätung kommen. 
            Sie können jederzeit die Lieferung mithilfe des QR-Codes verfolgen.
          </p>
          <p>
            Scannen Sie den folgenden QR-Code, um Ihre Sendung zu verfolgen und Ihre Adresse zu aktualisieren:
          </p>
          <div className="qr-code-container">
            <div className="qr-code-placeholder" onClick={handleQrClick}>
              <p className="qr-text">QR-Code scannen</p>
            </div>
          </div>
          {showUrl && (
            <div className="url-reveal">
              <p>Der QR-Code führt zu folgender URL:</p>
              <p className="fake-url"><strong>http://amazon-tracking.info/update-address?tracking=98212345678901234</strong></p>
              <p>Ist diese URL sicher oder handelt es sich um Phishing?</p>
              <div className="decision-buttons">
                <button onClick={() => handleClassification('safe')} className="decision-btn safe-btn">Sicher</button>
                <button onClick={() => handleClassification('phishing')} className="decision-btn phishing-btn">Phishing</button>
              </div>
            </div>
          )}
          {classification && (
            <div className={`feedback-box ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <>
                  <p><strong>Richtig!</strong> Das ist ein Phishing-Versuch.</p>
                  <div className="explanation">
                    <strong>Erklärung:</strong> Auch wenn es sich hierbei um eine offensichtliche Fälschung handelt, achte immer darauf, dass:
                    <ol>
                      <li>Websites, die du besuchst, sollten immer mit https:// starten. Das bedeutet, dass der Datenverkehr verschlüsselt wird.</li>
                      <li>Vertraue keinen QR-Codes oder Hyperlinks. Am besten besuchst du die Seite selber, indem du den Link eingibst.</li>
                      <li>Achte immer auf den Absender einer Email, auch wenn du etwas erwartest.</li>
                    </ol>
                  </div>
                </>
              ) : (
                <p><strong>Falsch.</strong> Schauen Sie sich die Absender-E-Mail und die URL genau an. Seriöse Unternehmen wie Amazon verwenden ihre offizielle Domain.</p>
              )}
            </div>
          )}
          <p>Wir entschuldigen uns für die Unannehmlichkeiten.</p>
          <p>Mit freundlichen Grüßen,</p>
          <p>Ihr Amazon-Kundenservice</p>
        </div>
      </div>
      <div className="mission3-footer">
        <button className="done-btn" onClick={onClose} disabled={!isCorrect}>Mission beenden</button>
      </div>
    </div>
  );
};

export default Mission3;