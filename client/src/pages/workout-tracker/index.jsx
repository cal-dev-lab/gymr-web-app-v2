import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Navbar from "../../components/common/Navbar";
import Modal from "../../components/common/Modal";
import DailyProgress from "../../components/home/DailyProgress";
import MyWorkouts from "../../components/home/MyWorkouts";
import Heading from "../../components/common/Heading";

function WorkoutTracker({ session }) {
    const [user, setUser] = useState([]);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [sets, setSets] = useState(0);
    const [complete, setComplete] = useState(false);

    async function fetchExercises() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
            .from("exercises")
            .select("*")
            .eq("userId", user?.id)

            if (error) throw error;
              
            if (data != null) {
              return setData(data), setUser(user);
            }

            // console.log(data)
          } catch (error) {
            alert(error.message);
            // Toast notification error
        } 
    }

    useEffect(() => {
        fetchExercises();
    }, []);
    
    if (!data) {
        return <Loader />;
    }

    return (
        <section className="h-screen">
            <div className="text-center py-4">
                <Heading size="xxxxl">
                    <b className="text-purple">Gymr.</b>
                </Heading>
            </div>
            <Navbar user={user} />

            <DailyProgress data={data} user={user} />

            <MyWorkouts workouts={data} />

            {/* 
                Progress setter modal
                How many days do you want to workout this week?
                Add progress bar
                Use the complete status to add a check
                Use the amount of completes to add up progress bar
                if users complete.length >= users day goal -- reset

                Split exercises into groups by day

            */}

            {/* <Modal /> */}
        </section>
    )
}

export default WorkoutTracker;