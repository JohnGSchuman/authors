import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";

const Update = (props)=>{
    const [author, setAuthor] = useState({
        name: "",
        information: ""});
    const [error,setError] = useState({});
    const history= useHistory();
    const {_id} = useParams();

    useEffect(()=> {
        axios.get("http://localhost:8000/api/authors/" + _id)
            .then(res=>{
                console.log(res);
                setAuthor(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
    },[_id])

    const onChangeHandler = (event) => {
        setAuthor({
            ...author,
            [event.target.name]: event.target.value
        })
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log("submitted");
        axios.patch(`http://localhost:8000/api/authors/${_id}/update`,author)
            .then(res=>{
                console.log(res);
                history.push("/");
            })
            .catch(err=>{
                console.log(err.response.data.err.errors);
                setError(err.response.data.err.errors);
            })
    }

    console.log(author)
    return(
        <div className = "w-75 mx-auto p-5" style={{backgroundColor: "lightBlue"}}>
            <h1> Update author:</h1>
            <h5> Author ID: {_id}</h5>
                <form className="w-75 mx-auto" onSubmit={onSubmitHandler}>
                    <div className="form-group">
                        <label>Item Name</label>
                        <input onChange={onChangeHandler} type="text" value={author.name} name="name" className="form-control"/>
                        <span className="alert-danger">{error.name && error.name.message}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="information">Description</label>
                        <input onChange={onChangeHandler} type="text" value={author.information} name="information" className="form-control"/>
                        <span className="alert-danger">{error.information && error.information.message}</span>
                    </div>
                    <div className = "d-flex flex-row align-items-center" >
                        <input type="submit" className="btn btn-success btn-lg d-block mx-auto my-3"/>
                        <Link className="btn btn-success btn-lg d-block mx-auto my-3" to={'/'}>Back</Link>
                    </div>
                </form>
        </div>
    )
}
export default Update;