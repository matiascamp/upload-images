'use client'

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const ThemeToggle = () => {

    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return (
        <Image src="/logo-small.svg" width={20} height={20} alt='loading img' />
    )

    if (resolvedTheme === 'dark') {
        return (
            <button className="bg-white dark:bg-gray-700 border border-gray-300 rounded-md p-2 cursor-pointer" onClick={() => setTheme('light')}>
                <Image className='fill-white' src="/Sun_fill.svg" alt="sun image" width={30} height={30} />
            </button>
        )
    }

    if (resolvedTheme === 'light') {
        return (
            <button className="bg-white dark:bg-white-100 border border-gray-300 rounded-md p-2 cursor-pointer" onClick={() => setTheme('dark')}>
                <Image className='fill-white' src="/Moon_fill.svg" alt="sun image" width={30} height={30} />
            </button>
        )
    }
};

export default ThemeToggle;