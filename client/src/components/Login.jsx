import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { SERVER_URI } from '../config/keys';
import Swal from 'sweetalert2';
//  import { Header } from "./Header";

const backendServer = `${SERVER_URI}/login`

function Login() {

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/GetAllBooksList")
    }
  }, [])


  const [email, setEamil] = useState("")
  const [password, setPassword] = useState("")

  const correctRequestBody = { email, password }
  console.log(correctRequestBody);

  function signUp() {
    axios.post(backendServer, correctRequestBody)
      .then((response) => {
        console.log("response", response)
        //alert(`Success : ${response.data.message}`)
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

          localStorage.setItem("loggedInUserId", `${response.data.data.userId}`)
          localStorage.setItem("token", `${response.data.data.token}`)
          localStorage.setItem("userEmail", email);
          window.location.reload()
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

  }

  return (
    <>
      {/* <Header /> */}
      <div className="col-sm-6 offset-sm-3">
        <h1> Login Page</h1>
        <br />
        <input type="text" value={email} onChange={(e) => setEamil(e.target.value)} className="form-control" placeholder="email" />
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="password" />
        <br />
        <button onClick={signUp} className="btn btn-primary">Login</button>
      </div>
    </>
  )
}

export default Login;