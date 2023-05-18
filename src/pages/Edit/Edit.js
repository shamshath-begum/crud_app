import "./edit.css";
import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  let { id } = useParams();
  let navigate = useNavigate();
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
  let [user, setUser] = useState({});

  // let navigate = useNavigate();
  // let { adduser, setAddUser } = useContext(addData);

  let setInputValue = (e) => {
    let { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };
  let setStatusValue = (e) => {
    setStatus(e.value);
  };

  let getData = async () => {
    try {
      let res = await axios.get(`${url}/edit/${id}`);
      if (res.status === 200) {
        setInputData(res.data.user[0]);
        setStatus(res.data.status);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
      let res = await axios.put(`${url}/edit/${id}`, {
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
    getData();
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  }, [id]);

  return (
    <>
      {showspinner ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-3">Update Your Details</h2>
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
                    value="male"
                    checked={inputdata.gender === "Male" ? true : false}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value="Female"
                    checked={inputdata.gender === "Female" ? true : false}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Select Your Status</Form.Label>
                  <Select
                    options={options}
                    defaultValue={status}
                    onChange={setStatusValue}
                  />
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

export default Edit;
