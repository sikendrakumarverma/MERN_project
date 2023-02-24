// import { Header } from "./Header";
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom'
import { useState,useEffect } from "react";
import { SERVER_URI } from '../config/keys';


function CreateReview() {
  let params = useParams();
  let bookId = params.id
  console.log(bookId)

  let navigate = useNavigate();

  useEffect(() => {
   if (!localStorage.getItem('token')) {
        navigate("/login")
   }
},[])

  const [reviewedBy, setTitle] = useState("");
  const [rating, setExcerpt] = useState("");
  const [review, setCategory] = useState("");

  let CreateReviewUrl= `${SERVER_URI}/books/${bookId}/review`

  function signUp() {

    let formData = new FormData();    
    formData.append('reviewedBy', reviewedBy);
    formData.append('rating', rating);  
    formData.append('review', review);  

    axios.post(CreateReviewUrl, formData )
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

    <>
      {/* <Header /> */}
      <h1> Create Review</h1>
      <div className="col-sm-6 offset-sm-3">
        <input type="text" value={reviewedBy} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="reviewedBy" />
        <br />
        <input type="text" value={rating} onChange={(e) => setExcerpt(e.target.value)} className="form-control" placeholder="rating" />
        <br />
        <input type="text" value={review} onChange={(e) => setCategory(e.target.value)} className="form-control" placeholder="review" />
        <br />
        <button onClick={signUp} className="btn btn-primary">Create Review</button>

      </div>
    </>
  )
}

export default CreateReview;