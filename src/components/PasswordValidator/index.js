import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const initialMessages = {
  specialChar: "Has a special character !@#$%^&*",
  digit: "Has a number 0-9",
  uppercase: "Has uppercase Letter",
  noConsecutiveLetters: "No consecutive letters allowed!",
};

const PasswordValidator = ({
  options,
  customStyles,
  customMessages = initialMessages,
}) => {
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
            <li key={key} style={customStyles.errorItem}>
              {value ? (
                <span className="error-item">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    color="red"
                    style={{ fontSize: "30px" }}
                  />
                  {customMessages[key]}
                </span>
              ) : (
                <span className="error-item">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    color="green"
                    style={{ fontSize: "30px" }}
                  />
                  {customMessages[key]}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordValidator;
