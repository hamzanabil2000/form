"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUsers(JSON.parse(storedUserData));
    }
  }, []);

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("userData", JSON.stringify(updatedUsers));
  };

  const handleEdit = (user, index) => {
    setEditingUser(index);
    setFormData({
      mobile: user.mobile || "",
      email: user.email || "",
      password: user.password || "",
    });
  };

  const handleSave = () => {
    const updatedUsers = users.map((user, index) =>
      index === editingUser ? { ...user, ...formData } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("userData", JSON.stringify(updatedUsers)); 
    setEditingUser(null); 
    setFormData({ mobile: "", email: "", password: "" });
  };

  return (
    <div className="w-full mt-5">
      <button
        onClick={() => router.push("/")}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded flex items-center ml-2"
      >
        <span className="mr-2 mb-1">&#8592;</span>
      </button>

      <h2 className="text-2xl text-center text-white mb-4">User Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">#</th>
              <th className="py-2 px-4 bg-gray-200">Mobile / Email</th>
              <th className="py-2 px-4 bg-gray-200">Password</th>
              <th className="py-2 px-4 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="text-center">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">
                  {editingUser === index ? (
                    <input
                      type="text"
                      value={formData.mobile || formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                      placeholder="Mobile or Email"
                      className="border rounded px-2 py-1"
                    />
                  ) : user.mobile ? (
                    user.mobile
                  ) : (
                    user.email
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingUser === index ? (
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="Password"
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    user.password
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingUser === index ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white py-1 px-3 mr-5 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-500 text-white py-1 px-3 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user, index)}
                        className="bg-green-500 text-white py-1 px-3 mr-5 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
