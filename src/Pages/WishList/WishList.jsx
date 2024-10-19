import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner";
import useBooks from "../../hook/useBooks";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

const WishList = () => {
  const { books, loading } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowOptions = [5, 10, 20, 50, 100];
  const wishedBooks = [];
  const wishlistIdArray = JSON.parse(localStorage.getItem("wishedBook")) || [];
  const wishlistIds = wishlistIdArray.map((id) => Number(id));
  // console.log('wished Book Ids = ', wishlistIds);
  if (books) {
    wishedBooks.push(
      ...books.filter((book) => wishlistIds.includes(Number(book.id)))
    );
  }
  console.log(wishedBooks);

  const filteredBooks = wishedBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    setCurrentPage(1);
    localStorage.setItem("wishlistLastSearch", newSearchQuery);
  };
  useEffect(() => {
    const lastSearch = localStorage.getItem("wishlistLastSearch");
    if (lastSearch) {
      setSearchQuery(lastSearch);
    }
  }, []);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredBooks.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const removeFromWishlist = (id) => {
    const wishlist = JSON.parse(localStorage.getItem("wishedBook")) || [];
    const updatedWishlist = wishlist.filter((bookId) => Number(bookId) !== id);
    localStorage.setItem("wishedBook", JSON.stringify(updatedWishlist));

    setCurrentPage(1);
    toast.error("Removed from wishlist!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <h2 id="pageTitle">Wishlist Books</h2>
      <div id="tblContainer">
        <div className="searchAndPaginationSort">
          <div className="paginationSort">
            <label htmlFor="rowsPerPage">View</label>
            <select
              className="rowsPerPage"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              {rowOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label>Books per Page</label>
          </div>
          <div className="searchField wish-search-field">
            <input
              type="text"
              placeholder="Search by Book title"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <table id="tbl">
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Book Id</th>
              <th className="tbl-title">Book Title</th>
              <th className="tbl-title">Author</th>
              <th>Total Downloads</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book, index) => (
              <tr key={book?.id}>
                <td>{index + 1}</td>
                <td>{book?.id}</td>
                <td className="tbl-title">{book?.title}</td>
                <td className="tbl-title">
                  {book?.authors?.[0]?.name || "N/A"}
                </td>
                <td>{book?.download_count || 0}</td>
                <td>
                  <button
                    className="removeBtn"
                    onClick={() => removeFromWishlist(book.id)}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Remove from Wishlist"
                    data-tooltip-place="bottom"
                  >
                    <RiDeleteBack2Fill></RiDeleteBack2Fill>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Tooltip id="my-tooltip" />
      <ToastContainer />
    </div>
  );
};

export default WishList;
