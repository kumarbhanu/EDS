import { Button } from '@/components/ui/button';
import ModeToggle from './mode-toggle';
import Link from 'next/link';


import { BedSingle, FolderCode } from 'lucide-react';


const Menu = () => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className=' md:flex w-full max-w-xs gap-1'>
        <ModeToggle />
        <Button asChild variant='ghost'>
          <Link href='/'>
            < BedSingle/>
            Components
          </Link>
        </Button>
             <Button asChild variant='ghost'>
          <Link href='/website'>
            < FolderCode/>
            Website
          </Link>
        </Button>
        {/* <UserButton/> */}
   
      </nav>

    </div>
  );
};

export default Menu;
