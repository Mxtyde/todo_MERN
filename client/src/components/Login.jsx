import React, { useEffect, useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./partials/Header";

function Login() {
    // const { user, setUser } = props;
    const navigation = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user){
            return; // User not logged in, continue rendering the login page
        }
        navigation('/'); // User is logged in, redirect to home page
    }, [navigation]);
    

    const [errors, setErrors] = useState(null);

    const handelChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // try {
        //     const result = await login(form);
        //     console.log('form', result);
        //     setErrors(null);

        //     if (result.status) {
        //         if (result.data.status === 200) {
        //             localStorage.setItem('user', JSON.stringify(result.data.data));
        //             navigation("/");
        //         } else if (result.data.status === 201) {
        //             toast(result.data.message);
        //             setErrors(result.data.data);
        //         } else if (result.data.status === 202) {
        //             toast(result.data.message);
        //         }
        //     }
        // } catch (error) {
        //     console.error("Error during login:", error);
        //     // Handle errors, maybe display a generic error message
        // }

        const result  = await login(form);
        if(result.data.status){
            if(result.data.status===201){
               setErrors(result.data.data);
               toast(result.data.message)
               return; 
            } if (result.data.status === 200) {
                localStorage.setItem('user', JSON.stringify(result.data.data));
                navigation("/");
                return
            }if(result.data.status===202){
                setErrors(result.data.data);
                toast(result.data.message)
                return
            }
        }else{
            toast('something went wrong, please try again')
        }
    };

    return (
        <>
        <Header/>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-6 ">
                    <div className="card border-secondary mt-5 opacity-75" style={{ maxWidth: "60rem" }}>
                        <div className="card-header bg-secondary">Enter Login Details</div>
                        <div className="card-body bg-dark">
                            <h2 className="visually-hidden">Login Form</h2>
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping"> {errors?.username && <small id="emailHelp" className="form-text text-danger">{errors.username.msg}</small>}</span>
                                <input
                                    type="text"
                                    onChange={handelChange}
                                    name='username'
                                    className="form-control"
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="addon-wrapping"
                                />
                                {errors?.username && <small id="emailHelp" className="form-text text-danger">{errors.username.msg}</small>}
                            </div>
                            <div className="input-group flex-nowrap mt-5">
                                <span className="input-group-text" id="addon-wrapping">{errors?.password && <div className="text-danger">{errors.password.msg}</div>}</span>
                                <input
                                    type="password"
                                    onChange={handelChange}
                                    name='password'
                                    className="form-control"
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="addon-wrapping"
                                />
                                {/* {errors?.password && <small id="emailHelp" className="form-text text-muted">{errors.password.msg}</small>} */}
                                {errors?.password && <div className="text-danger">{errors.password.msg}</div>}
                            </div>
                            <div className="d-grid gap-2 mt-5">
                                <button className="btn btn-secondary" onClick={handleSubmit} type="button">Log In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
        </>
    );
}

export default Login;
