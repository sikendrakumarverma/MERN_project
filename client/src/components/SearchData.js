import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URI } from '../config/keys';

function SearchBooksData() {

    let location = useLocation();
    let bookData = location.state;

    let [data, setData] = useState([]);

    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        }
        getBooksData()

    }, [bookData])



    function getBooksData() {
        axios.get(`${SERVER_URI}/books?title=${bookData}`, {
            headers: {
                "x-api-key": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setData(response.data.data)
                alert(`success : ${response.data.message}`)
            })
            .catch((error) => {
                console.log("error :", error.response.data.message)
                alert(`Error: ${error.response.data.message}`)
            })

    }


    function deleteOperation(id) {

        navigate("/delete/" + id);
    }

    function UpdateData(item) {

        navigate("/update/" + item._id, { state: item });
    }

    return (
        <div >
            <h1> Search Books List</h1>
            <div className="col-sm-10 offset-sm-1">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>BooksId</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>ReleasedAt</th>
                            <th>Operation</th>
                            <th>Make Changes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) =>
                            <tr>
                                <td>{item._id}</td>
                                <td>{item.title}</td>
                                <td><img style={{ width: 100 }} src={item.bookCover} /></td>
                                <td>{item.description}</td>
                                <td>{item.releasedAt}</td>
                                <td><span onClick={() => { deleteOperation(item._id) }} className="delete">Delete</span></td>
                                <td><span onClick={() => { UpdateData(item) }} className="update">Update</span></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default SearchBooksData;