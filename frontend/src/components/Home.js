import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { BASE_URL } from "../api/axios";
const GET_INVENTORY_URL = "getInventory";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${BASE_URL+GET_INVENTORY_URL}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section>
      <h1>Public Home Page</h1>
      <br />
      <div>
      <Table>
              <Thead>
                <Tr>
                  <Th>Item Name</Th>
                  <Th>Department</Th>
                  <Th>Category</Th>
                  <Th>List Price</Th>
                  <Th>Quantity</Th>
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
            </div>
    </section>
  );
};

export default Home;
