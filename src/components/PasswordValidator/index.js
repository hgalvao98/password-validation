import React, { useState, useEffect } from "react";
import "./styles.css";

const PasswordValidator = ({ options, customStyles, customMessages }) => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validatePassword();
  }, [password]);

  const validatePassword = () => {
    const newErrors = {
      specialChar: false,
      digit: false,
      uppercase: false,
      noConsecutiveLetters: false,
    };

    if (options.includes("specialChar") && !/[!@#$%^&*]/.test(password)) {
      newErrors.specialChar = true;
    }
    if (options.includes("digit") && !/\d/.test(password)) {
      newErrors.digit = true;
    }
    if (options.includes("uppercase") && !/[A-Z]/.test(password)) {
      newErrors.uppercase = true;
    }
    if (
      options.includes("noConsecutiveLetters") &&
      /(.)\1{1,}/.test(password)
    ) {
      newErrors.noConsecutiveLetters = true;
    }

    setErrors(newErrors);
  };

  return (
    <div className="password-validator" style={customStyles.container}>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={customStyles.input}
      />
      <ul className="error-list" style={customStyles.errorList}>
        {Object.entries(errors).map(([key, value]) => {
          return (
            <li key={key} className="error-item" style={customStyles.errorItem}>
              <span>
                {value
                  ? `X ${customMessages[key]}`
                  : `✓ ${customMessages[key]}`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordValidator;
