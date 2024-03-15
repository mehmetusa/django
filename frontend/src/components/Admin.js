import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Modal from "./Modal";
import Loading from "./Loading";
import { BASE_URL } from "../api/axios";
const GET_INVENTORY_URL = "getInventory";
const DELETE_INVENTORY ='deleteInventory/'

const Admin = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${BASE_URL+GET_INVENTORY_URL}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickEdit = (row) => {
    setSelectedItem(row);
    setAction("edit");
    setIsOpen(true);
  };

  const handleClickAdd = () => {
    setAction("add");
    setIsOpen(true);
  };

  const handleAddOrUpdate = (updatedData) => {
    if (action === "add") {
      setData([...data, updatedData]);
    } else if (action === "edit") {
      setData(
        data.map((item) => (item.id === updatedData.id ? updatedData : item))
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL+DELETE_INVENTORY}${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Table>
              <Thead>
                <Tr>
                  <Th>Item Name</Th>
                  <Th>Department</Th>
                  <Th>Category</Th>
                  <Th>List Price</Th>
                  <Th>Cost</Th>
                  <Th>Quantity</Th>
                  <Th>Date created</Th>
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
                    <Td>{row.cost}</Td>     
                    <Td>{row.quantity}</Td>
                    <Td>{row.date_created}</Td>
                    <Td>
                      {" "}
                      <button onClick={() => handleClickEdit(row)}>Edit</button>
                      <button style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }} onClick={() => handleDelete(row.id)}>
                        Delete
                      </button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <button onClick={handleClickAdd}>Add</button>
          </div>
          <div>
            {isOpen && (
              <Modal
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                action={action}
                item={selectedItem}
                onAddOrUpdate={handleAddOrUpdate}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Admin;
