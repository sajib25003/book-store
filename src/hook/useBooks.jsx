import { useEffect, useState } from "react";

const useBooks = () => {
    const[books, setBooks] = useState([]);
    useEffect(()=>{
        fetch('https://gutendex.com/books')
        .then(res=>res.json())
        .then(data=>{
            setBooks(data.results);
        })
    },[])
    return {books};
};

export default useBooks;