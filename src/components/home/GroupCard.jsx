import { HiArrowLongRight } from "react-icons/hi2";
import Box from "../common/Box";
import Heading from "../common/Heading";
import { supabase } from "../../supabaseClient";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

export default function GroupCard({ group }) {
    const [data, setData] = useState([]);

    async function fetchWorkouts() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
            .from("exercises")
            .select("*")
            .eq("userId", user?.id)
            .eq("group", group.title)

            if (data != null) {
                return setData(data);
            }
            
            if (error) throw error;
          } catch (error) {
            alert(error.message);
            // Toast notification error
        } 
    }

    useEffect(() => {
        fetchWorkouts();
    }, []);

    if (!data)
        return <Loader />;

    // Find all exercises with a true complete status
    let totalExercises = data?.length;
    let exercisesComplete = Object.values(data).filter(item => item.complete == true);

    return (
        <Box  colour="purple" classnames="flex justify-between items-center gap-2 !m-0">
            <Heading size="sm" classNames="truncate text-white">
                    <b title={group.title}>
                        {group.title ?? ""}
                    </b>
                    <p className="text-xs">
                        {`${exercisesComplete.length} / ${totalExercises}`} completed
                    </p>
            </Heading>

            <div className="flex items-center gap-2">
                <HiArrowLongRight />
            </div>
        </Box>
    )
}