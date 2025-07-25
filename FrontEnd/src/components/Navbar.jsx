import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'
import ThemeController from './ThemeController'

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/20'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <div className='flex items-center justify-between py-3 sm:py-4'>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-primary font-mono tracking-tight'>
            NoteFlux
          </h1>
          <div className='flex items-center gap-2 sm:gap-4'>
            <Link to={"/create"} className='btn btn-primary btn-sm sm:btn-md'>
              <PlusIcon className='size-4 sm:size-5' />
              <span className='hidden sm:inline'>New Note</span>
            </Link>
            <ThemeController />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar