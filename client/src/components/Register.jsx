import React, { useState, useEffect } from 'react'
import axios from 'axios';
 import { useNavigate } from 'react-router-dom'
 import { SERVER_URI } from '../config/keys';
 import Swal from 'sweetalert2';

// import {Header} from './Header'

const backendServer = `${SERVER_URI}/register`

function Register() {
    let navigate = useNavigate();

   useEffect(() => {
    if (localStorage.getItem('token')) {
         navigate("/CreateBook")
    }
}, [])

    const inputData = {
        "title": "",
        "name": "",
        "phone": "",
        "password": "",
        "email": "",
        "street": "",
        "city": "",
        "pincode": ""
    }
    const [state, setState] = useState(inputData)

    const setinput = (e) => {
        let { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const correctRequestBody = {
        "title": state.title,
        "name": state.name,
        "phone": state.phone,
        "password": state.password,
        "email": state.email,
        "address": {
            "street": state.street,
            "city": state.city,
            "pincode": state.pincode
        }
    }

    function signUp() {
        axios.post(backendServer, correctRequestBody)
            .then((response) => {
                console.log("response", response)
                //alert(`success : ${response.data.message}`)
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                    // timer: 2500
                }).then(() => {
                    navigate("/login");
                })
                
            })
            .catch((error) => {
                console.log("error", error.response.data.message)
                //alert(`Error: ${error.response.data.message}`)
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
                <h1>Register Page</h1>
                <input type="text" name='title' value={state.title} onChange={(e) => setinput(e)} className="form-control" placeholder="title" />
                <br />
                <input type="text" name='name' value={state.name} onChange={(e) => setinput(e)} className="form-control" placeholder="name" />
                <br />
                <input type="text" name='phone' value={state.phone} onChange={(e) => setinput(e)} className="form-control" placeholder="phone" />
                <br />
                <input type="text" name='email' value={state.email} onChange={(e) => setinput(e)} className="form-control" placeholder="email" />
                <br />
                <input type="password" name='password' value={state.password} onChange={(e) => setinput(e)} className="form-control" placeholder="password" />
                <br />
                <input type="text" name='street' value={state.street} onChange={(e) => setinput(e)} className="form-control" placeholder="street" />
                <br />
                <input type="text" name='city' value={state.city} onChange={(e) => setinput(e)} className="form-control" placeholder="city" />
                <br />
                <input type="text" name='pincode' value={state.pincode} onChange={(e) => setinput(e)} className="form-control" placeholder="pincode" />
                <br />
                <button onClick={signUp} className="btn btn-primary">Sign Up</button>

            </div>
        </>
    )
}

export default Register