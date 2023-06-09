import React, { useState } from "react";
import "./changepass.css";
import Chatbot from "../components/chatbot";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth, authcredentail } from "../Frontfirebase";
import NavbarPage from "../components/navnew";
import { useHistory } from "react-router-dom";
const Changepass = () => {
  // ที่เก็บ state
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [invalidpass, setInvalidpass] = useState(false);
  const [existpass, setExistpass] = useState(false);
  const [successpass, setSuccesspass] = useState(false);
  const [showDropdown, SetshowDropdown] = useState(true);
  let history = useHistory();
  // เอาข้อมูล user ที่ login อยู่
  var user = auth.currentUser;

  // verify user credentail
  const reauthenticate = (currentPassword) => {
    var cred = authcredentail.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const submitpass = async (e, oldPassword, newPassword) => {
    e.preventDefault();
    try {
      // reauthenticating
      await reauthenticate(oldPassword);
      // updating password
      await user.updatePassword(newPassword);
      setSuccesspass(true);
      setInvalidpass(false);
      setTimeout(() => {
        history.push({
          pathname: `/profile/${user.uid}`,
        });
      }, 1000);
    } catch (err) {
      console.log(err);
      setInvalidpass(true);
      setSuccesspass(false);
    }
  };

  // Style มาตรฐานของ Formik
  const styles = {
    row: {
      marginTop: "8rem",
    },
    txt1: {
      fontFamily: "Roboto",
      fontSize: "2.2rem",
      color: "#fff",
      marginBottom: "1rem",
      fontWeight: "700",
      textAlign: "center",
    },
    txt2: {
      fontFamily: "Roboto",
      fontSize: "1rem",
      color: "#fff",
    },
  };

  //object schema สำหรับทำ validation
  const RegisterSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, "กรุณากรอกตัวอักษรอย่างน้อย 6 ตัว")
      .max(20, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้"),
    password: Yup.string()
      .min(6, "กรุณากรอกตัวอักษรอย่างน้อย 6 ตัว")
      .max(20, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้"),
    confirmPassword: Yup.string()
      .min(6, "กรุณากรอกตัวอักษรอย่างน้อย 6 ตัว")
      .max(20, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้")
      //check is password match ?
      .test("รหัสผ่านตรงกัน", "รหัสผ่านไม่ตรงกัน", function (value) {
        return this.parent.password === value;
      }),
  });

  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <div className="container-changepass">
        <form
          className="ChangePassForm"
          onSubmit={(e) => submitpass(e, password, newpassword)}
        >
          <img src="/img/logoLogin.png" className="Logo-changepass" />
          <p className="h1 text-center mb-2 font-weight-bold">
            เปลี่ยนรหัสผ่าน
          </p>
          {invalidpass ? (
            <div className="alert-changepass-fail">
              <span>คุณกรอกรหัสผ่านเก่าผิด</span>
            </div>
          ) : (
            <p></p>
          )}
          {successpass ? (
            <div className="alert-changepass-success">
              <span>รหัสผ่านของคุณถูกเปลี่ยนแล้ว</span>
            </div>
          ) : (
            <p></p>
          )}
          <div className="col-md-12">
            <Formik
              initialValues={{
                name: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                username: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                // same shape as initial values
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group mb-3">
                    <Field
                      name="oldPassword"
                      type="password"
                      className={`form-control ${
                        touched.oldpassword
                          ? errors.oldpassword
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="oldPassword"
                      placeholder="รหัสผ่านปัจจุบัน"
                      onKeyUp={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="oldPassword"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group-changepass mb-3">
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${
                        touched.password
                          ? errors.password
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="password"
                      placeholder="รหัสผ่านใหม่"
                      onKeyUp={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group-changepass mb-1">
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={`form-control ${
                        touched.confirmPassword
                          ? errors.confirmPassword
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="confirmPassword"
                      placeholder="ยืนยันรหัสผ่านใหม่"
                    />
                    <ErrorMessage
                      component="div"
                      name="confirmPassword"
                      className="invalid-feedback"
                    />
                  </div>
                </Form>
              )}
            </Formik>

            <button type="submit" className="btn-block SaveChange mt-3">
              <div>
                <i class="fas fa-save pr-1 mr-3"></i>
              </div>
              <p className="mx-auto my-1">บันทึกข้อมูล</p>
            </button>
          </div>
        </form>
      </div>
      <Chatbot />
    </div>
  );
};

export default Changepass;
