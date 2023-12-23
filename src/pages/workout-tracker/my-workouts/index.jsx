import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useLocation } from "react-router";
import Loader from "../../../components/common/Loader";
import Heading from "../../../components/common/Heading";
import Box from "../../../components/common/Box";
import WorkoutCard from "../../../components/workouts/WorkoutCard";
import Button from "../../../components/common/Button";
import { HiPlus } from "react-icons/hi2";

export default function WorkoutsHome() {
    const [data, setData] = useState([]);
    const location = useLocation();
    const group = location?.state.data; // data passed from Link

    if (!group) {
        return <Loader />;
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

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <section>
            <Box>
                <Heading size="lg">
                    <b>{group.title ?? ""}</b>
                </Heading>
            </Box>

            <Box>
                <Button classnames="flex items-center gap-2">
                    <HiPlus />
                    Add Exercise
                </Button>
            </Box>
            

            <div>
                {
                    data?.length > 0 ? (
                        data.map(item => (
                            <WorkoutCard key={item.id} workout={item} />
                        ))
                    ) : (
                        <Box>
                            <p>No exercises for this group.</p>
                        </Box>
                    )
                }
            </div>

        </section>
    )
}