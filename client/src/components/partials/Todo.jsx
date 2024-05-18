import React, { useState } from "react";
import { MarkTodoApi, deleteTodoApi } from "../../services/api";
import { toast } from "react-toastify";

function Todo({todo,setRefreshList}){

    const [isChecked, setIsChecked] = useState(false);

    // const handleMarkTodo = () => {
    //     setIsChecked(!isChecked); // Toggle the isChecked state
    // };

    const handleDelete =async()=>{
        const result = await deleteTodoApi({
            todo_id:todo._id
        })

        // console.log('delete todo', result)

        if(result.data.status===200){
            setRefreshList(new Date())
            toast('Deleted')
        }else{
            toast('Failed to delete, please try again')
        }
    }

    const handleMarkTodo =async()=>{
        const result = await MarkTodoApi({
            todo_id:todo._id
        },
        setIsChecked(!isChecked))

        // console.log('delete todo', result)

        if(result.data.status===200){
            setRefreshList(new Date())
            toast(result.data.message)
        }else{
            toast('Failed to Mark as completed')
        }
    }

    


    return(
        <div className="col-lg-8 mb-1">
    <div className="alert mt-5 bg-dark opacity-75" style={{color:"white"}}>
        <div className="card-header d-flex  justify-content-between align-items-center">
            <div class="form-check form-check-reverse">
                <input class="form-check-input" type="checkbox" checked={isChecked} onClick={handleDelete} value=""  id="" style={{borderColor: 'black'}}></input>
                <label class="form-check-label" for="reverseCheck1">
                </label>
            </div>
                {todo.desc}
            <div>
                {/* <button type="button" className="btn-close bg-secondary" onClick={handleDelete} aria-label="Close"></button> */}
            </div>
        </div>
    </div>
</div>

    )
}

export default Todo