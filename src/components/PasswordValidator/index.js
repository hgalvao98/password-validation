import React, { useState, useEffect, useCallback } from "react";

import "./styles.css";
import ErrorIcon from "./icons/ErrorIcon";
import RightIcon from "./icons/RightIcon";

const initialMessages = {
  specialChar: "Has a special character !@#$%^&*",
  digit: "Has a number 0-9",
  uppercase: "Has uppercase Letter",
  noConsecutiveLetters: "No consecutive letters allowed!",
  minLength: "Has minimum length of 8 characters",
};

const initialStyles = {
  container: {},
  input: {},
  errorList: {},
  errorItem: {},
};

const PasswordValidator = ({
  setIsVerified,
  password = "",
  options,
  customStyles = initialStyles,
  customMessages = initialMessages,
}) => {
  const [errors, setErrors] = useState({});
  const [isVerified, setIsVerifiedInternal] = useState(false);

  const validatePassword = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    if (options.includes("specialChar")) {
      newErrors.specialChar = !/[!@#$%^&*]/.test(password);
      isValid = isValid && !newErrors.specialChar;
    }
    if (options.includes("digit")) {
      newErrors.digit = !/[0-9]/.test(password);
      isValid = isValid && !newErrors.digit;
    }
    if (options.includes("uppercase")) {
      newErrors.uppercase = !/[A-Z]/.test(password);
      isValid = isValid && !newErrors.uppercase;
    }
    if (options.includes("noConsecutiveLetters")) {
      newErrors.noConsecutiveLetters = /([a-z])\1/.test(password);
      isValid = isValid && !newErrors.noConsecutiveLetters;
    }
    if (options.includes("minLength")) {
      newErrors.minLength = password.length < 8;
      isValid = isValid && !newErrors.minLength;
    }

    setErrors(newErrors);
    setIsVerifiedInternal(isValid);
  }, [password, options]);

  useEffect(() => {
    validatePassword();
  }, [validatePassword]);

  useEffect(() => {
    setIsVerified(isVerified);
  }, [isVerified, setIsVerified]);

  return (
    <div className="password-validator" style={customStyles.container}>
      <ul className="error-list" style={customStyles.errorList}>
        {Object.entries(errors).map(([key, value]) => {
          return (
            <li key={key} style={customStyles.errorItem}>
              {value ? (
                <span className="error-item">
                  <ErrorIcon />
                  {customMessages[key]}
                </span>
              ) : (
                <span className="error-item">
                  <RightIcon />
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
