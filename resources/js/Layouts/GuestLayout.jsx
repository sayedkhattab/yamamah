import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#3853A3] text-white">
            {/* Navbar */}
            <nav className="w-full py-4 px-8 flex justify-between items-center">
                <div className="text-xl font-bold text-white">Yamamah</div>
                <div className="space-x-4 hidden sm:flex">
                    <Link
                        href={route('login')}
                        className="px-4 py-2 text-white rounded-md hover:text-[#F0A122] transition"
                    >
                        Log In
                    </Link>
                    <Link
                        href={route('register')}
                        className="px-4 py-2 text-white rounded-md hover:text-[#F0A122] transition"
                    >
                        Register
                    </Link>
                </div>
            </nav>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center w-full px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="py-6 w-full text-center text-white mt-12">
                All rights reserved © 2024 Yamamah Educational Platform
            </footer>
        </div>
    );
}
