import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from "react";
import { SERVER_URI } from '../config/keys';
import axios from 'axios';

function DeleteReview() {
  let location = useLocation();
  let reviewId = location.state._id;
  let bookId = location.state.bookId;


  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }
    alert(`Are sure want to delete this id : ${reviewId}`)
  }, [])

  axios.delete(`${SERVER_URI}/books/${bookId}/review/${reviewId}`)
    .then((response) => {
      console.log("response", response)
      alert(`success : ${response.data.message}`)
      navigate("/GetAllReviewsList")
    })
    .catch((error) => {
      console.log("error :", error.response.data.message)
      alert(`Error: ${error.response.data.message}`)
    })

}

export default DeleteReview;