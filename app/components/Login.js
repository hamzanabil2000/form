"use client";

import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import Image from "next/image";
import { useState, useRef } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bg from "./assets/images/bg.jpg";
import logo from "./assets/images/pro-active-logo.svg";
import { useRouter } from "next/navigation";

const Login = () => {
  const [tab, setTab] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [mobileTouched, setMobileTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const router = useRouter();
  const passwordRef = useRef(null);

  const handleTogglePasswordVisibility = () => {
    if (passwordRef.current) {
      const cursorPosition = passwordRef.current.selectionStart;

      setShowPassword(!showPassword);

      setTimeout(() => {
        passwordRef.current.setSelectionRange(cursorPosition, cursorPosition);
        passwordRef.current.focus();
      }, 0);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    const mobileRegex = /^[+0-9]*$/;
    setMobile(value);
    if (value === "") {
      setMobileError(false);
      setMobileErrorMessage("");
    } else if (mobileRegex.test(value)) {
      setMobileError(false);
      setMobileErrorMessage("");
    } else {
      setMobileError(true);
      setMobileErrorMessage("Mobile number is invalid");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(value);
    if (value === "") {
      setEmailError(false);
      setEmailErrorMessage("");
    } else if (!emailRegex.test(value)) {
      setEmailError(true);
      setEmailErrorMessage("Email is invalid");
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    const passwordRegex = /^.{6,}$/;
    setPassword(value);
    if (value === "") {
      setPasswordError(false);
      setPasswordErrorMessage("");
    } else if (value.length < 6 || !passwordRegex.test(value)) {
      setPasswordError(true);
      setPasswordErrorMessage("Password is Invalid");
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
  };

  const handleBlur = (field) => {
    switch (field) {
      case "mobile":
        setMobileTouched(true);
        break;
      case "email":
        setEmailTouched(true);
        break;
      case "password":
        setPasswordTouched(true);
        break;
      default:
        break;
    }
  };

  const isLoginButtonDisabled = () => {
    return (
      (tab === "phone" && (mobile === "" || mobileError)) ||
      (tab === "email" && (email === "" || emailError)) ||
      password === "" ||
      passwordError
    );
  };

  const handleLoginClick = () => {
    const loginData = tab === "phone" ? { mobile, password } : { email, password };
    const existingUserDataString = localStorage.getItem("userData");
    let existingUserData = [];
    if (existingUserDataString) {
      try {
        existingUserData = JSON.parse(existingUserDataString);
        if (!Array.isArray(existingUserData)) {
          existingUserData = [];
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        existingUserData = []; 
      }
    }
    existingUserData.push(loginData);
    localStorage.setItem("userData", JSON.stringify(existingUserData));
    router.push("/usertable");
  };
  
  
  

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <style jsx global>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
      `}</style>

      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>

      <div className="relative z-10 w-full max-w-lg p-8 flex flex-col items-center">
        <div className="flex justify-center w-full mb-6">
          <Image src={logo} width={300} height={80} alt="logo" />
        </div>

        {/* Tab Section */}
        <div className="flex bg-[#233d86] justify-between rounded w-full">
          <button
            className={`px-2 py-2 ${
              tab === "phone" ? "bg-white text-[#233da6]" : "text-white"
            }`}
            onClick={() => setTab("phone")}
            style={{
              width: "50%",
              height: "85%",
              marginTop: "4px",
              marginLeft: "4px",
              marginBottom: "4px",
              fontWeight: "bold",
            }}
          >
            Phone No
          </button>
          <button
            className={`px-2 py-2 ${
              tab === "email" ? "bg-white text-[#233da6]" : "text-white"
            }`}
            onClick={() => setTab("email")}
            style={{
              width: "50%",
              height: "85%",
              marginTop: "4px",
              marginLeft: "4px",
              marginRight: "4px",
              marginBottom: "4px",
              fontWeight: "bold",
            }}
          >
            Email / Username
          </button>
        </div>

        {/* Form Section */}
        <div className="mt-4 p-4 sm:p-6 bg-[#233d86] rounded flex flex-col items-center w-full">
          {tab === "phone" ? (
            <TextField
              label="Mobile"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={mobile}
              onChange={handleMobileChange}
              onBlur={() => handleBlur("mobile")}
              InputProps={{
                style: {
                  backgroundColor: "#444957",
                  color: "white",
                  height: "40px",
                  marginTop: "8px",
                  borderColor:
                    mobileError || (mobileTouched && mobile === "")
                      ? "red"
                      : "#444957",
                },
              }}
              InputLabelProps={{
                style: {
                  color:
                    mobileError || (mobileTouched && mobile === "")
                      ? "red"
                      : "white",
                },
              }}
              helperText={mobileError ? mobileErrorMessage : ""}
              FormHelperTextProps={{
                style: { color: "red", textAlign: "left" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      mobileError || (mobileTouched && mobile === "")
                        ? "red"
                        : "#444957",
                  },
                  "&:hover fieldset": {
                    borderColor: "#328ec8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#328ec8",
                  },
                },
              }}
            />
          ) : (
            <TextField
              label="Email / Username"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={handleEmailChange}
              onBlur={() => handleBlur("email")}
              InputProps={{
                style: {
                  backgroundColor: "#444957",
                  color: "white",
                  height: "40px",
                  marginTop: "8px",
                  borderColor:
                    emailError || (emailTouched && email === "")
                      ? "red"
                      : "#444957",
                },
              }}
              InputLabelProps={{
                style: {
                  color:
                    emailError || (emailTouched && email === "")
                      ? "red"
                      : "white",
                },
              }}
              helperText={emailError ? emailErrorMessage : ""}
              FormHelperTextProps={{
                style: { color: "red", textAlign: "left" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      emailError || (emailTouched && email === "")
                        ? "red"
                        : "#444957",
                  },
                  "&:hover fieldset": {
                    borderColor: "#328ec8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#328ec8",
                  },
                },
              }}
            />
          )}

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            margin="normal"
            inputRef={passwordRef}
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur("password")}
            InputProps={{
              style: {
                backgroundColor: "#444957",
                color: "white",
                height: "40px",
                marginTop: "8px",
                borderColor:
                  passwordError || (passwordTouched && password === "")
                    ? "red"
                    : "#444957",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: {
                color:
                  passwordError || (passwordTouched && password === "")
                    ? "red"
                    : "white",
              },
            }}
            helperText={passwordError ? passwordErrorMessage : ""}
            FormHelperTextProps={{
              style: { color: "red", textAlign: "left" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    passwordError || (passwordTouched && password === "")
                      ? "red"
                      : "#444957",
                },
                "&:hover fieldset": {
                  borderColor: "#328ec8",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#328ec8",
                },
              },
            }}
          />

          <div className="flex justify-end w-full items-center mt-12">
            <a href="#" className="text-white" style={{ fontSize: "14px" }}>
              Forgot Password?
            </a>
          </div>

          <div className="flex justify-end w-full mt-4">
            <div className="flex justify-start w-full mt-2">
              <a
                href="#"
                className="text-[#328ec8]"
                style={{ fontSize: "14px" }}
              >
                I'm a New User
              </a>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="text-white px-4 py-2 rounded"
              disabled={isLoginButtonDisabled()}
              onClick={handleLoginClick}
              sx={{
                backgroundColor: isLoginButtonDisabled()
                  ? "#7081b0"
                  : "#328ec8",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
