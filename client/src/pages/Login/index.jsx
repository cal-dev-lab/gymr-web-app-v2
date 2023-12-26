import { useState } from "react";
import Heading from "../../components/common/Heading";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = e => {
        e.preventDefault();

        axios.get('/')
    }

    return (
        <section>
            <Heading>Login</Heading>

            <p>Email</p>
            <Input value={email} onChange={e => setEmail(e.target.value)} />

            <p>Password</p>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />

            <Button onClick={login}>Log in</Button>
        </section>
    )
}