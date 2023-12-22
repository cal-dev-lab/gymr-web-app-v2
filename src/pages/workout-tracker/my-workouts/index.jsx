import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useLocation } from "react-router";
import Loader from "../../../components/common/Loader";
import Heading from "../../../components/common/Heading";
import Box from "../../../components/common/Box";



export default function WorkoutsHome(props) {
    const [data, setData] = useState([]);
    const location = useLocation();
    const group = location?.state.data; // data passed from Link



    async function fetchWorkouts(groupTitle) {
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
                <Heading size="sm">
                    <b>{group.title ?? ""}</b>
                </Heading>
            </Box>
            

            <div>
                {
                    data?.length > 0 ? (
                        data.map(item => (
                            // Card here for individual workouts
                            <div key={item.id}>
                            <p>{item.title}</p>
                            <p>{item.repetitions}</p>
                            <p>{item.weight}</p>
                            </div>
                        ))
                    ) : (
                        <Loader />
                    )
                }
            </div>

        </section>
    )
}