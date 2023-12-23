import { supabase } from "../../../supabaseClient";
import { useLocation } from "react-router";
import { useState } from "react";
import Box from "../../../components/common/Box";
import Button from "../../../components/common/Button";
import Heading from "../../../components/common/Heading";
import Input from "../../../components/common/Input";
import toast, { Toaster } from "react-hot-toast";

export default function CreateGroup() {
    const [groupTitle, setGroupTitle] = useState("");

    const location = useLocation();
    const group = location?.state.data;

    if (!group) {
        return <Loader />;
    }

    console.log(group);

    async function handleSubmit() {
        try {
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
          } catch (error) {
            alert(error.message);
            // Toast notification error
        }
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
                    />
                </div>

                <div className="flex w-full justify-end">
                    <Button onClick={handleSubmit}>Create group</Button>
                </div>
            </Box>

            <Box>
                <Heading>
                    <b>Exisiting groups</b>
                </Heading> 
                <p>{group.title ?? "No groups"}</p>
            </Box>
        </>
    )
}