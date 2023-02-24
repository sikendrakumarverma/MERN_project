import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { SERVER_URI } from '../config/keys';
import axios from 'axios';

function UpdateReviewsData() {
  let location = useLocation();
  let reviewId = location.state._id;
  let bookId = location.state.bookId;
  let reviewData = location.state;

  let [data, setData] = useState([]);
  const [reviewedBy, setReviewedBy] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }

    setData(reviewData);

  }, [])

  function EditReviewData(id) {

    alert(`Are you sure want to update this: ${id} ,Review`)

    let formData = new FormData();
    formData.append('reviewedBy', reviewedBy);
    formData.append('review', review);
    formData.append('rating', rating);

    axios.put(`${SERVER_URI}/books/${bookId}/review/${reviewId}`, formData )
      .then((response) => {
        console.log("response", response)
        alert(`success : ${response.data.message}`)
        navigate("/GetAllReviewsList");
      })
      .catch((error) => {
        console.log("error :", error.response.data.message)
        alert(`Error: ${error.response.data.message}`)
      })
  }

  return (
    <div>
      <h1> Update Review Page</h1>
      <input type="text" onChange={(e) => setReviewedBy(e.target.value)} defaultValue={data.reviewedBy} /> <br /> <br />
      <input type="text" onChange={(e) => setRating(e.target.value)} defaultValue={data.rating} /> <br /> <br />
      <input type="text" onChange={(e) => setReview(e.target.value)} defaultValue={data.review} /> <br /> <br />
      <Button onClick={() => { EditReviewData(data._id) }} variant="outline-success">Update</Button>


    </div>
  )
}

export default (UpdateReviewsData);