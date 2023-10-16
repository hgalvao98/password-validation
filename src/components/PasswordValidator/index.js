import React, { useState, useEffect, useCallback } from "react";

import "./styles.css";
import ErrorIcon from "./icons/ErrorIcon";
import RightIcon from "./icons/RightIcon";

const initialMessages = {
  differentFromUser: "Password can't contain username/email on it",
  specialChar: "Has a special character !@#$%^&*",
  digit: "Has a number 0-9",
  uppercase: "Has uppercase Letter",
  noConsecutiveLetters: "No consecutive letters allowed!",
  minLength: "Too short!",
};

const initialStyles = {
  container: {},
  input: {},
  errorList: {},
  errorItem: {},
};

//check if customMessages being passed match with options/initialMessages
const getMessages = (options, customMessages) => {
  let messages = { ...initialMessages };
  if (options.length > Object.entries(customMessages).length) {
    for (let i = 0; i < options.length; i++) {
      if (
        customMessages[options[i]] === "" ||
        customMessages[options[i]] === undefined
      ) {
        messages[options[i]] = initialMessages[options[i]];
      }
    }
  } else {
    messages = customMessages;
  }
  return messages;
};

const PasswordValidator = ({
  setIsVerified,
  username = "",
  password = "",
  options,
  customStyles = initialStyles,
  customMessages = { ...initialMessages },
}) => {
  const [errors, setErrors] = useState({});
  const [isVerified, setIsVerifiedInternal] = useState(false);
  const [minRequired, setMinRequired] = useState();

  const messages = getMessages(options, customMessages);

  const containsMinLength = useCallback(() => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].minLength !== undefined) {
        setMinRequired(options[i].minLength);
        return true;
      }
    }
  }, [options]);

  const validatePassword = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    if (options.includes("differentFromUser")) {
      let user = username.toLowerCase();
      if (username.includes("@")) {
        user = user.split("@")[0];
      }
      newErrors.differentFromUser = password.toLowerCase().includes(user);
      isValid = isValid && !newErrors.differentFromUser;
    }
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
    if (containsMinLength()) {
      newErrors.minLength = password.length < minRequired;
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
                  {messages[key]}
                </span>
              ) : (
                <span className="error-item">
                  <RightIcon />
                  {messages[key]}
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
