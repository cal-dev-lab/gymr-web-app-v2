import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useLocation } from "react-router";
import Loader from "../../../components/common/Loader";
import Heading from "../../../components/common/Heading";
import Box from "../../../components/common/Box";
import WorkoutCard from "../../../components/workouts/WorkoutCard";
import Button from "../../../components/common/Button";
import { HiChevronDown, HiPlus, HiXMark } from "react-icons/hi2";
import * as Dialog from '@radix-ui/react-dialog';
import Input from "../../../components/common/Input";
import toast, { Toaster } from "react-hot-toast";

export default function WorkoutsHome() {
    const [data, setData] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [arrDirection, setArrDirection] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const [title, setTitle] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");    

    const location = useLocation();
    const group = location?.state.data; // data passed from Link

    if (!data) {
        return <Loader />;
    }

    const toggleContent = () => {
        setArrDirection(!arrDirection)
        setShowContent(!showContent)
    }

    async function fetchWorkouts() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
                .from("exercises")
                .select("*")
                .eq("userId", user?.id)
                .eq("group", group.title)

                if (error) throw error;
                
                if (data != null) {
                return setData(data);
                }
                console.log(data)
          } catch (error) {
            alert(error.message);
            // Toast notification error
        }
    }

    async function createExercise() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { error } = await supabase
                .from("exercises")
                .insert({
                    title: title,
                    sets: sets,
                    repetitions: reps,
                    weight: weight,
                    group: group.title,
                    userId: user?.id
                })

                if (error) throw error;

                toast.success("Successfully created exercise!", {
                    position: "bottom-center"
                })

                window.location.reload();
          } catch (error) {
            alert(error.message);
            // Toast notification error
        }
    }


    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <section>
            <Toaster />
            <Box>
                <div onClick={toggleContent} className="flex items-center justify-between">
                    <Heading size="lg">
                        <b>{group.title ?? ""}</b>
                    </Heading>

                    <HiChevronDown onClick={toggleContent} className={`${arrDirection ? "rotate-180" : "rotate-360"}`} />
                </div>

                {showContent && (
                    <div className="space-y-2 !m-0 !mt-2">
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button classnames="flex w-full items-center gap-2">
                                    <HiPlus />
                                    Add exercise
                                </Button>
                            </Dialog.Trigger>

                            <Dialog.Portal>
                                <Dialog.Overlay className="DialogOverlay" />
                                <Dialog.Content className="DialogContent font-grotesk">
                                    <Dialog.Title className="DialogTitle">
                                        <Heading size="xl">
                                            <b>Add exercise</b>
                                        </Heading>
                                    </Dialog.Title>
                                    <Dialog.Description className="mb-2">
                                        <p>Create an exercise for this group.</p>
                                    </Dialog.Description>
                                    <section className="flex-col gap-2 space-y-2">
                                        <div>
                                            <label>
                                                <b>Title</b>
                                            </label>
                                            <Input onChange={e => setTitle(e.target.value)} />
                                        </div>

                                        <div>
                                            <label>
                                                <b>Sets</b>
                                            </label>
                                            <Input type="number" onChange={e => setSets(e.target.value)} />
                                        </div>
                                        
                                        <div>
                                            <label>
                                                <b>Repititions</b>
                                            </label>
                                            <Input type="number" onChange={e => setReps(e.target.value)} />
                                        </div>

                                        <div>
                                            <label>
                                                <b>Weight (in kg)</b>
                                            </label>
                                            <Input type="number" onChange={e => setWeight(e.target.value)} />
                                        </div>

                                        <div>
                                            <label>
                                                <b>Group</b>
                                            </label>
                                            <Input value={group.title} disabled />
                                        </div>
                                    </section>
                                    
                                    <div className="flex mt-4 justify-end gap-2">
                                        <Dialog.Close asChild>
                                            <Button classnames="!bg-purple/20 !text-purple">
                                                Cancel
                                            </Button>
                                        </Dialog.Close>
                                        <Dialog.Close asChild>
                                            <Button colour="purple" onClick={createExercise} disabled={disabled}>
                                                Confirm
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
                        
                        {/* <Button classnames="!bg-purple/20 !text-purple flex w-full items-center gap-2">
                            <HiPlus />
                            Delete exercise(s)
                        </Button> */}
                    </div>
                )}
            </Box>

            <div>
                {
                    data?.length > 0 ? (
                        data.map(item => (
                            <WorkoutCard key={item.id} workout={item} />
                        ))
                    ) : (
                        <Box>
                            <Heading size="lg">
                                <b>No exercises found</b>
                            </Heading>
                            <p>Click the group title to add a new exercise.</p>
                        </Box>
                    )
                }
            </div>
        </section>
    )
}