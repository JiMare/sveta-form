import React, { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";

type userInfo = {
  email: string;
  name: string;
  password: string;
};

const App = () => {
  const [mail, setMail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const getUsername = (): void => {
    const index = mail.indexOf("@");
    let name = mail.slice(0, index);
    if (name.length > 12) {
      name = name.slice(0, 12);
    }
    setUsername(name);
  };

  const createJson = (
    mail: string,
    username: string,
    password: string
  ): string => {
    const data: userInfo = {
      email: mail,
      name: username,
      password: password,
    };
    return JSON.stringify(data);
  };

  const hasSpecialChar =
    password.indexOf("!") >= 0 ||
    password.indexOf("@") >= 0 ||
    password.indexOf("#") >= 0 ||
    password.indexOf("$") >= 0 ||
    password.indexOf("%") >= 0 ||
    password.indexOf("^") >= 0 ||
    password.indexOf("?") >= 0;

  const myRegex = /(?=.*[a-z])(?=.*[A-Z])/;
  const hasUpperAndLower = myRegex.exec(password);

  const validatePassword = () => {
    if (password.length >= 8 && hasSpecialChar && hasUpperAndLower) {
      return true;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getUsername();
    if (validatePassword() && password === confirm) {
      setShowAlert(true);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const toggleFocus = () => {
    setFocus(!focus);
  };

  return (
    <>
      <div className="w-full max-w-xs mx-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-24"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-grey-500 bg-grey-100 hover:border-green-400 focus:outline-none focus:bg-white focus:border-green-400 rounded-full py-2 px-3 text-gray-700"
              type="email"
              name="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border border-grey-400 bg-grey-100 disabled:opacity-75  rounded-full py-2 px-3 text-gray-700"
              type="text"
              name="username"
              value={username}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={
                password.length === 0
                  ? "border border-grey-500 bg-grey-100 hover:border-green-400 focus:outline-none focus:bg-white focus:border-green-400 rounded-full py-2 px-3 text-gray-700"
                  : !validatePassword()
                  ? "border border-red-500 bg-grey-100 focus:outline-none focus:bg-white rounded-full py-2 px-3 text-gray-700"
                  : validatePassword() && focus
                  ? "border border-green-500 bg-grey-100 focus:outline-none focus:bg-white rounded-full py-2 px-3 text-gray-700"
                  : "border border-grey-500 bg-grey-100 hover:border-green-400 focus:outline-none focus:bg-white focus:border-green-400 rounded-full py-2 px-3 text-gray-700"
              }
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={toggleFocus}
              onBlur={toggleFocus}
            />
            <VisibilityIcon
              className="-ml-10 cursor-pointer"
              onClick={toggleShowPassword}
            ></VisibilityIcon>
            {!focus && validatePassword() ? (
              <p className="text-green-500 text-xs italic">
                All requirements met
              </p>
            ) : (
              <>
                <p
                  className={
                    password.length === 0
                      ? "text-grey-500 text-xs italic"
                      : password.length >= 8
                      ? "text-green-500 text-xs italic"
                      : "text-red-500 text-xs italic"
                  }
                >
                  At least 8 characters
                </p>
                <p
                  className={
                    password.length === 0
                      ? "text-grey-500 text-xs italic"
                      : hasUpperAndLower
                      ? "text-green-500 text-xs italic"
                      : "text-red-500 text-xs italic"
                  }
                >
                  At least 1 upper case and 1 lower case letter
                </p>
                <p
                  className={
                    password.length === 0
                      ? "text-grey-500 text-xs italic"
                      : hasSpecialChar
                      ? "text-green-500 text-xs italic"
                      : "text-red-500 text-xs italic"
                  }
                >
                  At least 1 special character (like !@#$%^?)
                </p>
              </>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm"
            >
              Confirm password
            </label>
            <input
              className="border border-grey-500 bg-grey-100 hover:border-green-400 focus:outline-none focus:bg-white focus:border-green-400 rounded-full py-2 px-3 text-gray-700"
              type={showConfirm ? "text" : "password"}
              name="confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <VisibilityIcon
              className="-ml-10 cursor-pointer"
              onClick={toggleShowConfirm}
            ></VisibilityIcon>
          </div>
          <div>
            <button
              className="bg-amber-500 text-white font-bold px-8 py-2 rounded-full hover:bg-amber-700
         focus:bg-amber-600 focus:border-2 focus:border-grey-400 active:bg-amber-900
         disabled:bg-red-100"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      {showAlert && (
        <div
          className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold">Informational json</p>
          <p className="text-sm">{createJson(mail, username, password)}</p>
        </div>
      )}
    </>
  );
};

export default App;
