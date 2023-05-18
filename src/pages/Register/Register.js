import React, { useState, useEffect } from "react";
import "./register.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spiner from "../../components/Spiner/Spiner";
import { url } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  let [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
  });
  let [status, setStatus] = useState("Active");

  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  let navigate = useNavigate();

  let setInputValue = (e) => {
    let { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };
  let setStatusValue = (e) => {
    setStatus(e.value);
  };
  let [showspinner, setShowSpinner] = useState(true);

  let submitUserData = async (e) => {
    e.preventDefault();
    let { fname, lname, email, mobile, gender } = inputdata;

    if (fname === "") {
      toast.error("first Name is required!");
    } else if (lname === "") {
      toast.error("Last Name is required!");
    } else if (email === "") {
      toast.error("Email  is required!");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid email");
    } else if (mobile === "") {
      toast.error("mobile  is required!");
    } else if (mobile.length > 10) {
      toast.error("Enter the correct mobile number !");
    } else if (gender === "") {
      toast.error("Gender is required!");
    } else if (status === "") {
      toast.error("Status is required!");
    } else {
      toast.success("User Register Done Successfully");
    }
    try {
      let res = await axios.post(`${url}/register`, {
        fname,
        lname,
        email,
        mobile,
        gender,
        status,
      });
      console.log(res);
      if (res.status === 201) {
        toast.success(res.data.message);
        setInputData({
          ...inputdata,
          fname: "",
          lname: "",
          email: "",
          moble: "",
          gender: "",
        });
        setStatus("");
        // navigate("/");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  }, []);

  return (
    <>
      {showspinner ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-3">Register Your Details</h2>
          <Card className="shadow mt-5 p-5">
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    value={inputdata.fname}
                    onChange={setInputValue}
                    placeholder="Enter Your First Name"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    value={inputdata.lname}
                    onChange={setInputValue}
                    placeholder="Enter Your Last Name"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>E-Mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={inputdata.email}
                    onChange={setInputValue}
                    placeholder="Enter Your E-Mail"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={inputdata.mobile}
                    onChange={setInputValue}
                    placeholder="Enter Your Mobile Number"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    value="Male"
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value="Female"
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options} onChange={setStatusValue} />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={submitUserData}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
}

export default Register;
