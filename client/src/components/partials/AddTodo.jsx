import React, { useState } from "react";
import { toast } from "react-toastify";
import { createTodoApi } from "../../services/api";

function AddTodo({setRefreshList}){

    const [todoDesc ,setTodoDesc] = useState('')

    const handelTodoSubmit =async()=>{
        console.log(todoDesc,'todoDesc')
        if(todoDesc===''){
            toast('Todo is required')
            return
        }

        const result= await createTodoApi({desc:todoDesc});
        console.log(result)
        if(result.status===200 && result.data.status===200){
            toast('Todo Added successfully')
            setRefreshList(new Date())
            setTodoDesc('')
        }else{
            toast(result.data.message);
        }
    }

    return(
        <div className="container mb-3 fixed-bottom" style={{marginRight:""}}>
            {/* <ToastContainer/> */}
        <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-8">
    <textarea 
        className="form-control bg-dark text-light border-secondary" 
        placeholder="Enter Your Todo" 
        style={{ color: 'white', padding: '10px', opacity: 1 }} 
        onChange={(e) => setTodoDesc(e.target.value)} 
        rows="1">
    </textarea>
</div>

            <div className="col-lg-4 col-md-5 col-sm-12 mt-2 mt-md-0">
                <button className="btn btn-dark w-100" style={{ color: 'white', padding: '10px' }} onClick={handelTodoSubmit}>Add Todo</button>
            </div>
        </div>
    </div>
    )
}

export default AddTodo;