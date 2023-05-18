import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./home.css";
import Dropdown from "react-bootstrap/Dropdown";
import Tables from "../../components/Tables/Tables";
import Spiner from "../../components/Spiner/Spiner";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../App";
import Button from "react-bootstrap/Button";
import Paginations from "../../components/Paginations/Paginations";

function Home() {
  let [showspinner, setShowSpinner] = useState(true);
  let [users, setUsers] = useState([]);
  let [search, setSearch] = useState("");
  let [gender, setGender] = useState("All");
  let [status, setStatus] = useState("All");
  let [sort, setSort] = useState("new");
  let [page, setPage] = useState(1);
  let [pageCount, setPageCount] = useState(0);
  

  let getData = async (search, gender, status, sort, page) => {
    console.log(search, gender, status, sort, page);
    try {
      let res = await axios.get(
        `${url}/display-user?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`
      );
      if (res.status === 200) {
        
        console.log(res.data);
        setUsers(res.data.users);
        setPageCount(res.data.Pagination.pageCount);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  let deleteData = async (id) => {
    try {
      let res = await axios.delete(`${url}/delete/${id}`);

      if (res.status === 200) {
        console.log(res);
        getData();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  let handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  let handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    getData();
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  }, [search, gender, status, sort, page]);
  return (
    <>
      <div className="container">
        <div className="main_div">
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  variant="success"
                  onClick={() => getData(search, gender, status, sort, page)}
                >
                  Search
                </Button>
              </Form>
            </div>
          </div>
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    value="Male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value="Female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="All"
                    name="gender"
                    value="All"
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                </div>
              </div>
            </div>
            <div className="filter_newold">
              <h3>Short By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New Data
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old Data
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="filter_status">
              <div className="filter">
                <h3>Filter By Status</h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    type="radio"
                    label="Active"
                    name="status"
                    value="Active"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="InActive"
                    name="status"
                    value="InActive"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="All"
                    name="status"
                    value="All"
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                </div>
              </div>
            </div>
          </div>
          {showspinner ? (
            <Spiner />
          ) : (
            <Tables
              users={users}
              deleteData={deleteData}
              getData={getData}
              page={page}
              search={search}
              gender={gender}
              status={status}
              sort={sort}
            />
          )}
          <Paginations
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            setPage={setPage}
            pageCount={pageCount}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
