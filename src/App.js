import React from "react";
import PasswordValidator from "./components/PasswordValidator";

const App = () => {
  const customMessages = {
    specialChar: "(Different) Has a special character !@#$%^&*",
    digit: "Has a number 0-9",
    uppercase: "Has uppercase Letter",
    noConsecutiveLetters: "No consecutive letters allowed!",
  };

  const customStyles = {
    // Add custom CSS styles here as needed
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Password Component</h1>
      <PasswordValidator
        options={["specialChar", "digit", "uppercase", "noConsecutiveLetters"]}
        customMessages={customMessages}
        customStyles={customStyles}
      />
    </div>
  );
};

export default App;
