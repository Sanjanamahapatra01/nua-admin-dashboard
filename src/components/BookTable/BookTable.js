import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./BookTable.css"

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://openlibrary.org/subjects/painting.json?limit=${recordsPerPage}&offset=${(page - 1) * recordsPerPage}`);
        const works = response.data.works;

        const bookDetails = await Promise.all(works.map(async (work) => {
          const authorDetails = await Promise.all(work.authors.map(async (author) => {
            const authorResponse = await axios.get(`https://openlibrary.org${author.key}.json`);
            return {
              name: author.name,
              birth_date: authorResponse.data.birth_date,
              top_work: authorResponse.data.top_work,
            };
          }));

          // Attempt to fetch ratings
          let ratingsAverage = 'N/A';
          try {
            const ratingsResponse = await axios.get(`https://openlibrary.org${work.key}/ratings.json`);
            ratingsAverage = ratingsResponse.data.average_rating || 'N/A';
          } catch (ratingsError) {
            console.error('Error fetching ratings:', ratingsError);
          }

          return {
            title: work.title,
            first_publish_year: work.first_publish_year,
            subject: response.data.name,
            ratings_average: ratingsAverage,
            authors: authorDetails,
          };
        }));

        setBooks(bookDetails);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, recordsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRecordsPerPageChange = (event) => {
    setRecordsPerPage(Number(event.target.value));
    setPage(1); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className='label'>
        <label className='label-class'>
          Records per page:
          <select className="page-number" value={recordsPerPage} onChange={handleRecordsPerPageChange}>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author Name</th>
            <th>First Publish Year</th>
            <th>Subject</th>
            <th>Ratings Average</th>
            <th>Author Birth Date</th>
            <th>Author Top Work</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.authors.map((author) => author.name).join(', ')}</td>
              <td>{book.first_publish_year}</td>
              <td>{book.subject}</td>
              <td>{book.ratings_average}</td>
              <td>{book.authors.map((author) => author.birth_date || 'N/A').join(', ')}</td>
              <td>{book.authors.map((author) => author.top_work || 'N/A').join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination-class'>
        <button className='pagination' disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
          {"<"}
        </button>&nbsp;
        <span>{page}</span>&nbsp;
        <button className='pagination' onClick={() => handlePageChange(page + 1)}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default BookTable;
