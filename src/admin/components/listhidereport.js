import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import * as moment from "moment";
import "moment/locale/th";
import Modalimage from "../../user/components/Modalimage";
import Modaldelete from "../../user/components/Modaldelete";

const Listhidereport = ({ reportelement, CancleClick, DeleteClick }) => {
  const [UsernamePost, SetUsernamePost] = useState("");
  const [Show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [UsernameReport, SetUsernameReport] = useState("");
  const [checkselectOne, setCheckSelectOne] = useState(false);
  const [checkselectTwo, setCheckSelectTwo] = useState(false);
  const [checkselectThree, setCheckSelectThree] = useState(false);
  const [isopen, Setisopen] = useState(false);
  const [imagemodal, Setimagemodal] = useState();

  const [openmodal, Setopenmodal] = useState(false);
  const [modalcommentid, Setmodalcommentid] = useState();
  const [modalcommentmore, Setmodalcommentmore] = useState();
  const [fuck, Setfuck] = useState([]);
  const [imagesFile, setImagesFile] = useState();
  const [files, Setfiles] = useState();
  const [change, SetChange] = useState();

  const handlemodalopen = async () => {
    Setopenmodal(true);
  };
  const handlemodalclose = async () => {
    Setopenmodal(false);
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleopenmodal = async () => {
    Setisopen(true);
    handleClose();
  };
  const handleclosemodal = async (e) => {
    Setisopen(false);
    handleShow(e);
  };
  const InitReport = async () => {
    try {
      InitOtherData();
      const usernamepost = await Axios.get(
        `https://monkeyfraud.onrender.com/post/mypost/${reportelement.postid}`
      );
      SetUsernamePost(usernamepost.data.item);
      const usernamereport = await Axios.get(
        `https://monkeyfraud.onrender.com/user/session/${reportelement.userreport}`
      );
      SetUsernameReport(usernamereport.data.item);
    } catch (err) {
      console.log(err);
    }
  };
  const InitOtherData = () => {
    if (reportelement.selectOne === "") {
      setCheckSelectOne(false);
    } else if (reportelement.selectOne != "") {
      setCheckSelectOne(true);
    }
    if (reportelement.selectTwo === "") {
      setCheckSelectTwo(false);
    } else if (reportelement.selectTwo != "") {
      setCheckSelectTwo(true);
    }
    if (reportelement.selectThree === "") {
      setCheckSelectThree(false);
    } else if (reportelement.selectThree != "") {
      setCheckSelectThree(true);
    }
  };
  const cancleHide = async () => {
    console.log("CanCleHide ACtive");
    await Axios.post(
      `https://monkeyfraud.onrender.com/post/report/changeread/${reportelement.uid}`
    );
    CancleClick();
  };
  const deleteReport = async () => {
    await Axios.post(
      `https://monkeyfraud.onrender.com/post/report/delete/${reportelement.uid}`
    );
    DeleteClick();
  };
  useEffect(() => {
    InitReport();
  }, []);
  return (
    <div
      onClick={() => {
        if (isActive == true) {
          setIsActive(false);
        }
      }}
    >
      <div className="container-report1">
        <div className="container-report2">
          <Form className="formsize-report d-none d-sm-none d-md-inline">
            <div className="container-reportsetiing">
              <div className="menu-containerreportsetting">
                <div
                  onClick={() => setIsActive(!isActive)}
                  className="reportbuttonsetting"
                >
                  <img
                    className="reportimg-setting"
                    src="/img/setting.png"
                    alt="avatar"
                  ></img>
                </div>
                <div
                  className={`reportmenusetting ${
                    isActive ? "active" : "inactive"
                  }`}
                >
                  <ul className="ul-reportmenusetting">
                    <li className="li-reportmenusetting">
                      <a
                        className="a-reportmenusetting"
                        onClick={() => cancleHide()}
                      >
                        <div className="a-reportmenusetting1">
                          ยกเลิกการซ่อน
                        </div>
                      </a>
                    </li>
                    <li className="li-reportmenusetting">
                      <div
                        className="a-reportmenusetting"
                        onClick={() => (
                          Setmodalcommentid(reportelement.uid),
                          Setmodalcommentmore(reportelement),
                          setIsActive(false),
                          handlemodalopen()
                        )}
                      >
                        {" "}
                        ลบประวัติการรายงาน{" "}
                      </div>
                    </li>
                  </ul>
                  <Modaldelete
                    text={"deletepostAdminHideReport"}
                    openmodal={openmodal}
                    handlemodalclose={handlemodalclose}
                    modalcommentid={modalcommentid}
                    modalcommentmore={modalcommentmore}
                    setIsActive={setIsActive}
                    Setfuck={Setfuck}
                    setImagesFile={setImagesFile}
                    Setfiles={Setfiles}
                    handledeletetorerender={DeleteClick}
                  />
                </div>
              </div>
            </div>
            <Form.Row>
              <Form.Group
                as={Col}
                className="้report-left col-md-6 col-12"
                controlId="formGridName"
              >
                <Form.Label>
                  ผู้รายงาน : {UsernameReport && UsernameReport[0].username}{" "}
                </Form.Label>
              </Form.Group>

              {checkselectOne ? (
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="ข้อมูลไม่เหมาะสม"
                    checked
                    disabled
                  />
                </Form.Group>
              ) : (
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="ข้อมูลไม่เหมาะสม"
                    disabled
                  />
                </Form.Group>
              )}
            </Form.Row>

            <Form.Row>
              <Form.Group
                as={Col}
                className="้report-left col-md-6 col-12"
                controlId="formGridName"
              >
                <Form.Label>
                  วันเวลาที่แจ้ง :{" "}
                  {moment(new Date(reportelement.date.seconds * 1000)).format(
                    "MM/DD/YYYY HH:mm"
                  )}{" "}
                </Form.Label>
              </Form.Group>
              {checkselectTwo ? (
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="ข้อมูลไม่ถูกต้อง"
                    checked
                    disabled
                  />
                </Form.Group>
              ) : (
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="ข้อมูลไม่ถูกต้อง"
                    disabled
                  />
                </Form.Group>
              )}
            </Form.Row>

            <Form.Row>
              <Form.Group
                as={Col}
                className="้report-left col-md-6 col-12"
                controlId="formGridName"
              >
                <Form.Label>
                  เจ้าของโพสต์ : {UsernamePost && UsernamePost[0].username}{" "}
                </Form.Label>
              </Form.Group>

              {checkselectThree ? (
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="อื่นๆ" checked disabled />
                </Form.Group>
              ) : (
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="อื่นๆ" disabled />
                </Form.Group>
              )}
            </Form.Row>

            <Form.Row>
              <Form.Group
                as={Col}
                className="้report-left col-md-6 col-12"
                controlId="formGridName"
              >
                <Form.Label>
                  รูปหลักฐาน :
                  <div
                    variant="primary"
                    onClick={(e) => handleShow(e)}
                    className="proof-button-reported"
                  >
                    คลิกเพื่อดู
                  </div>{" "}
                </Form.Label>
                <Form.Row>
                  <Modal
                    show={Show}
                    onHide={handleClose}
                    className="modalreport"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="namereport">
                        รูปหลักฐาน
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bigreport1">
                      <Form.Row>
                        {reportelement.fileUploads
                          ? reportelement.fileUploads.map((element, index) => {
                              return (
                                <div className="img-holder-badslip">
                                  <img
                                    className="img-badreport"
                                    alt=""
                                    src={`${element.url}`}
                                    style={{ overflow: "hidden" }}
                                    onClick={() => (
                                      Setimagemodal(element.url),
                                      handleopenmodal()
                                    )}
                                  />
                                </div>
                              );
                            })
                          : null}
                      </Form.Row>
                    </Modal.Body>
                  </Modal>
                  <Modalimage
                    isopen={isopen}
                    handleopenmodal={handleopenmodal}
                    handleclosemodal={handleclosemodal}
                    imagemodal={imagemodal}
                  />
                </Form.Row>
                <Form.Label>
                  <div className="count-report">
                    จำนวนครั้งที่มีการรายงานโพสต์นี้ {reportelement.count} ครั้ง
                  </div>
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
                <div className="textarea-report">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    readOnly={true}
                    value={reportelement.description}
                  />
                </div>
              </Form.Group>
            </Form.Row>
          </Form>

          <div className="container-reportsetiing d-sm-none">
            <div className="menu-containerreportsetting">
              <div
                onClick={() => setIsActive(!isActive)}
                className="reportbuttonsetting"
              >
                <img
                  className="reportimg-setting"
                  src="/img/setting.png"
                  alt="avatar"
                ></img>
              </div>
              <div
                className={`reportmenusetting ${
                  isActive ? "active" : "inactive"
                }`}
              >
                <ul className="ul-reportmenusetting">
                  <li className="li-reportmenusetting">
                    <a
                      className="a-reportmenusetting"
                      onClick={() => cancleHide()}
                    >
                      <div className="a-reportmenusetting1">ยกเลิกการซ่อน</div>
                    </a>
                  </li>
                  <li className="li-reportmenusetting">
                    <div
                      className="a-reportmenusetting"
                      onClick={() => (
                        Setmodalcommentid(reportelement.uid),
                        Setmodalcommentmore(reportelement),
                        setIsActive(false),
                        handlemodalopen()
                      )}
                    >
                      {" "}
                      ลบประวัติการรายงาน{" "}
                    </div>
                  </li>
                </ul>
                <Modaldelete
                  text={"deletepostAdminHideReport"}
                  openmodal={openmodal}
                  handlemodalclose={handlemodalclose}
                  modalcommentid={modalcommentid}
                  modalcommentmore={modalcommentmore}
                  setIsActive={setIsActive}
                  Setfuck={Setfuck}
                  setImagesFile={setImagesFile}
                  Setfiles={Setfiles}
                  handledeletetorerender={DeleteClick}
                />
              </div>
            </div>
          </div>

          <div className="report-left d-sm-none mobile-size">
            <Form.Group
              as={Col}
              className="้col-md-6 col-12"
              controlId="formGridName"
            >
              <Form.Label>
                ผู้รายงาน : {UsernameReport && UsernameReport[0].username}{" "}
              </Form.Label>
            </Form.Group>
          </div>

          <div className="report-left d-sm-none mobile-size">
            <Form.Group
              as={Col}
              className="้col-md-6 col-12"
              controlId="formGridName"
            >
              <Form.Label>
                วันเวลาที่แจ้ง :{" "}
                {moment(new Date(reportelement.date.seconds * 1000)).format(
                  "MM/DD/YYYY HH:mm"
                )}{" "}
              </Form.Label>
            </Form.Group>
          </div>

          <div className="report-left d-sm-none mobile-size">
            <Form.Group
              as={Col}
              className="้col-md-6 col-12"
              controlId="formGridName"
            >
              <Form.Label>
                เจ้าของโพสต์ : {UsernamePost && UsernamePost[0].username}{" "}
              </Form.Label>
            </Form.Group>
          </div>

          <div className="report-left d-sm-none mobile-size">
            <Form.Group
              as={Col}
              className="้col-md-6 col-12"
              controlId="formGridName"
            >
              <Form.Label>
                รูปหลักฐาน :
                <div
                  variant="primary"
                  onClick={(e) => handleShow(e)}
                  className="proof-button-reported"
                >
                  คลิกเพื่อดู
                </div>
              </Form.Label>
              <Form.Row>
                <Modal show={Show} onHide={handleClose} className="modalreport">
                  <Modal.Header closeButton>
                    <Modal.Title className="namereport">รูปหลักฐาน</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="bigreport1">
                    <Form.Row>
                      {reportelement.fileUploads
                        ? reportelement.fileUploads.map((element, index) => {
                            return (
                              <div className="img-holder-badslip">
                                <img
                                  className="img-badreport"
                                  alt=""
                                  src={`${element.url}`}
                                  style={{ overflow: "hidden" }}
                                  onClick={() => (
                                    Setimagemodal(element.url),
                                    handleopenmodal()
                                  )}
                                />
                              </div>
                            );
                          })
                        : null}
                    </Form.Row>
                  </Modal.Body>
                </Modal>
                <Modalimage
                  isopen={isopen}
                  handleopenmodal={handleopenmodal}
                  handleclosemodal={handleclosemodal}
                  imagemodal={imagemodal}
                />
              </Form.Row>
              <Form.Label>
                <div className="count-report">
                  จำนวนครั้งที่มีการรายงานโพสต์นี้ {reportelement.count} ครั้ง
                </div>
              </Form.Label>
            </Form.Group>
          </div>

          <div className="report-right d-sm-none">
            {checkselectOne ? (
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="ข้อมูลไม่เหมาะสม"
                  checked
                  disabled
                />
              </Form.Group>
            ) : (
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="ข้อมูลไม่เหมาะสม" disabled />
              </Form.Group>
            )}
          </div>

          <div className="report-right d-sm-none">
            {checkselectTwo ? (
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="ข้อมูลไม่ถูกต้อง"
                  checked
                  disabled
                />
              </Form.Group>
            ) : (
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="ข้อมูลไม่ถูกต้อง" disabled />
              </Form.Group>
            )}
          </div>

          <div className="report-right d-sm-none">
            {checkselectThree ? (
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="อื่นๆ" checked disabled />
              </Form.Group>
            ) : (
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="อื่นๆ" disabled />
              </Form.Group>
            )}
          </div>

          <div className="report-right d-sm-none">
            <Form.Row>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
                <div className="textarea-report">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    readOnly={true}
                    value={reportelement.description}
                  />
                </div>
              </Form.Group>
            </Form.Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listhidereport;
