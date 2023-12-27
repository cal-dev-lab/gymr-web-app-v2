import Heading from "./Heading";
import Dropdown from './Dropdown';
import Box from "./Box";

export default function Navbar({ user }) {
    const options = [
        {
            id: 1,
            element: <button className="text-white" onClick={() => {}}>Sign out</button>
        }
    ]

    return (
        <Box>
            <div className="flex justify-between items-center h-full">
                <div>
                    <Heading>
                        Hello,
                    </Heading>
                    <p className="text-black text-sm font-semibold">{user?.email ?? ""}</p>
                </div>

                <Dropdown options={options} />
            </div>
        </Box>
    )
}