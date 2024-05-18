import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header";

function Register() {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState(null);

    const navigation = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem('user');
        if (user){
            return navigation('/')
        }
    },[navigation])

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // try {
        //     const result = await register(form);
        //     if (result.status === 200) {
        //         if (result.data.status === 201) {
        //             setErrors(result.data.data);
        //             toast(result.data.message);
        //         } else {
        //             toast.error(result.data.message);
        //         }
        //     } else {
        //         toast.error('Something went wrong');
        //     }
        // } catch (error) {
        //     toast.error('Something went wrong');
        // }

        const result  = await register(form);
        if(result.data.status){
            if(result.data.status===201){
               setErrors(result.data.data);
               toast(result.data.message)
               return;
            }if(result.data.status===200){
                localStorage.setItem('user',JSON.stringify(result.data.data))
                navigation('/')
                return; 
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
                <div className="col-lg-6">
                    <div className="card border-dark mt-5 opacity-75" style={{ maxWidth: "60rem" }}>
                        <div className="card-header bg-secondary" style={{color:"white"}}>Enter User Details</div>
                        <div className="card-body bg-dark">
                            <h2 className="visually-hidden">Registration Form</h2>
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">{errors?.name && <div className="text-danger">{errors.name.msg}</div>}</span>
                                <input
                                    type="text"
                                    name='name'
                                    onChange={handleInputChange}
                                    className="form-control bg-light"
                                    placeholder="Enter Your Name"
                                    aria-label="Name"
                                    aria-describedby="addon-wrapping"
                                />
                            </div>
                            {/* {errors?.name && <div className="text-dark">{errors.name.msg}</div>} */}
                            <div className="input-group flex-nowrap mt-3">
                                <span className="input-group-text" id="addon-wrapping">{errors?.username && <div className="text-danger">{errors.username.msg}</div>}</span>
                                <input
                                    type="text"
                                    name='username'
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Enter your Username"
                                    aria-label="Username"
                                    aria-describedby="addon-wrapping"
                                />
                            </div>
                            {/* {errors?.username && <div className="text-danger">{errors.username.msg}</div>} */}
                            <div className="input-group flex-nowrap mt-3">
                                <span className="input-group-text" id="addon-wrapping">{errors?.email && <div className="text-danger">{errors.email.msg}</div>}</span>
                                <input
                                    type="email"
                                    name='email'
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder=" Enter Your Email"
                                    aria-label="Email"
                                    aria-describedby="addon-wrapping"
                                />
                            </div>
                            {/* {errors?.email && <div className="text-danger">{errors.email.msg}</div>} */}
                            <div className="input-group flex-nowrap mt-3">
                                <span className="input-group-text" id="addon-wrapping">{errors?.password && <div className="text-danger">{errors.password.msg}</div>}</span>
                                <input
                                    type="password"
                                    name='password'
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="addon-wrapping"
                                />
                            </div>
                            {/* {errors?.password && <div className="text-danger">{errors.password.msg}</div>} */}
                            <div className="d-grid gap-2 mt-5">
                                <button className="btn btn-secondary" onClick={handleSubmit} type="button">Sign Up</button>
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

export default Register;
