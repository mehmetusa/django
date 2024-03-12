import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Modal from "./Modal";
import Loading from "./Loading";
import { BASE_URL } from "../api/axios";

const Admin = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
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
      .get(`${BASE_URL}/get/`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
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
      await axios.delete(`${BASE_URL}/delete/${id}/`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
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
                    <Td>
                      {" "}
                      <button onClick={() => handleClickEdit(row)}>Edit</button>
                      <button onClick={() => handleDelete(row.id)}>
                        Delete
                      </button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <button onClick={handleClickAdd}>Add</button>
            <div className="flexGrow">
              <button onClick={logout}>Sign Out</button>
            </div>
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
