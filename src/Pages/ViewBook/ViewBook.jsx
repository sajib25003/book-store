import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useBooks from "../../hook/useBooks";
import Spinner from "../../Components/Spinner";
import "./viewBook.css";
import { FaHeart } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { books, loading } = useBooks();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const getWishlist = () => {
    const wishlist = localStorage.getItem("wishedBook");
    return JSON.parse(wishlist).map(Number); 
  };

  const addToWishlist = () => {
    const wishlist = getWishlist();
    const bookId = Number(id);

    if (!wishlist.includes(bookId)) {
      wishlist.push(bookId);
      localStorage.setItem("wishedBook", JSON.stringify(wishlist));
      setIsInWishlist(true);
      toast.success('Added to Wishlist!', {
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
    }
  };

  useEffect(() => {
    if (books) {
      const selectedBook = books.find((book) => book.id === parseInt(id));
      setBook(selectedBook);
    }
  }, [books, id]);

  useEffect(() => {
    const checkIfBookInWishlist = () => {
      const wishlist = getWishlist();
      const bookId = Number(id); 
      if (wishlist.includes(bookId)) {
        setIsInWishlist(true);
      }
    };
    checkIfBookInWishlist();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="book-card view-book-card">
      <div className="img-container">
        <img
          src={book?.formats["image/jpeg"]}
          alt={`Cover of ${book?.title}`}
          className="book-cover"
        />
      </div>
      <div className="card-body">
        <h3>{book?.title || "Title not available"}</h3>
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
        <p className="translator">
          <strong>Translators:</strong>{" "}
          {book?.translators && book.translators.length > 0
            ? book.translators.map((translator, idx) => (
                <span key={idx}>
                  {translator.name}
                  {translator.birth_year && ` (${translator.birth_year}`}
                  {translator.death_year && `- ${translator.death_year})`}
                  {idx < book.translators.length - 1 && ", "}
                </span>
              ))
            : "N/A"}
        </p>
        <p className="genre">
          <strong>Genres:</strong>{" "}
          {book?.subjects?.length > 0 ? book.subjects.join(", ") : "N/A"}
        </p>
        <p>
          <strong>Total Downloads:</strong> {book?.download_count || "N/A"}
        </p>
        <p>
          <strong>Language:</strong>{" "}
          {book?.languages[0] === "en"
            ? "English"
            : book?.languages[0] || "N/A"}
        </p>
      </div>
      <div className="button-container">
        {!isInWishlist ? (
          <button
            className="button addToWishlist"
            onClick={addToWishlist}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Add To Wishlist"
            data-tooltip-place="bottom"
          >
            <FaHeart />
          </button>
        ) : (
          <button
            className="button addedToWishlist"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Added To Wishlist"
            data-tooltip-place="bottom"
            disabled
          >
            <FaHeart />
          </button>
        )}
        <Link
          className="button"
          to={`https://www.gutenberg.org/cache/epub/${id}/pg${id}-images.html`}
        >
          Read Online
        </Link>
        <Link
          className="button"
          to={`https://www.gutenberg.org/ebooks/${id}.kf8.images`}
        >
          Download Ebook
        </Link>
      </div>
      <Tooltip id="my-tooltip" />
      <ToastContainer />
    </div>
  );
};

export default ViewBook;
