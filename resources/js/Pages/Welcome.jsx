import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col bg-[#3853A3] text-white">
                {/* Navbar */}
                <nav className="w-full py-4 px-8 flex justify-between items-center">
                    <div className="text-xl font-bold text-white">Yamamah</div>
                    <div className="space-x-4 hidden sm:flex">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2 text-white rounded-md hover:text-[#F0A122] transition"
                            >
                                Log In
                            </Link>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="flex-1 container mx-auto flex flex-col lg:flex-row items-center justify-center text-center mt-12 px-4 lg:px-8">
                    {/* Left Side: Text and Buttons */}
                    <div className="flex-1 flex flex-col items-center lg:items-start justify-center mb-8 lg:mb-0">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-center lg:text-left">Welcome to Yamamah</h1>
                        <p className="text-xl lg:text-3xl mb-2 text-center lg:text-left">Learn Arabic easily</p>
                        <p className="text-md lg:text-lg mb-8 text-center lg:text-left">
                            The platform is dedicated to teaching the Arabic language to non-native speakers using the latest learning methods.
                        </p>
                        <div className="space-y-4 lg:space-x-4 lg:space-y-0 flex flex-col lg:flex-row">
                            <Link
                                href={route('start-assessment')}
                                className="px-6 py-4 bg-[#9E764F] text-white text-lg rounded-md hover:bg-[#9E764F] transition"
                            >
                                Level Assessment
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-6 py-4 bg-[#8aac46] text-white text-lg rounded-md hover:bg-[#8aac46] transition"
                            >
                                Join now
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: Image */}
                    <div className="flex-1 flex items-center justify-center">
                        <img src="/images/hero.jpg" alt="Hero" className="w-full max-w-md lg:max-w-lg h-auto" />
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 w-full text-center text-white mt-12">
                    All rights reserved © 2024 Yamamah Educational Platform
                </footer>
            </div>
        </>
    );
}
