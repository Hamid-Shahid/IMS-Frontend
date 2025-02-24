import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteOrder, getOrdersByPagination, recieveOrder } from "../../services/order";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import NotFound from "../../components/NotFound";

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, currentPage, totalPages, totalOrders } = useSelector((state) => state.order);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedId, setDeletedId] = useState(null);
  const [receivingId, setReceivingId] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10; // Define how many orders per page

  useEffect(() => {
    dispatch(getOrdersByPagination({ page, limit }));
  }, [dispatch, page]);

  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return (
      order?.vendor.toLowerCase().includes(lowerCaseSearchTerm) ||
      order?.material.toLowerCase().includes(lowerCaseSearchTerm) ||
      order?.quantity.toString().includes(lowerCaseSearchTerm) ||
      order?.costPerUnit.toString().includes(lowerCaseSearchTerm) ||
      order?.totalCost.toString().includes(lowerCaseSearchTerm) ||
      order?.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  function handleDelete(id) {
    setShowDeleteModal(true);
    setDeletedId(id);
  }

  function handleReceiveOrder(id) {
    setShowReceiveModal(true);
    setReceivingId(id);
  }

  function confirmDelete() {
    dispatch(deleteOrder(deletedId));
    setShowDeleteModal(false);
  }

  function confirmReceive() {
    dispatch(recieveOrder(receivingId));
    setShowReceiveModal(false);
  }

  return (
    <section className="p-3 sm:p-4 rounded-lg w-full h-auto mt-[10px] sm:px-8">
      {/* {loading && <Loader />} */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between px-2 py-4">
        <div className="flex justify-between sm:justify-center items-center gap-4 text-xl sm:text-[1.4rem] font-semibold">
          <div>
            <i className="fas fa-shopping-basket mr-3 text-[#213555]"></i>
            Orders
          </div>
          <Link to={"/add-order"}>
            <div className="text-xs pt-1 flex items-center text-green-500 hover:text-green-400">
              <i className="fas fa-add mr-1 "></i>
              <p>Place order</p>
            </div>
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search Order by any field"
          className="border border-gray-400 rounded-md p-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="overflow" className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
          <thead>
            <tr className="bg-gray-700 text-gray-100 text-primary">
              {["SR#", "Vendor", "Material", "Quantity", "Cost Per Unit", "Total Cost", "Status", "Actions"].map(
                (header) => (
                  <th key={header} className="text-[0.92rem] py-3 px-4 border-b border-secondary">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 &&
              filteredOrders.map((order, index) => (
                <tr key={order._id} className="odd:bg-gray-200 hover:bg-gray-300">
                  <td className="py-3 px-4 border-b border-secondary">{(page - 1) * limit + index + 1}</td>
                  <td className="py-3 px-4 border-b border-secondary">{order.vendor}</td>
                  <td className="py-3 pl-6 border-b border-secondary">{order.material}</td>
                  <td className="py-3 pl-6 border-b border-secondary">{order.quantity}</td>
                  <td className="py-3 pl-10 border-b border-secondary">{order.costPerUnit}</td>
                  <td className="py-3 px-4 border-b border-secondary">{order.totalCost}</td>
                  <td className="py-3 px-4 border-b border-secondary">{order.status}</td>
                  <td className="py-3 pl-8 border-b border-secondary flex items-center space-x-2">
                    <button onClick={() => handleReceiveOrder(order._id)} className="text-blue-500 hover:text-blue-400">
                      <i className="fas fa-box"></i>
                    </button>
                    <Link to={`/edit-order/${order._id}`}>
                      <button className="text-green-500 hover:text-green-400" title="Edit">
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </Link>

                    <button onClick={() => handleDelete(order._id)} className="text-red-500 hover:text-red-400" title="Delete">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && filteredOrders.length === 0 && <NotFound message={"order"} />}
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

      {showDeleteModal && <Modal onClose={() => setShowDeleteModal(false)} isConfirm={confirmDelete} />}
      {showReceiveModal && <Modal onClose={() => setShowReceiveModal(false)} isConfirm={confirmReceive} type="receive" />}
    </section>
  );
};

export default Order;
