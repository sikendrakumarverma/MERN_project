import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate} from "react-router-dom";
import { SERVER_URI } from '../config/keys';

import Swal from "sweetalert2";

function GetAllBooksList() {

    let [data, setData] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        }
        getBooksData();

    }, [])

    async function getBooksData() {
        await axios.get(`${SERVER_URI}/books`, {
            headers: {
                "x-api-key": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setData(response.data.data)
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
                })
            })
            .catch((error) => {
                console.log("error :", error.response.data.message)
                alert(`Error: ${error.response.data.message}`)
            })
        
    }

    function deleteOperation(id) {

        navigate("/delete/"+id);
    }

    function UpdateData(item) {
        
        navigate("/update/"+item._id,{state: item} );
    }

    function Review(id) {
        
        navigate("/createReview/"+id );

    }


    return (
        <div >
            <h1> All Books List</h1>
            <div className="col-sm-10 offset-sm-1">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>BooksId</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>ReleasedAt</th>
                            <th>Review</th>
                            <th>Operation</th>
                            <th>Make Changes</th>
                            <th>Give Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) =>
                            <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.title}</td>
                                <td><img style={{ width: 100 }} src={item.bookCover} /></td>
                                <td>{item.category}</td>
                                <td>{item.releasedAt}</td>
                                <td>{item.reviews}</td>
                                <td><span onClick={() => { deleteOperation(item._id) }} className="delete">Delete</span></td>
                                <td><span onClick={() => { UpdateData(item) }} className="update">Update</span></td>
                                <td><span onClick={() => { Review(item._id) }} className="Give_Review">Review</span></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default GetAllBooksList;