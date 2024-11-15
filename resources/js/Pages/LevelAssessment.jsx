import { Head, Link } from '@inertiajs/react';

export default function LevelAssessment({ auth }) {
    return (
        <>
            <Head title="Level Assessment" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
                {/* Navbar */}
                <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
                    <div className="text-xl font-bold text-blue-700">Yamamah</div>
                    <div className="space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center text-center mt-12">
                    <h1 className="text-4xl font-bold mb-4">Level Assessment</h1>
                    <p className="text-lg text-gray-600 mb-8">Start assessing your Arabic language level to proceed with the learning journey.</p>

                    {/* زر بدء التقييم */}
                    <div className="space-x-4">
                        <Link
                            href={route('start-assessment')}
                            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-700 transition"
                        >
                            Start Assessment
                        </Link>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 w-full text-center bg-gray-100 text-gray-700 mt-12">
                    All rights reserved © 2024 Yamamah Educational Platform
                </footer>
            </div>
        </>
    );
}
