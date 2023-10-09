# Password Validator Component

The **Password Validator** component is a versatile React component that allows you to validate passwords based on specific requirements. It provides a user-friendly input field that checks for various password criteria, such as special characters, digits, uppercase letters, and more.

![Password Validator Demo](https://github.com/hgalvao98/password-validation/blob/main/PasswordValidator.gif)

## Installation

To use the `PasswordValidator` component in your React project, there are 2 ways:

1. Clone this repo and copy the code for the component inside
   ```
   ./src/components/PasswordValidator
   ```
2. Install the public package using npm or yarn:

   ```bash
   npm install react-textfield-validator
   # OR
   yarn add react-textfield-validator
   ```

   Feel free to visit: https://www.npmjs.com/package/react-textfield-validator

## Usage

To integrate the `PasswordValidator` component into your application, you can simply add it to your JSX. Here's a basic example:

```jsx
import React, { useState } from "react";
import PasswordValidator from "react-textfield-validator";

const App = () => {
  const [password, setPassword] = useState();
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div>
      <h1>Password Validator</h1>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={!isVerified}>Send</button>
      <PasswordValidator
        setIsVerified={setIsVerified}
        password={password}
        options={[
          "specialChar",
          "digit",
          "uppercase",
          "noConsecutiveLetters",
          "minLength",
        ]}
        customMessages={{
          specialChar: "Special character required!",
          digit: "At least one digit required!",
          uppercase: "At least one uppercase letter required!",
          noConsecutiveLetters: "No consecutive letters allowed!",
        }}
        customStyles={{
          container: {
            /* Custom container styles */
          },
          input: {
            /* Custom input field styles */
          },
          errorList: {
            /* Custom error list styles */
          },
          errorItem: {
            /* Custom error item styles */
          },
        }}
      />
    </div>
  );
};

export default App;
```

## Props

The **PasswordValidator** component accepts the following props:

- `options`(array, required): An array specifying the password requirements to be checked. You can include any combination of the following options:
  - 'specialChar': Requires one or more special characters: !@#$%^&\*
  - 'digit': Requires at least one digit (0-9).
  - 'uppercase': Requires at least one uppercase letter.
  - 'noConsecutiveLetters': Prevents consecutive letters (e.g., "aa" or "ABcd").
  - 'minLength': Requires a min length defined.
- `setIsVerified`(function, required): A setState function so you can update you form or app based on if the input is verified
- `password`(string, required): The value that will be in your input.
- `customStyles`(object, optional): An object that lets you customize the component's CSS styles using inline styles. You can apply custom styles to different parts of the component, such as the container, input field, error list, error items, error icons, and valid icons.
- `customMessages`(object, optional): An object that allows you to customize error messages for each requirement. If not provided, default messages will be displayed. You can customize messages for any of the options specified in the options prop.

## Testing (in development)

The easiest way to test the **PasswordValidator** in your application is to follow step number 2 of the installation. You can also clone this repo and follow these steps:

```
npm install
npm run start
```

## Customization

The **PasswordValidator** component is highly customizable. You can modify error messages, apply custom styles, and adjust its behavior to meet your project's specific requirements. Refer to the Usage section for details on how to customize the component.

## Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License.
