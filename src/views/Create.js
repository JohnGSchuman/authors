import React, {useState} from "react";
import axios from "axios";
import {useHistory, Link} from "react-router-dom";

const Create = (props)=>{
    const [form,setForm] = useState({
        name: "",
        information: ""
    })
    const[error,setError] = useState({});
    const history= useHistory();

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log("submitted");
        axios.post("http://localhost:8000/api/authors/create", form)
            .then(res=>{
                console.log(res);
                history.push("/");
            })
            .catch(err=>{
                console.log(err.response.data.err.errors);
                setError(err.response.data.err.errors);
            })

    }

    return(
        <div className = "w-75 mx-auto p-5" style={{backgroundColor: "lightBlue"}}>
            <h1> Add a new job:</h1>
                <form className="w-75 mx-auto" onSubmit={onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input onChange={onChangeHandler} type="text" name="name" className="form-control"/>
                        <span className="alert-danger">{error.name && error.name.message}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="information">information</label>
                        <input onChange={onChangeHandler} type="text" name="information" className="form-control"/>
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

export default Create;