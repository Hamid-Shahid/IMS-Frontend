import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsersByPagination } from "../../services/authentication";
import NotFound from "../../components/NotFound";

const User = () => {
  const dispatch = useDispatch();
  const { list: users, loading, currentPage, totalPages } = useSelector(
    (state) => state.authentication.users
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filteredUsers = users.filter((user) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return (
      user?.fullName.toLowerCase().includes(lowerCaseSearchTerm) ||
      user?.username.toLowerCase().includes(lowerCaseSearchTerm) ||
      user?.email.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  function handleDelete(id) {
    setShowModal(true);
    setDeletedId(id);
  }

  function confirmation() {
    dispatch(deleteUser(deletedId));
    setShowModal(false);
  }

  useEffect(() => {
    dispatch(getUsersByPagination({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-4 sm:px-8">
      {/* {loading && <Loader />} */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-users mr-2 text-[#213555]"></i>
            Users
          </div>

          <Link to={"/register"}>
            <div className="text-xs pt-1 flex items-center text-green-500 hover:text-green-400">
              <i className="fas fa-add mr-1"></i>
              <p>Add User</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search Users by Name, Username, or Email"
          className="border border-gray-400 rounded-md p-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="overflow" className="overflow-x-auto">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-gray-700 text-gray-100 text-primary">
              {["SR#", "Full Name", "Username", "Email", "Actions"].map((header) => (
                <th key={header} className="text-[0.92rem] py-3 px-4 border-b border-secondary">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 &&
              filteredUsers.map((user, index) => (
                <tr key={user.id} className="odd:bg-gray-200 hover:bg-gray-300">
                  <td className="py-3 px-4 border-b border-secondary">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-secondary">{user.fullName}</td>
                  <td className="py-3 px-4 border-b border-secondary">{user.username}</td>
                  <td className="py-3 px-4 border-b border-secondary">{user.email}</td>
                  <td className="py-3 px-4 border-b border-secondary flex items-center space-x-2">
                    {/* <Link to={`/edit-user/${user.id}`}>
                      <button className="text-green-500 hover:text-green-400" title="Edit">
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </Link> */}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-400"
                      title="Delete"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!loading && filteredUsers.length === 0 && <NotFound message={"user"} />}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#213555] hover:bg-[#3E5879] text-gray-100 rounded-md"
        >
          Prev
        </button>
        <span className="py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#213555] hover:bg-[#3E5879] text-gray-100 rounded-md"
        >
          Next
        </button>
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)} isConfirm={confirmation} />}
    </section>
  );
};

export default User;
