"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import { useRouter } from "next/navigation";
import { SafeLocalStorage, getCookie } from "../utils";
import { UserContext } from "../Contexts/context";

const ContactUs = () => {
  const {adminSignOut} = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [sortedBy, setSortedBy] = useState("date");
  const navigate = useRouter();
  
  async function fetchData() {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token_admin"),
      },
    };
    try {
      const response = await axios.get(
        `${serverUrl}/contactus/getContact`,
        config
      );
      setContacts(response.data);
    } catch (error) {
      console.error(error);
      if(err.response?.data?.error == "INVALID_ADMIN_TOKEN"){
        adminSignOut();
        navigate.push("/admin");
      }
    }
  }
  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin")?true:false;
    if (!isAdmin) {
      navigate.push("/");
    }
    fetchData();
  }, []);

  const handleSort = (sortKey) => {
    const sortedContacts = [...contacts];
    if (sortKey === "date") {
      sortedContacts.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sortKey === "name") {
      sortedContacts.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
    setContacts(sortedContacts);
    setSortedBy(sortKey);
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token_admin"),
        },
      };
      await axios.delete(`${serverUrl}/contactus/delete/${id}`, config);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Contact Data</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleSort("date")}
          className={`mr-4 ${
            sortedBy === "date" ? "text-blue-500 font-semibold" : ""
          }`}
        >
          Sort by Date
        </button>
        <button
          onClick={() => handleSort("name")}
          className={`${
            sortedBy === "name" ? "text-blue-500 font-semibold" : ""
          }`}
        >
          Sort by Name
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border py-2 px-4">Date</th>
            <th className="border py-2 px-4">Full Name</th>
            <th className="border py-2 px-4">Email</th>
            <th className="border py-2 px-4">Message</th>
            <th className="border py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} className="odd:bg-gray-100">
              <td className="border py-2 px-4">
                {new Date(contact.date).toLocaleString()}
              </td>
              <td className="border py-2 px-4">{contact.fullName}</td>
              <td className="border py-2 px-4">{contact.email}</td>
              <td className="border py-2 px-4">{contact.message}</td>
              <td className="border py-2 px-4"><button
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(contact._id)}
                >
                  Delete
                </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactUs;
