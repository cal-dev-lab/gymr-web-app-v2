import { HiUser, HiChevronUpDown } from "react-icons/hi2";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Dropdown({ options }) {

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="flex gap-2 items-center text-black text-xl">
                    <span className="bg-black rounded-full p-2 flex items-center gap-1 text-white">
                        <HiUser />
                        <HiChevronUpDown />
                    </span>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-black rounded p-2" sideOffset={5}>
                    {
                        options?.length > 0 ? (
                            options.map(option => (
                                <DropdownMenu.Item>
                                    <p className="text-white">
                                        {option.element}
                                    </p>
                                </DropdownMenu.Item>
                            ))
                        ) : (
                            <DropdownMenu.Item>
                                No options supplied
                            </DropdownMenu.Item>
                        )
                    }
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}






{/* <DropdownMenu.Item className="DropdownMenuItem">
                        <p onClick={() => supabase.auth.signOut()}>
                            Sign out
                        </p>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                        New Window <div className="RightSlot">⌘+N</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem" disabled>
                        New Private Window <div className="RightSlot">⇧+⌘+N</div>
                    </DropdownMenu.Item>
                    
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                        More Tools
                        <div className="RightSlot">
                            <p>&rarr;</p>
                        </div>
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.Portal>
                        <DropdownMenu.SubContent
                            className="DropdownMenuSubContent"
                            sideOffset={2}
                            alignOffset={-5}
                        >
                            <DropdownMenu.Item className="DropdownMenuItem">
                            Save Page As… <div className="RightSlot">⌘+S</div>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="DropdownMenuItem">Create Shortcut…</DropdownMenu.Item>
                            <DropdownMenu.Item className="DropdownMenuItem">Name Window…</DropdownMenu.Item>
                            <DropdownMenu.Separator className="DropdownMenu.Separator" />
                            <DropdownMenu.Item className="DropdownMenuItem">Developer Tools</DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Sub>

                    <DropdownMenu.Separator className="DropdownMenuSeparator" /> */}