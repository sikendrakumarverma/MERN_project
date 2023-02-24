import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate} from "react-router-dom";
import { SERVER_URI } from '../config/keys';


function GetAllReviews() {

    let [data, setData] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        }
        GetReviewsData();

    }, [])

    async function GetReviewsData() {
        await axios.get(`${SERVER_URI}/GetAllReviews`, {
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

    function deleteOperation(item) {

        navigate("/DeleteReviews/"+ item._id,{state: item});
    }

    function UpdateData(item) {
        
        navigate("/UpdateReviews/"+ item._id,{state: item} );

    }


    return (
        <div >
            <h1> All Reviews List</h1>
            <div className="col-sm-10 offset-sm-1">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ReviewId</th>
                            <th>BookId</th>
                            <th>ReviewedBy</th>
                            <th>ReviewedAt</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Operation</th>
                            <th>Make Changes</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) =>
                            <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.bookId}</td>
                                <td>{item.reviewedBy}</td>
                                <td>{item.reviewedAt}</td>
                                <td>{item.rating}</td>
                                <td>{item.review}</td>
                                <td><span onClick={() => { deleteOperation(item) }} className="delete">Delete</span></td>
                                <td><span onClick={() => { UpdateData(item) }} className="update">Update</span></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default GetAllReviews;