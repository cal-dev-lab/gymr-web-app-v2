import * as Progress from '@radix-ui/react-progress';
import Box from "../common/Box";
import Heading from "../common/Heading";
import { useEffect, useState } from 'react';
import Loader from '../common/Loader';
import { supabase } from '../../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

export default function DailyProgress({ data }) {
    if (!data) {
        return <Loader />
    }
    
    // Calculate percentage complete
    let totalExercises = data?.length;
    let exercisesComplete = Object.values(data).filter(item => item.complete == true);
    
    let calculation = (exercisesComplete.length / totalExercises) * 100;
    
    const [motivationMsg, setMotivationMsg] = useState("");
    const [completeExercises, setCompleteExercises] = useState(exercisesComplete.length);

    async function fetchAllCompleteExercises() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
                .from("exercises")
                .select("*")
                .eq("userId", user?.id)
                .eq("complete", exercisesComplete ? true : false)

            if (error) throw error;
              
            if (data != null) {
              return data, setCompleteExercises(0);
            }
          } catch (error) {
            toast.error(error.message);
        }
    }

    async function resetCompleteStatus() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
              .from("exercises")
              .update({
                complete: exercisesComplete && false
              })
              .eq("userId", user?.id);
        
            if (error) throw error;

            if (data != null) {
                return data;
            }
        
            toast.success("Your daily progress has reset.", {
                position: "bottom-center"
            });
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
        } 
    }

    useEffect(() => {
        const interval = setInterval(() => {
          const currentDate = new Date();
          const previousDate = new Date();
          previousDate.setDate(previousDate.getDate() - 1); // Set the date to the previous day

          if (currentDate.getDate() !== previousDate.getDate()) {
            fetchAllCompleteExercises();
            resetCompleteStatus();
          } else {
            setIsNextDay(false); // It is not the next day
          }
        }, 86400000); // Check every 24 hours
    
        return () => clearInterval(interval); // Clean up the interval
    }, []);

    // Sets motivation message based on percentage
    useEffect(() => {
        if (calculation == 0) {
            setMotivationMsg("Let's get started!")
        } else if (calculation <= 25) {
            setMotivationMsg("You're off to a great start!")
        } else if (calculation > 25 && calculation <= 50) {
            setMotivationMsg("Keep up the good work!")
        } else if (calculation > 50 && calculation < 100) {
            setMotivationMsg("Let's smash it!")
        } else if (calculation == 100) {
            setMotivationMsg("Congratulations! 🎉")
        }
    }, [data])

    return (
        <Box classnames="flex-col">
            <Toaster />
            <Heading size="sm" classNames='mb-4'>
                <b>Daily progress tracker</b>
                <p>Your progress will reset every 24 hours automatically when a new day begins.</p>
            </Heading>

            <p className="font-bold mb-1">
                {motivationMsg}
            </p>

            <Progress.Root className="relative overflow-hidden bg-purple/20 rounded-[99999px] w-full h-[20px] [transform: translateZ(0)]">
                <p className='absolute flex w-full h-full text-white items-center justify-center z-[999] text-xs'>
                    {
                        calculation == 100
                            ? "Completed!"
                            : <span>
                                {
                                    data?.length > 0 ? (
                                        <span>
                                            {Math.floor(calculation)}%
                                        </span>
                                    ) : <span>0%</span>
                                }
                                
                              </span>
                    }

                    {/* 
                    
                        For each time you complete a workout, earn a trophy (emoji) in an 'Achievements' page or on home page a trophy x {amountOfCompletions}
                    
                    */}
                </p>
                <Progress.Indicator
                    className={`${calculation == 100 ? "bg-green" : "bg-purple"} w-full h-full [transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1)]`}
                    style={{ 
                        transform: `translateX(-${100 - calculation}%)`
                    }}
                />
            </Progress.Root>
        </Box>
    )
}