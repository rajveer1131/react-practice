import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("userlist");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [userToList, setUserToList] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUserList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${userToList}`
      );
      if (!response.ok) throw new Error(`HTTPS error:${response.status}`);
      const data = await response.json();
      console.log(data.results);
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [userToList]);

  useEffect(() => {
    localStorage.setItem("userlist", JSON.stringify(users));
  }, [users]);

  const filteredUserList = users.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-200 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-4">UserList</h1>
      <div className="flex gap-4 mb-8">
        {[10, 50, 200].map((num) => (
          <button
            key={num}
            onClick={() => setUserToList(num)}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              userToList === num
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-blue-600"
            }`}
          >
            {num} users
          </button>
        ))}
      </div>
      <div className="mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Search users by name..."
          className="w-full h-12 px-6 rounded-full border-2 border-slate-300 focus:border-blue-500 focus:outline-none shadow-sm transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isLoading ? (
        <p className="animate-bounce font-medium text-2xl">Loading...</p>
      ) : (
        <>
          {" "}
          {filteredUserList.length == 0 && !isLoading ? (
            <div className="text-center mt-10">
              <p className="text-xl text-slate-500">
                No users found matching "{searchTerm}"
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
              {filteredUserList.map((user) => (
                <div
                  key={user.login.uuid}
                  className="bg-white p-4 flex flex-col items-center rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-all
             w-64"
                >
                  <img
                    src={user.picture.large}
                    alt={user.name.first}
                    className="w-32 h-32 rounded-full border-4 border-slate-100 shadow-sm mb-4 "
                  ></img>

                  <div className="text-center">
                    <p className="font-bold text-lg text-slate-800">
                      {user.name.first} {user.name.last}
                    </p>
                    <p className="text-sm text-slate-500 truncate w-48">
                      {user.email}
                    </p>
                    <div className="mt-3 inline-block bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold">
                      Age: {user.dob.age}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserList;
