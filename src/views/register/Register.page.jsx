import {useState, useContext} from "react";
import axios from "axios";


import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/auth/Auth.context";
import {API_BASE_URL} from "../../constants";

import "./Register.styles.css"

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {loginUserAsync} = useContext(AuthContext)
    const navigate = useNavigate()

    const userNameChangeHandler = (e) => setUsername(e.target.value)
    const emailChangeHandler = (e) => setEmail(e.target.value)
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    const confirmPasswordChangeHandler = (e) => {
        setConfirmPassword(e.target.value)
    }

    const signupSubmitHandler = async () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match!")
        } else {

            try {
                const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
                    username,
                    email,
                    password: confirmPassword,
                })
                if(response.statusText === "OK") {
                    loginUserAsync(email, password)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setUsername("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
            }
        }

    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <img src={PF + "purple_radish.png"} alt="" className="radish-logo-login"/>
                    <h3 className="loginLogo-name">Radish Garden</h3>
                    <span className="loginDesc">
                        Connect with plants and make friends.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="register-box">
                        <input placeholder="Username" className="loginInput" value={username}
                               onChange={userNameChangeHandler} required/>
                        <input placeholder="Email" className="loginInput" value={email} onChange={emailChangeHandler}
                               required/>
                        <input placeholder="Password" className="loginInput" value={password}
                               type="password"
                               onChange={passwordChangeHandler} required/>
                        <input placeholder="Confirm password" className="loginInput" value={confirmPassword}
                               type="password"
                               onChange={confirmPasswordChangeHandler} required/>
                        <button className="loginButton" type="submit" onClick={signupSubmitHandler}>Sign Up</button>
                        <button className="loginRegisterButton" onClick={() => navigate("/login")}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;