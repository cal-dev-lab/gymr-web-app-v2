import { HiChevronDown, HiEllipsisHorizontal, HiCheck, HiUser, HiPencilSquare } from "react-icons/hi2";
import Box from "../common/Box";
import Heading from "../common/Heading";
import { useEffect, useState } from "react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { supabase } from "../../supabaseClient";
import { Toaster, toast } from "react-hot-toast";
import { useRevalidator } from "react-router";

export default function WorkoutCard({ workout }) {
    const [arrDirection, setArrDirection] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [completed, setCompleted] = useState(workout.complete);

    const toggleContent = () => {
        setArrDirection(!arrDirection)
        setShowContent(!showContent)
    }

    async function updateWorkout() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from("exercises")
                .update({ complete: completed ? false : true })
                .eq("userId", user?.id)
                .eq("title", workout?.title)

            if (data != null) {
                return data;
            }
        
            if (error) throw error;
        
            toast.success("Successfully updated workout!", {
                position: "bottom-center",
                duration: 2000
            })

            setTimeout(() => {
                window.location.reload(true);
            },[2000])
            
          } catch (error) {
            alert(error.message);
          } 
    }

    return (
        <>
            <Toaster />
            <Box colour="purple">
                <div className="flex items-center justify-between" onClick={toggleContent}>
                    <Heading size="sm" classNames="flex items-center gap-2">
                        {workout.complete && <HiCheck className="text-white" />}
                        <b className="text-white">{workout.title}</b>
                    </Heading>
                    
                    <div className="flex items-center gap-2">
                        <HiPencilSquare />

                        <HiChevronDown onClick={toggleContent} className={`${arrDirection ? "rotate-180" : "rotate-360"}`} />
                    </div>
                    
                </div>

                {showContent && (
                    <Box classnames="!m-0 !mt-2">
                        <section className="grid grid-cols-4 gap-4">
                            <div>
                                <b className="text-sm">Sets</b>
                                <p>{workout.sets}</p>
                            </div>
                            
                            <div>
                                <b className="text-sm">Reps</b>
                                <p>{workout.repetitions}</p>
                            </div>

                            <div>
                                <b className="text-sm">Weight</b>
                                <p>{workout.weight}kg</p>
                            </div>

                            <div>
                                <b className="text-sm" htmlFor="completed">Done</b>
                                <Checkbox.Root
                                    className="bg-purple w-5 h-5 rounded flex items-center justify-center"
                                    checked={completed}
                                    onCheckedChange={(e) => {
                                        setCompleted(!completed)
                                        updateWorkout();
                                    }}
                                    value={completed}
                                    id="completed"
                                >
                                    <Checkbox.Indicator>
                                        <HiCheck className="text-white" />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                            </div>
                        </section>
                    </Box>
                )}
            </Box>
        </>
    )
}