import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBooks from "../../hook/useBooks";
import Spinner from "../../Components/Spinner";

const ViewBook = () => {
    const {id} = useParams();
    const [book, setBook] = useState();
    const {books, loading} = useBooks();

    useEffect(()=>{
        if(books){
            const selectedBook = books.find(book => book.id === parseInt(id));
            setBook(selectedBook);
        }
    },[books, id]);

    // console.log(book);

    if(loading){
        return <Spinner></Spinner>;
    }
    return (
        <div>

            <h3>{book?.title}</h3>
            
        </div>
    );
};

export default ViewBook;