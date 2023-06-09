import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./login.css";
import Chatbot from "../components/chatbot";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import { MDBInput } from "mdbreact";
import axios from "axios";
import NavbarPage from "../components/navnew";
const Login = () => {
  const location = useLocation();
  let history = useHistory();

  // ที่เก็บ state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailis_inVaild, setEmailis_inVaild] = useState(false);
  const [isnotLogin, setIsnotlogin] = useState(false);
  const [showDropdown, SetshowDropdown] = useState(true);

  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  // ฟังกชันสำหรับ Login ผ่านเว็บ
  const LoginSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        history.push("/");
      })
      .catch(() => {
        setEmailis_inVaild(true);
        setIsnotlogin(false);
      });
  };

  // ฟังกชันสำหรับ Login ผ่าน Google
  const googleLogin = async (e) => {
    e.preventDefault();
    const result = await auth.signInWithPopup(googleProvider);
    console.log(result);
    axios
      .post("https://monkeyfraud.onrender.com/user/googlesignup", {
        result: result,
      })
      .then((result) => {
        console.log(result.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ฟังกชันสำหรับโชว์ alert เวลาไปหน้าสร้างโพสแล้วยังไม่ login
  const Islogin = () => {
    if (location.state !== undefined && location.state.param !== "forgetpass") {
      setIsnotlogin(true);
      setEmailis_inVaild(false);
    } else if (location.state == undefined) {
      setIsnotlogin(false);
    }
  };

  useEffect(() => {
    Islogin();
  }, []);

  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <Chatbot />
      <div className="container-login">
        <form className="LoginForm">
          <img src="/img/logoLogin.png" className="Logo-login" />
          <p className="h1 text-center mb-2 font-weight-bold">เข้าสู่ระบบ</p>
          {emailis_inVaild ? (
            <div className="alert-login">
              {" "}
              <span>อีเมลหรือรหัสผ่านไม่ถูกต้อง</span>
            </div>
          ) : (
            ""
          )}
          {isnotLogin ? (
            <div className="alert-login">
              <span>กรุณาทำการ Login ก่อนโพสต์หรือคอมเมนต์ </span>
            </div>
          ) : (
            ""
          )}
          <div className="LoginInputForm">
            <MDBInput
              className="InputEmail-login"
              label="Email"
              icon="user"
              size="sm"
              group
              type="email"
              validate
              error="wrong"
              success="right"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <MDBInput
              className="InputPassword-login"
              label="Password"
              icon="unlock-alt"
              size="sm"
              group
              type="password"
              validate
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="message-login">
            <div className="ForgotPassword-login">
              <a href="./forgetpass">ลืมรหัสผ่าน?</a>
            </div>
          </div>

          <button onClick={LoginSubmit} className="btn-block LoginButton-login">
            <p className="mx-auto my-1">เข้าสู่ระบบ</p>
          </button>

          <div className="login-signup text-center mt-3">
            <p>
              ยังไม่มีบัญชี? <a href="./signup">สมัครสมาชิก</a>
            </p>
          </div>

          <button
            onClick={googleLogin}
            className="btn-block LoginGoogle-login mt-2"
          >
            <svg
              className="GoogleIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="#FFFFFF"
              viewBox="0 0 50 50"
            >
              <g>
                <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z "></path>
              </g>
            </svg>
            <p className="mx-auto my-1">เข้าสู่ระบบด้วย Google</p>
          </button>
        </form>
      </div>
      <div className="container-loginbottom"></div>
    </div>
  );
};

export default Login;
