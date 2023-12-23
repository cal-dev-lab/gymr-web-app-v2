import { supabase } from "../../../supabaseClient";
import { useEffect, useState } from "react";
import Box from "../../../components/common/Box";
import Button from "../../../components/common/Button";
import Heading from "../../../components/common/Heading";
import Input from "../../../components/common/Input";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import GroupRow from "../../../components/create-group/GroupRow";

export default function CreateGroup() {
    const [data, setData] = useState([]);
    const [groupTitle, setGroupTitle] = useState("");
    const [disabled, setDisabled] = useState(false);

    async function fetchGroups() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
                .from("exercise_groups")
                .select("*")
                .eq("userId", user?.id)

            if (error) throw error;

            if (data != null) {
                return setData(data);
            }
          } catch (error) {
            alert(error.message);
            // Toast notification error
        }
    }

    async function handleSubmit() {
        try {
            setDisabled(true);

            const { data: { user } } = await supabase.auth.getUser();

            const { error } = await supabase
                .from("exercise_groups")
                .insert({
                    title: groupTitle,
                    userId: user?.id
                })

            if (error) throw error;

            

            toast.success("Successfully added group!", {
                position: "bottom-center"
            })
            
            window.location.reload();
          } catch (error) {
            alert(error.message);
            // Toast notification error
        }
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    if (!data) {
        return <Loader />;
    }

    return (
        <>
            <Toaster />
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
                        onChange={e => setGroupTitle(e.target.value)}
                        className="placeholder:italic" 
                        placeholder="E.g. Chest & Triceps"
                        required
                    />
                </div>

                <div className="flex w-full justify-end">
                    <Button onClick={handleSubmit} disabled={groupTitle == "" ? true : disabled}>Create group</Button>
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