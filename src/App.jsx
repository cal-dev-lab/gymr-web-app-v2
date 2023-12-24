import { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './supabaseClient';
import WorkoutTracker from './pages/workout-tracker';
import Box from './components/common/Box';
import Heading from './components/common/Heading';


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
        ? <Box classnames="min-h-screen flex flex-col items-center justify-center space-y-4">
            <Heading size="xxxl">
              Gymr
            </Heading>
            <Auth 
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={false}
              />
          </Box>
        : <WorkoutTracker session={session} />
      }
    </>
  )
}