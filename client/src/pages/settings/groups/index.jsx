import { useContext, useEffect, useState } from "react";
import Box from "../../../components/common/Box";
import Button from "../../../components/common/Button";
import Heading from "../../../components/common/Heading";
import Input from "../../../components/common/Input";
import Loader from "../../../components/common/Loader";
import GroupRow from "../../../components/groups/GroupRow";
import axios from "axios";
import { UserContext } from "../../../../context/userContext";
import useSWR from "swr";
import { useSWRConfig } from "swr"
import toast from "react-hot-toast";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function GroupSettings() {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { data } = useSWR(user ? `http://localhost:8000/group/${user?.id}` : null, fetcher);
    const { mutate } = useSWRConfig();

    if (!data) {
        return <Loader />;
    }

    const createGroup = async () => {
        try {
            const { data } = await axios.post('/group', {
                title: title,
                userId: user?.id
            });

            if (data.error) {
                return toast.error(data.error);
            }

            setTitle("");
            toast.success("Successfully created group!");
            mutate(`http://localhost:8000/group/${user?.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Box>
                <Heading size="xl">
                    <b>Create group</b>
                </Heading>
                <p className="text-sm">Groups are used to group exercises together. For example, you may use: <i>Chest & Triceps</i></p>
            </Box>

            <Box classnames="space-y-4">
                <div>
                    <Heading>
                        <b>Group title</b> {/* Maybe a tooltip icon with desc. */}
                    </Heading> 
                    <Input
                        value={title ?? ""}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="E.g. Chest & Triceps"
                        required
                    />
                </div>

                <div className="flex w-full justify-end">
                    <Button onClick={createGroup} disabled={data?.title == "" ? true : disabled}>Create group</Button>
                </div>
            </Box>

            <Box classnames="space-y-2">
                <Heading>
                    <b>Exisiting groups</b>
                </Heading> 
                {
                    data?.length > 0 ? (
                        data.map(group => (
                            <GroupRow group={group} key={group._id} />
                        ))
                    ) : (
                        <p>No exisiting groups...</p>
                    )
                }
            </Box>
        </>
    )
}