import { Link } from "react-router-dom";
import useBooks from "../../hook/useBooks";
import '../../index.css';
import Spinner from "../../Components/Spinner";

const Home = () => {
  const { books, loading } = useBooks();

  if (loading) {
    return <Spinner></Spinner>;
  }
  // console.log(books);

  return (
    <div className="book-container" id="homePage">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="image-container">
            <img
              src={book.formats["image/jpeg"]}
              alt={`Cover of ${book.title}`}
              className="book-cover"
            />
          </div>
          <div className="card-body">
          <p>
            <strong>ID:</strong> {book.id}
          </p>
          <h3>{book.title}</h3>
          <p>
            <strong>Author:</strong>{" "}
            {book.authors.length > 0 ? book.authors[0].name : "Unknown"} {' ( '}{book.authors[0]?.birth_year}{' - '}{book.authors[0]?.death_year}{')'}
          </p>
          <p className="genre">
            <strong>Genres:</strong> {book.subjects.join(", ")}
          </p>
          </div>

          <div className="button-container">
            <Link to={`/viewBook/${book.id}`} className="button">View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
