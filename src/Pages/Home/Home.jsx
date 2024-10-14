import useBooks from "../../hook/useBooks";

const Home = () => {
  const { books } = useBooks();
  console.log(books);

  return (
    <div className="book-container">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="image-container">
            <img
              src={book.formats["image/jpeg"]}
              alt={`Cover of ${book.title}`}
              className="book-cover"
            />
          </div>
          <p>
            <strong>ID:</strong> {book.id}
          </p>
          <h3>{book.title}</h3>
          <p>
            <strong>Author:</strong>{" "}
            {book.authors.length > 0 ? book.authors[0].name : "Unknown"}
          </p>
          <p>
            <strong>Genres:</strong> {book.subjects.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
