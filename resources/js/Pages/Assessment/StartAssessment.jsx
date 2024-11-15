import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function StartAssessment() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [uuid, setUuid] = useState(null);

    const questions = [
        {
            question: "Which one of these is 'تفاحة'?",
            options: [
                { id: 1, text: 'boy', image: '/images/questions/boy.png', correct: false },
                { id: 2, text: 'apple', image: '/images/questions/apple.png', correct: true },
                { id: 3, text: 'car', image: '/images/questions/car.png', correct: false },
            ],
        },
        {
            question: "Which one of these is 'ولد'?",
            options: [
                { id: 1, text: 'boy', image: '/images/questions/boy.png', correct: true },
                { id: 2, text: 'cat', image: '/images/questions/cat.png', correct: false },
                { id: 3, text: 'girl', image: '/images/questions/girl.png', correct: false },
            ],
        },
        {
            question: "Which one of these is 'بنت'?",
            options: [
                { id: 1, text: 'boy', image: '/images/questions/boy.png', correct: false },
                { id: 2, text: 'girl', image: '/images/questions/girl.png', correct: true },
                { id: 3, text: 'dog', image: '/images/questions/dog.png', correct: false },
            ],
        },
        {
            question: "Which one of these is 'سيارة'?",
            options: [
                { id: 1, text: 'car', image: '/images/questions/car.png', correct: true },
                { id: 2, text: 'moto', image: '/images/questions/moto.png', correct: false },
                { id: 3, text: 'ship', image: '/images/questions/ship.png', correct: false },
            ],
        },
        {
            question: "Which one of these is 'قطة'?",
            options: [
                { id: 1, text: 'cat', image: '/images/questions/cat.png', correct: true },
                { id: 2, text: 'dog', image: '/images/questions/dog.png', correct: false },
                { id: 3, text: 'rabbit', image: '/images/questions/rabbit.png', correct: false },
            ],
        },
        {
            question: "Which one of these is 'كرة'?",
            options: [
                { id: 1, text: 'ball', image: '/images/questions/ball.png', correct: true },
                { id: 2, text: 'book', image: '/images/questions/book.png', correct: false },
                { id: 3, text: 'bag', image: '/images/questions/bag.png', correct: false },
            ],
        },
        {
            question: "Which one of these is 'شجرة'?",
            options: [
                { id: 1, text: 'tree', image: '/images/questions/tree.png', correct: true },
                { id: 2, text: 'palm', image: '/images/questions/palm.png', correct: false },
                { id: 3, text: 'flower', image: '/images/questions/flower.png', correct: false },
            ],
        },
        {
            question: "Which one of these is 'نخلة'?",
            options: [
                { id: 1, text: 'palm', image: '/images/questions/palm.png', correct: true },
                { id: 2, text: 'tree', image: '/images/questions/tree.png', correct: false },
                { id: 3, text: 'flower', image: '/images/questions/flower.png', correct: false },
            ],
        },
        {
            question: "Which one of these is 'دراجة نارية'?",
            options: [
                { id: 1, text: 'moto', image: '/images/questions/moto.png', correct: true },
                { id: 2, text: 'car', image: '/images/questions/car.png', correct: false },
                { id: 3, text: 'plane', image: '/images/questions/plane.png', correct: false },
            ],
        },
        {
            question: "Which one of these is 'طائرة'?",
            options: [
                { id: 1, text: 'plane', image: '/images/questions/plane.png', correct: true },
                { id: 2, text: 'ship', image: '/images/questions/ship.png', correct: false },
                { id: 3, text: 'car', image: '/images/questions/car.png', correct: false },
            ],
        },
    ];

    useEffect(() => {
        // Generate UUID only once when the component mounts
        if (!uuid) {
            const generatedUuid = crypto.randomUUID();
            setUuid(generatedUuid);
        }
    }, []);

    useEffect(() => {
        if (showScore && uuid) {
            const percentage = ((score / questions.length) * 100).toFixed(2); // حساب النسبة المئوية للنتيجة

            axios.post('/store-temporary-result', {
                uuid: uuid,
                score: score,
                level: 1, // تحديد المستوى الحالي (المستوى الأول)
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
            <Head title="Level Assessment" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#3853A3] text-gray-50">
                {showScore ? (
                    <div className="bg-white text-black rounded-lg shadow-lg p-12 text-center w-full max-w-lg">
                        <h2 className="text-4xl font-bold mb-6">Assessment Completed</h2>
                        <p className="text-lg mb-8">
                            You scored {score} out of {questions.length}.
                        </p>
                        <div className="flex flex-col space-y-4">
                            <Link
                                href={route('level-two', { uuid })}
                                className="bg-[#8aac46] text-white px-6 py-4 rounded-md hover:bg-[#9E764F] transition text-lg"
                            >
                                Proceed to Next Level
                            </Link>
                            <Link
                                href={route('register')}
                                className="bg-[#F0A122] text-white px-6 py-4 rounded-md hover:bg-[#d98c1e] transition text-lg"
                            >
                                Register a New Account
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-4xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-center">Level Assessment Test</h2>
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
                            <div className="flex justify-center gap-8">
                                {questions[currentQuestion].options.map((option) => (
                                    <button
                                        key={option.id}
                                        className="bg-[#3853A3] text-white font-bold py-8 px-10 rounded-lg shadow-md w-48 h-64 flex flex-col items-center justify-center transform hover:scale-105 transition duration-300 ease-in-out"
                                        onClick={() => handleOptionClick(option.correct)}
                                    >
                                        {option.image && (
                                            <img
                                                src={option.image}
                                                alt={option.text}
                                                className="w-20 h-20 mb-4"
                                            />
                                        )}
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
