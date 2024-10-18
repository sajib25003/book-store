import { Link } from "react-router-dom";
import useBooks from "../../hook/useBooks";
import "../../index.css";
import Spinner from "../../Components/Spinner";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Banner from "../../Components/banner";

const Home = () => {
  const { books, loading } = useBooks();
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "genre") {
        return (a.subjects?.[0] || "").localeCompare(b.subjects?.[0] || "");
      } else {
        return 0;
      }
    });

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

  const getWishlist = () => {
    const storedWishlist = localStorage.getItem("wishedBook");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  };

  const isInWishlist = (id) => {
    return wishlist.includes(id);
  };

  const addToWishlist = (id) => {
    const updatedWishlist = [...wishlist, id];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishedBook", JSON.stringify(updatedWishlist));
    toast.success("Added to Wishlist!", {
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
  };

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="home-div">
      <Banner></Banner>
      <h2 id="pageTitle">All Books</h2>
      <div className="searchAndSort">
        <div className="sortField">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="title">Title</option>
            <option value="genre">Genre</option>
          </select>
        </div>
        <div className="searchField">
          <input
            type="text"
            placeholder="Search by Book title"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="book-container" id="homePage">
        {currentBooks.map((book) => (
          <div key={book?.id} className="book-card">
            <div className="image-container">
              <img
                src={book?.formats["image/jpeg"]}
                alt={`Cover of ${book?.title}`}
                className="book-cover"
              />
            </div>
            <div className="card-body">
              <h3>{book?.title}</h3>
              <p>
                <strong>ID:</strong> {book?.id}
              </p>
              <p>
                <strong>Author:</strong>{" "}
                {book.authors && book.authors.length > 0
                  ? book.authors.map((author, idx) => (
                      <span key={idx}>
                        {author.name}
                        {author.birth_year && ` (${author.birth_year}`}
                        {author.death_year && `- ${author.death_year})`}
                        {idx < book.authors.length - 1 && ", "}
                      </span>
                    ))
                  : "Unknown"}
              </p>

              <p className="genre">
                <strong>Genres:</strong> {book?.subjects?.join(", ") || "N/A"}
              </p>
            </div>

            <div className="button-container">
              {!isInWishlist(book.id) ? (
                <button
                  className="button addToWishlist"
                  onClick={() => addToWishlist(book.id)}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Add To wishlist"
                  data-tooltip-place="bottom"
                >
                  <FaHeart />
                </button>
              ) : (
                <button
                  className="button addedToWishlist"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Added To wishlist"
                  data-tooltip-place="bottom"
                >
                  <FaHeart />
                </button>
              )}
              <Link to={`/viewBook/${book?.id}`} className="button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container-home">
        <div className="paginationSort">
          <label htmlFor="rowsPerPage">Rows per page:</label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            {[6, 9, 12, 30, 90, 120].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
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

export default Home;
