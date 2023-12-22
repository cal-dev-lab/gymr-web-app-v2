import * as Progress from '@radix-ui/react-progress';
import Box from "../common/Box";
import Heading from "../common/Heading";
import { useEffect, useState } from 'react';

export default function DailyProgress() {
    const [progress, setProgress] = useState(20);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(75), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box classnames="flex-col">
            <Heading size="sm" classNames='mb-4'>
                <b>Daily progress tracker</b>
                <p>Track how well you have been doing this week.</p>
            </Heading>

            <p className="font-bold mb-1">You're doing great!</p>

            <Progress.Root className="relative overflow-hidden bg-purple/20 rounded-[99999px] w-full h-[20px] [transform: translateZ(0)]" value={progress}>
                <p className='absolute flex w-full h-full text-white items-center justify-center z-[999] text-xs'>
                    {progress}%
                </p>
                <Progress.Indicator
                    className="bg-purple w-full h-full [transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1)]"
                    style={{ 
                        transform: `translateX(-${100 - progress}%)`
                    }}
                />
            </Progress.Root>
        </Box>
    )
}