import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Spiner from "../../components/Spiner/Spiner";
import { useParams } from "react-router-dom";
import "./profile.css";
import { url } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  let { id } = useParams();
  let [user, setUser] = useState({});

  let [showspinner, setShowSpinner] = useState(true);

  let getData = async () => {
    try {
      let res = await axios.get(`${url}/profile/${id}`);
      if (res.status === 200) {
        console.log(res);
        setUser(res.data.user[0]);
        console.log(res.data.user);
      }
    } catch (error) {
      console.log(error);
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
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <div className="text-center">
                <h3>
                  <span>{user.fname + user.lname}</span>
                </h3>
                <h4>
                  <i className="fa-solid fa-envelope email"></i>
                  &nbsp;&nbsp;:&nbsp;&nbsp;<span>{user.email}</span>
                </h4>
                <h4>
                  <i className="fa-solid fa-mobile mobile"></i>
                  &nbsp;&nbsp;:&nbsp;&nbsp;<span>{user.mobile}</span>
                </h4>
                <h4>
                  <i className="fa-solid fa-person person"></i>
                  &nbsp;&nbsp;:&nbsp;&nbsp;<span>{user.gender}</span>
                </h4>
                <h4>
                  Status&nbsp;&nbsp;:&nbsp;&nbsp;<span>{user.status}</span>
                </h4>
                <h4>
                  <i className="fa-solid fa-calendar-days calender"></i>
                  &nbsp;&nbsp;:&nbsp;&nbsp;
                  {new Date(user.datecreated).toLocaleString("en-uk")}
                </h4>
                <h4>
                  <i className="fa-solid fa-calendar-days calender"></i>
                  &nbsp;&nbsp;:&nbsp;&nbsp;{user.dateupdated}
                </h4>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}

export default Profile;
