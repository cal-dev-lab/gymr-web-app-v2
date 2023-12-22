import { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './supabaseClient';
import WorkoutTracker from './pages/workout-tracker';


export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => subscription.unsubscribe();
  }, [])

  return (
    <>
      {
        !session
        ? <Auth 
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={false}
            />
        : <WorkoutTracker session={session} />
      }
    </>
  )
}