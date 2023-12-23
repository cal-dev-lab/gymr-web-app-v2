import Box from "../common/Box";
import * as Dialog from '@radix-ui/react-dialog';
import "../common/Modal.css"
import { HiXMark } from "react-icons/hi2";
import Input from "../common/Input";
import Heading from "../common/Heading";
import Button from "../common/Button";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import toast, { Toaster } from "react-hot-toast";

export default function GroupRow({ group }) {
    const [oldGroupTitle, setOldGroupTitle] = useState(group.title);
    const [newGroupTitle, setNewGroupTitle] = useState("");
    const [disabled, setDisabled] = useState(false);

    async function updateGroup() {
        try {
            setDisabled(true);

            // const { data: { user } } = await supabase.auth.getUser();

            const { error } = await supabase
                .from("exercise_groups")
                .update({
                    title: newGroupTitle,
                })
                .eq("id", group.id)

            if (error) throw error;

            if (oldGroupTitle !== newGroupTitle) {
                try {
                    const { data: { user } } = await supabase.auth.getUser();
                    const { error } = await supabase
                        .from("exercises")
                        .update({
                            group: newGroupTitle,
                        })
                        .eq("group", oldGroupTitle)
                        .eq("userId", user?.id)

                        if (error) throw error;
                } catch (error) {
                    alert(error.message)
                }
            }

            toast.success("Successfully updated group!", {
                position: "bottom-center"
            })
            
            window.location.reload();
          } catch (error) {
            alert(error.message);
            // Toast notification error
        }
    }

    return (
        <Box colour="purple" classnames="m-0">
            <Toaster />
            
            <p>{group.title}</p>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className='text-white'>Edit</button>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent font-grotesk">
                        <Dialog.Title className="DialogTitle">
                            <Heading size="xl">
                                <b>Edit group</b>
                            </Heading>
                        </Dialog.Title>
                        <Dialog.Description className="mb-2">
                            <p>Update the group title.</p>
                        </Dialog.Description>
                        <section className="flex-col gap-2">
                            <label className="Label" htmlFor="name">
                                <b>Title</b>
                            </label>
                            <Input defaultValue={oldGroupTitle ?? ""} onChange={e => setNewGroupTitle(e.target.value)} />
                        </section>
                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <Dialog.Close asChild>
                                <Button onClick={updateGroup} disabled={disabled}>
                                    Save changes
                                </Button>
                            </Dialog.Close>
                        </div>
                        <Dialog.Close asChild>
                            <button className="IconButton" aria-label="Close">
                                <HiXMark />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </Box>
    )
}