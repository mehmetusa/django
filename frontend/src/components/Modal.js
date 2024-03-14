import React, { useState, useEffect } from "react";
import axios from "../api/axios";
const POST_INVENTORY_URL = 'postInventory';
const UPDATE_INVENTORY ='updateInventory/'
const DELETE_INVENTORY ='deleteInventory/'

const Modal = ({
  isOpen,
  closeModal,
  action,
  item,
  onAddOrUpdate,
  onDelete,
}) => {
  const [formData, setFormData] = useState({ ...item });

  useEffect(() => {
    setFormData({ ...item }); 
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === "add") {
      try {
      const response = await axios.post(
        POST_INVENTORY_URL,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );   
        onAddOrUpdate(response.data);
        setFormData({});
        closeModal();
      } catch (error) {
        console.error("Error adding item:", error);
      }
    } else if (action === "edit") {
      try {
        const response = await axios.put(
          `${UPDATE_INVENTORY}${formData.id}`,
          formData
        );
        onAddOrUpdate(response.data);
        setFormData({});
        closeModal();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else if (action === "delete") {
      try {
        await axios.delete(
          `${DELETE_INVENTORY}${formData.id}`);
        onDelete(item.id);
        closeModal();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>{action === "add" ? "Add Item" : "Edit Item"}</h2>
          <form onSubmit={handleSubmit}>
            <label>Item Name:</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
            <label>Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
            <label>Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <label>Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            <label>Cost:</label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
            />
            <label>list price:</label>
            <input
              type="number"
              id="listPrice"
              name="listPrice"
              value={formData.listPrice}
              onChange={handleChange}
            />
            <button type="submit">
              {action === "add"
                ? "Add"
                : action === "edit"
                ? "Update"
                : "Delete"}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
