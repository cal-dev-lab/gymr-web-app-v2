import { useState } from "react";
import Heading from "../../components/common/Heading";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const login = async e => {
        e.preventDefault();

        const { email, password } = data;

        try {
            const data = await axios.post("/login", {
                email,
                password
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                navigate("/");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section>
            <Heading>Login</Heading>

            <p>Email</p>
            <Input value={data.email} onChange={e => setData({...data, email: e.target.value})} />

            <p>Password</p>
            <Input type="password" value={data.password} onChange={e => setData({...data, password: e.target.value})} />

            <Button onClick={login}>Log in</Button>
        </section>
    )
}