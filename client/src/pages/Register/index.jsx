import Heading from "../../components/common/Heading";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const register = async e => {
        e.preventDefault();

        const { name, email, password } = data;

        try {
            const { data } = await axios.post('/register', {
                name, email, password
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                toast.success("Successfully signed up!");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <Heading>Register</Heading>


            <p>Name</p>
            <Input value={data.name} onChange={e => setData({...data, name: e.target.value})} />

            <p>Email</p>
            <Input value={data.email} onChange={e => setData({...data, email: e.target.value})} />

            <p>Password</p>
            <Input type="password" value={data.password} onChange={e => setData({...data, password: e.target.value})} />


            <Button onClick={register}>Sign up</Button>
        </section>
    )
}