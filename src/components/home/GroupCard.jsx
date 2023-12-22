import { HiArrowLongRight } from "react-icons/hi2";
import Box from "../common/Box";
import Heading from "../common/Heading";
import { supabase } from "../../supabaseClient";
import { useEffect, useState } from "react";

export default function GroupCard({ group }) {
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);

    async function fetchWorkouts() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
            .from("exercises")
            .select("group")
            .eq("userId", user?.id && "group", group.title)

            if (error) throw error;
              
            if (data != null) {
              return setData(data), setUser(user);
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
        <Box onClick={fetchWorkouts} colour="purple" classnames="flex justify-between items-center gap-2 !m-0 !mb-2">
            <Heading size="sm" classNames="truncate text-white">
                    <b title={group.title}>
                        {group.title ?? ""}
                    </b>
            </Heading>

            <HiArrowLongRight />
        </Box>
    )
}