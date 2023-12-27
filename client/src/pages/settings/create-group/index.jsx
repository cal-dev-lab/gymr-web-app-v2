import { supabase } from "../../../supabaseClient";
import { useContext, useEffect, useState } from "react";
import Box from "../../../components/common/Box";
import Button from "../../../components/common/Button";
import Heading from "../../../components/common/Heading";
import Input from "../../../components/common/Input";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import GroupRow from "../../../components/create-group/GroupRow";
import axios from "axios";
import { UserContext } from "../../../../context/userContext";

export default function CreateGroup() {
    const { user } = useContext(UserContext);
    const [data, setData] = useState({
        title: ""
    });

    // This is for fetching and setting groups
    const [groups, setGroups] = useState([]);

    const [disabled, setDisabled] = useState(false);

    // async function fetchGroups() {
    //     try {
    //         const { data: { user } } = await supabase.auth.getUser();

    //         const { data, error } = await supabase
    //             .from("exercise_groups")
    //             .select("*")
    //             .eq("userId", user?.id)

    //         if (error) throw error;

    //         if (data != null) {
    //             return setData(data);
    //         }
    //       } catch (error) {
    //         alert(error.message);
    //         // Toast notification error
    //     }
    // }

    // async function create() {
    //     try {
    //         setDisabled(true);

    //         const { data: { user } } = await supabase.auth.getUser();

    //         const { error } = await supabase
    //             .from("exercise_groups")
    //             .insert({
    //                 title: groupTitle,
    //                 userId: user?.id
    //             })

    //         if (error) throw error;

            

    //         toast.success("Successfully added group!", {
    //             position: "bottom-center"
    //         })
            
    //         window.location.reload();
    //       } catch (error) {
    //         alert(error.message);
    //         // Toast notification error
    //     }
    // }

    if (!user) {
        return <Loader />
    }

    const createGroup = async e => {
        e.preventDefault();

        const { title, userId } = data;

        try {
            const { data } = await axios.post('/groups/create-group', {
                title: title,
                userId: user?.id
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                toast.success("Successfully created group!");
                window.location.reload();
            }
            
            console.log('Posted successfully')
        } catch (error) {
            console.log(error);
        }
    }

    const fetchGroups = async () => {
        try {
            console.log('before get')
            const groups = await axios.get(`/groups/fetch-groups/${user?.id}`)
            setData(groups);
            console.log(groups.data)
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     fetchGroups();
    // }, []);

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
                    <Button onClick={fetchGroups}>Fetch groups</Button>
                    <Heading>
                        <b>Group title</b> {/* Maybe a tooltip icon with desc. */}
                    </Heading> 
                    <Input
                        onChange={e => setData({...data, title: e.target.value})}
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
                            <GroupRow group={group} key={group.id} />                            
                        ))
                    ) : (
                        <p>No exisiting groups...</p>
                    )
                }
            </Box>
        </>
    )
}