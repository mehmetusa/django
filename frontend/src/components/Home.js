import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/get/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async () => {
    try {
      localStorage.removeItem("authToken");
      setAuth(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
      <div>
      <Table>
              <Thead>
                <Tr>
                  <Th>Item Name</Th>
                  <Th>Department</Th>
                  <Th>Category</Th>
                  <Th>List Price</Th>
                  <Th>Quantity</Th>
                  <Th>ACTION</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((row) => (
                  <Tr>
                    <Td> {row.itemName}</Td>
                    <Td>{row.department}</Td>
                    <Td>{row.category}</Td>
                    <Td>{row.listPrice}</Td>
                    <Td>{row.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
        <div className="flexGrow">
          <button onClick={logout}>Sign Out</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
