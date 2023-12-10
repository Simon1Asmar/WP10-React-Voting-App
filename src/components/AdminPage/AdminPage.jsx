import React, { useEffect, useState } from "react";
import axios from "axios";

import "./AdminPage.css"

function AdminPage() {
  const [usersData, setUsersData] = useState();

  useEffect(()=>{
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(
          "https://65745cd7f941bda3f2afa76c.mockapi.io/votingapp/users"
        );
        setUsersData(response.data);
      } catch (error) {
        console.error("Error fetching users data:", error.message);
      }
    };

    fetchUsersData();
  },[]);

  return (
    <main className=".adminPage">
      <section>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Voted For</th>
            </tr>
          </thead>
          <tbody>
          {usersData.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.voted ? user.votedTo.name : "No Vote"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default AdminPage;
