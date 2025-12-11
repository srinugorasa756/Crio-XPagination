import { useEffect, useState } from "react";

export default function Tables() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //   const [search, setSearch] = useState("");

  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + 10;
  const pageData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);
  //   const filteredPageData = pageData.filter(({ name }) => {
  //     return name.toLowerCase().includes(search.toLowerCase());
  //   });

  const prevHandler = () => {
    setCurrentPage((prev) => {
      if (prev > 1) return prev - 1;
    });
  };
  const nextHandler = () => {
    setCurrentPage((prev) => {
      if (prev < totalPages) return prev + 1;
    });
  };
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_ENDPOINT);
        if (!res.ok) {
          throw new Error("Error in fetching API");
        }
        const finData = await res.json();
        setData(finData);
      } catch (error) {
        console.log("Error in fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {/* <input
        type="text"
        onChange={searchHandler}
        style={{ marginBottom: "10px" }}
      /> */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            justifyContent: "center",
          }}
        >
          <thead style={{ backgroundColor: "green" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={prevHandler} disabled={currentPage === 1}>
        Previous
      </button>
      <button>{currentPage}</button>
      <button onClick={nextHandler} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

const API_ENDPOINT =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
