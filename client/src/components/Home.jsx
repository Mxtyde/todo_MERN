import React, { useEffect, useState } from "react";
import Header from "./partials/Header";
import Todo from "./partials/Todo";
import AddTodo from "./partials/AddTodo";
import { getTodoListApi, getToken } from "../services/api";
import { useNavigate } from "react-router-dom";



function Home(){
    const navigation = useNavigate()

    const [list,setlist]= useState([]);


    const [refreshList, setRefreshList] = useState()

    useEffect(()=>{
        if(!getToken()){
            navigation('/login')
        }

        fetchTodoList()
    },[refreshList,navigation])

    async function fetchTodoList(){
        const result =await getTodoListApi()
        // console.log('todolist',result)
        if(result.status===200 && result.data.status===200){
            setlist(result.data.data.todos)
        }
    }



    return <div>
        <Header/>
        <div className="container">
            <div className="row justify-content-md-center mt-5 mb-5">
                {
                    list.map((todo)=><Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
                }
            </div>
        </div>
        <AddTodo setRefreshList={setRefreshList}/>
    </div>
}

export default Home;