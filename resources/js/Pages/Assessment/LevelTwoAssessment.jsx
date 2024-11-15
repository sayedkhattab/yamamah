import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function LevelTwoAssessment() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [uuid, setUuid] = useState(null);

    // الأسئلة للمستوى الثاني
    const questions = [
        {
            question: "الولد يلعب في الحديقة",
            options: [
                { id: 1, text: 'The boy is playing in the garden.', correct: true },
                { id: 2, text: 'The boy is eating in the park.', correct: false },
                { id: 3, text: 'The girl is reading a book.', correct: false },
            ],
        },
        {
            question: "الفتاة تقرأ كتابًا",
            options: [
                { id: 1, text: 'The girl is reading a book.', correct: true },
                { id: 2, text: 'The boy is swimming in the pool.', correct: false },
                { id: 3, text: 'The cat is sleeping.', correct: false },
            ],
        },
        {
            question: "القطة تنام على السرير",
            options: [
                { id: 1, text: 'The cat is eating on the floor.', correct: false },
                { id: 2, text: 'The cat is sleeping on the bed.', correct: true },
                { id: 3, text: 'The bird is flying in the sky.', correct: false },
            ],
        },
        {
            question: "الرجل يذهب إلى العمل",
            options: [
                { id: 1, text: 'The man is cooking dinner.', correct: false },
                { id: 2, text: 'The woman is going to school.', correct: false },
                { id: 3, text: 'The man is going to work.', correct: true },
            ],
        },
        {
            question: "السماء صافية اليوم",
            options: [
                { id: 1, text: 'The sky is clear today.', correct: true },
                { id: 2, text: 'The sea is rough today.', correct: false },
                { id: 3, text: 'The weather is cloudy.', correct: false },
            ],
        },
        {
            question: "السيارة صفراء اللون",
            options: [
                { id: 1, text: 'The car is red.', correct: false },
                { id: 2, text: 'The car is yellow.', correct: true },
                { id: 3, text: 'The car is blue.', correct: false },
            ],
        },
        {
            question: "الطيور تطير في السماء",
            options: [
                { id: 1, text: 'The birds are swimming in the pond.', correct: false },
                { id: 2, text: 'The birds are flying in the sky.', correct: true },
                { id: 3, text: 'The birds are walking on the ground.', correct: false },
            ],
        },
        {
            question: "الولد يأكل تفاحة",
            options: [
                { id: 1, text: 'The boy is eating an apple.', correct: true },
                { id: 2, text: 'The boy is reading a book.', correct: false },
                { id: 3, text: 'The boy is riding a bicycle.', correct: false },
            ],
        },
        {
            question: "البنت تركب الدراجة",
            options: [
                { id: 1, text: 'The girl is riding a bike.', correct: true },
                { id: 2, text: 'The girl is eating a cake.', correct: false },
                { id: 3, text: 'The girl is playing the piano.', correct: false },
            ],
        },
        {
            question: "الكلب يسبح في الماء",
            options: [
                { id: 1, text: 'The dog is running.', correct: false },
                { id: 2, text: 'The dog is swimming in the water.', correct: true },
                { id: 3, text: 'The dog is sleeping.', correct: false },
            ],
        },
    ];

    useEffect(() => {
        // جلب UUID من الرابط للتأكد من استمرار استخدام نفس UUID بين المستويات المختلفة
        const storedUuid = new URLSearchParams(window.location.search).get('uuid');
        if (storedUuid) {
            setUuid(storedUuid);
        }
    }, []);

    useEffect(() => {
        if (showScore && uuid) {
            // حساب النسبة المئوية للنتيجة
            const percentage = ((score / questions.length) * 100).toFixed(2);

            axios.post('/store-temporary-result', {
                uuid: uuid,
                score: score,
                level: 2, // تحديد المستوى الحالي (المستوى الثاني)
                percentage: percentage, // إرسال النسبة المئوية كجزء من البيانات
            })
            .then(response => {
                console.log('Result saved successfully.');
            })
            .catch(error => {
                console.error('Error saving result:', error);
            });
        }
    }, [showScore, uuid, score, questions.length]);

    const handleOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <>
            <Head title="Level Two Assessment" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#3853A3] text-gray-50">
                {showScore ? (
                    <div className="bg-white text-black rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold mb-6">Assessment Completed</h2>
                        <p className="text-lg mb-4">
                            You scored {score} out of {questions.length}.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href={route('level-three', { uuid })}
                                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
                            >
                                Next Level
                            </Link>
                            <button
                                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                                onClick={() => window.location.href = route('register')}
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-4xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-center">Level Two Assessment Test</h2>
                        <div className="flex justify-between items-center mb-6">
                            <span>Question {currentQuestion + 1} of {questions.length}</span>
                            <div className="w-2/3 bg-gray-300 rounded-full h-4 overflow-hidden">
                                <div
                                    className="bg-[#F0A122] h-full"
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-[#657452] shadow-lg rounded-lg p-10">
                            <h2 className="text-2xl font-semibold mb-6 text-center">
                                {questions[currentQuestion].question}
                            </h2>
                            <div className="flex flex-col space-y-4">
                                {questions[currentQuestion].options.map((option) => (
                                    <button
                                        key={option.id}
                                        className="bg-[#3853A3] text-white font-bold py-4 px-10 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
                                        onClick={() => handleOptionClick(option.correct)}
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
