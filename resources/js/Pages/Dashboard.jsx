import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({ assessmentResults }) {
    return (
        <AuthenticatedLayout>
            <Head title="Student Dashboard" />

            <div className="py-12 bg-[#3853A3] min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-around space-x-4">
                        {assessmentResults.map((result, index) => (
                            <div key={index} className="bg-[#9E764F] text-white rounded-lg shadow-md p-6 w-1/3">
                                <h3 className="text-lg font-bold mb-2">Level: {result.level}</h3>
                                <p>Score: {result.score}</p>
                                <p>Percentage: {result.percentage}%</p>
                                {/* Progress bar */}
                                <div className="w-full bg-gray-300 rounded-full h-4 mt-4 overflow-hidden">
                                    <div
                                        className="bg-[#8AAC46] h-full"
                                        style={{ width: `${result.percentage}%` }}
                                    ></div>
                                </div>
                                {/* Feedback message and button */}
                                <div className="mt-4">
                                    {result.percentage === 100 && (
                                        <p className="text-green-500 font-semibold mt-2">
                                            Congratulations! You have passed this level.
                                        </p>
                                    )}
                                    {result.percentage >= 60 && result.percentage < 100 && (
                                        <>
                                            <p className="text-white-500 font-semibold mt-2">
                                                Your level is good, but you can practice more to pass this level.
                                            </p>
                                            <button
                                                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-3 hover:bg-blue-700 transition"
                                            >
                                                Continue Studying
                                            </button>
                                        </>
                                    )}
                                    {result.percentage < 60 && (
                                        <>
                                            <p className="text-white-500 font-semibold mt-2">
                                                Your level is weak in this level, you need to study more.
                                            </p>
                                            <button
                                                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-3 hover:bg-blue-700 transition"
                                            >
                                                Continue Studying
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
