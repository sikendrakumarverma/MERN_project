import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { SERVER_URI } from '../config/keys';
import Swal from 'sweetalert2';

function Update() {
  let location = useLocation();
  let bookId = location.state._id;
  let bookData = location.state;

  let [data, setData] = useState([]);
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [reviews, setReviews] = useState("");
  const [releasedAt, setReleasedAt] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }

    setData(bookData);

  }, [])

  function EditBookData(id) {

    //alert(`Are you sure want to update this: ${id} ,Book`)
    Swal.fire({
      title: `Are you sure want to update this: ${id} ,Book`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(() => {

      let formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('excerpt', excerpt);
      formData.append('reviews', reviews);
      formData.append('releasedAt', releasedAt);
      formData.append('category', category);
      console.log(formData)

      axios.put(`${SERVER_URI}/books/` + bookId, formData, {
        headers: {
          "x-api-key": localStorage.getItem("token")
        }
      })
        .then((response) => {
          console.log("response", response)
          //alert(`success : ${response.data.message}`)
          Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            timer: 2500
          }).then(() => {
            navigate("/GetAllBooksList");
          })

        })
        .catch((error) => {
          console.log("error", error.response.data.message)
          // alert(`Error: ${error.response.data.message}`)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            text: error.response.data.message
          })
        })
    })
  }

  return (
    <div>
      <h1> Update Page</h1>
      <input type="text" onChange={(e) => setTitle(e.target.value)} defaultValue={data.title} /> <br /> <br />
      <input type="text" onChange={(e) => setExcerpt(e.target.value)} defaultValue={data.excerpt} /> <br /> <br />
      <input type="text" onChange={(e) => setCategory(e.target.value)} defaultValue={data.category} /> <br /> <br />
      <input type="text" onChange={(e) => setReleasedAt(e.target.value)} defaultValue={data.releasedAt} /> <br /> <br />
      <input type="text" onChange={(e) => setReviews(e.target.value)} defaultValue={data.reviews} /> <br /> <br />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} /> <br /> <br />
      <img style={{ width: 100 }} src={data.bookCover} /> <br /> <br />
      <Button onClick={() => { EditBookData(data._id) }} variant="outline-success">Update</Button>


    </div>
  )
}

export default (Update);