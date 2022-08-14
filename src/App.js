import React,{ useCallback, useEffect, useState}  from 'react';
import './App.css'
import Header from './components/UI/Header';
import UsersForm from './components/UsersForm';
import UsersReviewList from './components/UsersReviewList';

function App() {
  const [reviewValue, setReviewValue] = useState([]);
  const [error, setError] = useState(null);

  const axios = require('axios');
  const url = 'https://react-http-miniproject-default-rtdb.firebaseio.com/userReviewList.json'

  const responseReviewList = useCallback(async () => {
    setError(null);
    try {
      const response = await axios.get(url);
      const data = await response.data;
      const reviewData = [];

      for (const key in data) {
        reviewData.push({
          id: key,
          title: data[key].title,
          author: data[key].author,
          review: data[key].review,
        });
      }
      console.log(reviewData)
      setReviewValue(reviewData);
    } catch (error) {
      const statusCode = error.response.status;
      const statusText = error.response.statusText;
      console.log(` GET ERR >> ${statusCode} / ${statusText}`);
    }

  }, [axios]);

  useEffect(() => {
    responseReviewList();
  }, [responseReviewList]);

  const onAdd = async (title, author, review) => {
    try {
      const response = await axios.post(url, {
        title,
        author,
        review,
      });  

       setReviewValue((prev) => [...prev, {
        id: response.data.name,
        title,
        author,
        review
      }]);

    } catch (error) {
      const errMessage = error.message;
      const errName = error.name;
      console.log(` POST ERR >> ${errMessage} / ${errName}`)
    }

    //  await fetch(
    //   "https://react-http-miniproject-default-rtdb.firebaseio.com/userReviewList.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       title: title,
    //       author: author,
    //       review: review,
    //     }),
    //     headers: {
    //       "Content-type": "application/json; charset=utf-8",
    //     },
    //   }
    // );
    // await responseReviewList(); 
  };

  return (
    <div >
      <header>
        <Header />
      </header>
      <main>
        <UsersForm onAdd={onAdd} />
        {error}
        <UsersReviewList reviewValue={reviewValue}/>
      </main>
    </div>
  );
}

export default App;
