import WorkoutTracker from "../src/pages/workout-tracker";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Loader from "./components/common/Loader";
import Login from "./pages/Login";

export default function App() {
  const { user } = useContext(UserContext);

  if(!user) {
    return <Loader />
  }

  return (
    <>
      {
        user ? (
          <section className="sm:mx-10 md:mx-16 lg:mx-40">
            <WorkoutTracker user={user} />
          </section>
        ) : (
          <Login />
        )
      }
    </>
  )
}


{/*  */}