import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charset = "";
    if (includeUpper) charset += upper;
    if (includeLower) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset === "") {
      alert("Please select at least one character set!");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="password-container">
      <h2>🔐 Premium Password Generator</h2>

      <div className="form-group">
        <label>Password Length:</label>
        <input
          type="number"
          min="4"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      <div className="checkbox-group">
        <label><input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} /> Uppercase</label>
        <label><input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(!includeLower)} /> Lowercase</label>
        <label><input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> Numbers</label>
        <label><input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Symbols</label>
      </div>

      <button className="generate-btn" onClick={generatePassword}>
        Generate Password
      </button>

      {password && (
        <div className="password-display">
          <input type="text" readOnly value={password} />
          <button className="copy-btn" onClick={copyToClipboard}>
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
