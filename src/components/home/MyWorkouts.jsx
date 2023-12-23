import { HiArrowLongRight } from "react-icons/hi2";
import Box from "../common/Box";
import Heading from "../common/Heading";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import GroupCard from "./GroupCard";

export default function MyWorkouts() {
    const [data, setData] = useState([]);

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
            console.log(data)
          } catch (error) {
            alert(error.message);
            // Toast notification error
        } 
    }

    useEffect(() => {
        fetchGroups();
    }, [])

    if (!data) {
        return <Loader />
    }
    
    return (
        <Box>
            <Heading size="sm" classNames='mb-4'>
                <b>My workouts</b>
                <p>Pick from a workout group below and record your workout.</p>
            </Heading>

            {
                data?.length > 0 ? (
                    data.map((group, index) => (
                        <Link
                            to={`/workout/${group.title}`}
                            state={{ data: group }}
                            key={index}
                        >
                            <GroupCard group={group} />
                        </Link>

                    ))
                ) : (
                    <p>You haven't setup any groups yet!</p>
                )
                
            }
        </Box>
    )
}