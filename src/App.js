import React, { useState } from "react";
import PasswordValidator from "./components/PasswordValidator";

const App = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isVerified, setIsVerified] = useState(false);

  const customMessages = {
    specialChar: "(Different) Has a special character !@#$%^&*",
    digit: "Has a number 0-9",
    uppercase: "Has uppercase Letter",
    noConsecutiveLetters: "No consecutive letters allowed!",
    minLength: "Has minimum length of 8 characters",
  };

  const customStyles = {
    // Add custom CSS styles here as needed
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Password Component</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!isVerified}>Send</button>
        <PasswordValidator
          username={username}
          password={password}
          setIsVerified={setIsVerified}
          options={[
            "differentFromUser",
            "specialChar",
            "digit",
            "uppercase",
            "noConsecutiveLetters",
            { minLength: 3 },
          ]}
          customMessages={customMessages}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default App;
