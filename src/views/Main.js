import React, { useEffect, useState } from "react";
import axios from "axios";
import{Link} from "react-router-dom";

const Main = (props)=>{
    const [authors,setAuthors] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/authors/findAll")
            .then(res=>{
                console.log(res);
                setAuthors(res.data);
            })
            .catch(err=>{console.log(err.response)
            })
    },[])

    const onDeleteHandler = (_id, arrIndex) => {
        if(window.confirm("Are you sure?")){
        axios.delete(`http://localhost:8000/api/authors/${_id}`)
            .then(res=>{
                console.log(res);
// the prior lines delete the item, but it exists on our page until refresh;
//the following lines delete it from the displayed list as well, w/out refresh
                const copyState = [...authors];
                copyState.splice(arrIndex, 1);
                setAuthors(copyState);
            })
            .catch(err=>{console.log(err.response)
            })}
    }

    return(
        <div className="w-75 mx-auto">
            <Link to="/authors/create">Create a new author record</Link>
            <h1>The authors you know and love:</h1>
            <table className="table table-dark table-striped table-hover" >
                <thead>
                    <tr>
                        <th>Author Name</th>
                        <th>Information</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    authors.map((item,i)=>{
                        return <tr key={i}> 
                        <td>{item.name}</td>
                        <td>{item.information}</td>
                        <td><Link to={`/authors/${item._id}/update`}><button type="button" className = "btn btn-danger btn-sm">edit</button></Link> | <button onClick={()=>onDeleteHandler(item._id,i)} className = "btn btn-danger btn-sm">delete</button> </td>
                    </tr>
                    })
                    }
                </tbody>
            </table>
            <ul>
                
            </ul>
        </div>
    )
}

export default Main;