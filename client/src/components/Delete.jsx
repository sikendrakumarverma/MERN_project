import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react";
import axios from 'axios';
import { SERVER_URI } from '../config/keys';
import Swal from 'sweetalert2';

function Delete() {
  let params = useParams();
  let id = params.id
  //console.log(id)


  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }
    //alert(`Are sure want to delete this id : ${id}`)
  }, [])
  Swal.fire({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`${SERVER_URI}/books/` + id, {
          headers: {
            "x-api-key": localStorage.getItem("token")
          }
        })
          .then((response) => {
            console.log("response", response)
            //alert(`success : ${response.data.message}`)
            Swal.fire("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            }).then(() => {
              navigate("/GetAllBooksList")
            })
          })
          .catch((error) => {
            console.log("error :", error.response.data.message)
            //alert(`Error: ${error.response.data.message}`)
            Swal.fire(error.response.data.message, {
              icon: "error",
            }).then(() => {
              navigate("/GetAllBooksList")
            })
          })
      } else {
        Swal.fire("Your imaginary file is safe!");
      }
    });

  // axios.delete("http://localhost:8080/books/" + id, {
  //   headers: {
  //     "x-api-key": localStorage.getItem("token")
  //   }
  // })
  //   .then((response) => {
  //     console.log("response", response)
  //     alert(`success : ${response.data.message}`)
  //     navigate("/GetAllBooksList")
  //   })
  //   .catch((error) => {
  //     console.log("error :", error.response.data.message)
  //     alert(`Error: ${error.response.data.message}`)
  //   })

}

export default Delete;