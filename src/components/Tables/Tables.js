import React from "react";
import { Badge, Card, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./table.css";
import Dropdown from "react-bootstrap/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { url } from "../../App";

function Tables({
  users,
  deleteData,
  getData,
  page,
  search,
  gender,
  status,
  sort,
}) {
  let handleChange = async (id, status) => {
    console.log("hello");
    let res = await axios.put(`${url}/status/${id}`, { status });
    console.log(res);
    if (res.status === 201) {
      getData();

      toast.success("Status Updated Successfully");
    } else {
      toast.error("error");
    }
  };

  let deleteUser = async (id) => {
    let res = await axios.delete(`${url}/delete/${id}`);
    console.log(res);
  };
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0 p-2">
            <Card className="shadow">
              <Table striped bordered hover>
                <thead className="head">
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1 + (page - 1) * 4}</td>
                          <td>{e.fname + e.lname}</td>
                          <td>{e.email}</td>
                          <td>{e.mobile}</td>
                          <td>{e.gender == "male" ? "M" : "F"}</td>
                          <td className="d-flex align-items-center">
                            <Dropdown className="text-center ">
                              <Dropdown.Toggle
                                className="dropdown_btn"
                                id="dropdown-basic"
                              >
                                <Badge
                                  bg={
                                    e.status == "Active" ? "primary" : "danger"
                                  }
                                >
                                  {e.status}{" "}
                                  <i class="fa-solid fa-caret-down"></i>
                                </Badge>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => handleChange(e._id, "Active")}
                                >
                                  Active
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleChange(e._id, "InActive")
                                  }
                                >
                                  InActive
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>
                            <Dropdown className="text-center ">
                              <Dropdown.Toggle
                                variant="light"
                                className="action"
                                id="dropdown-basic"
                              >
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/profile/${e._id}`}
                                    className="text-decoration-none"
                                  >
                                    <i
                                      class="fa-solid fa-eye"
                                      style={{ color: "red" }}
                                    ></i>
                                    &nbsp;<span>view</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/edit/${e._id}`}
                                    className="text-decoration-none"
                                  >
                                    <i
                                      class="fa-solid fa-pen-to-square"
                                      style={{ color: "blue" }}
                                    ></i>
                                    &nbsp;<span>Edit</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <div onClick={() => deleteData(e._id)}>
                                    <i
                                      class="fa-solid fa-trash"
                                      style={{ color: "purple" }}
                                    ></i>
                                    &nbsp;
                                    <span> Delete</span>
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div className="no_data text-center">No Data Found</div>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
}

export default Tables;
