import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function LevelThreeAssessment() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [uuid, setUuid] = useState(null);
    const [totalScore, setTotalScore] = useState(0);
    const [finalPercentage, setFinalPercentage] = useState(0);

    // الأسئلة للمستوى الثالث
    const questions = [
        {
            question: "أين يقع برج إيفل؟",
            options: [
                { id: 1, text: 'في نيويورك', correct: false },
                { id: 2, text: 'في باريس', correct: true },
                { id: 3, text: 'في لندن', correct: false },
            ],
        },
        {
            question: "ما هي عاصمة اليابان؟",
            options: [
                { id: 1, text: 'طوكيو', correct: true },
                { id: 2, text: 'سيول', correct: false },
                { id: 3, text: 'بكين', correct: false },
            ],
        },
        {
            question: "أي من هذه العبارات تعني 'أنا جائع'؟",
            options: [
                { id: 1, text: 'أنا سعيد', correct: false },
                { id: 2, text: 'أنا جائع', correct: true },
                { id: 3, text: 'أنا متعب', correct: false },
            ],
        },
        {
            question: "ما هو لون السماء في يوم مشمس؟",
            options: [
                { id: 1, text: 'أزرق', correct: true },
                { id: 2, text: 'أصفر', correct: false },
                { id: 3, text: 'أخضر', correct: false },
            ],
        },
        {
            question: "ماذا تفعل عندما تكون عطشان؟",
            options: [
                { id: 1, text: 'أقرأ كتاب', correct: false },
                { id: 2, text: 'أشرب ماء', correct: true },
                { id: 3, text: 'أنام', correct: false },
            ],
        },
        {
            question: "ما هو الحيوان الذي يموء؟",
            options: [
                { id: 1, text: 'الكلب', correct: false },
                { id: 2, text: 'القط', correct: true },
                { id: 3, text: 'البقرة', correct: false },
            ],
        },
        {
            question: "ماذا يجب أن تفعل قبل عبور الطريق؟",
            options: [
                { id: 1, text: 'أنظر يمينًا ويسارًا', correct: true },
                { id: 2, text: 'أركض بأسرع ما يمكن', correct: false },
                { id: 3, text: 'أتجاهل السيارات', correct: false },
            ],
        },
        {
            question: "ما هو الحيوان الذي يعيش في الماء؟",
            options: [
                { id: 1, text: 'الدلفين', correct: true },
                { id: 2, text: 'القطة', correct: false },
                { id: 3, text: 'الأسد', correct: false },
            ],
        },
        {
            question: "ما هو أكبر كوكب في النظام الشمسي؟",
            options: [
                { id: 1, text: 'المريخ', correct: false },
                { id: 2, text: 'المشتري', correct: true },
                { id: 3, text: 'الأرض', correct: false },
            ],
        },
        {
            question: "ما هو الطعام الذي نحصل عليه من النحل؟",
            options: [
                { id: 1, text: 'اللبن', correct: false },
                { id: 2, text: 'العسل', correct: true },
                { id: 3, text: 'البيض', correct: false },
            ],
        },
    ];

    useEffect(() => {
        if (!uuid) {
            const storedUuid = new URLSearchParams(window.location.search).get('uuid');
            if (storedUuid) {
                setUuid(storedUuid);
                axios.get(`/get-temporary-results?uuid=${storedUuid}`)
                    .then(response => {
                        const previousResults = response.data;
                        const accumulatedScore = previousResults.reduce((acc, result) => acc + result.score, 0);
                        setTotalScore(accumulatedScore);
                    })
                    .catch(error => {
                        console.error('Error fetching previous results:', error);
                    });
            }
        }
    }, [uuid]);

    useEffect(() => {
        if (showScore && uuid) {
            // حفظ النتيجة للمستوى الثالث فقط
            axios.post('/store-temporary-result', {
                uuid: uuid,
                score: score,
                percentage: ((score / questions.length) * 100).toFixed(2),
                level: 3,
            })
            .then(() => {
                // جمع الدرجات من جميع المستويات
                axios.get(`/get-temporary-results?uuid=${uuid}`)
                    .then(response => {
                        const allResults = response.data;
                        const finalScore = allResults.reduce((acc, result) => acc + result.score, 0);
                        const totalQuestions = questions.length * 3; // حساب إجمالي الأسئلة لجميع المستويات
                        const percentage = ((finalScore / totalQuestions) * 100).toFixed(2);
                        setTotalScore(finalScore);
                        setFinalPercentage(percentage);
                    })
                    .catch(error => {
                        console.error('Error fetching all results:', error);
                    });
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
            <Head title="Level Three Assessment" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#3853A3] text-gray-50">
                {showScore ? (
                    <div className="bg-white text-black rounded-lg shadow-lg p-12 w-full max-w-lg text-center">
                        <h2 className="text-4xl font-bold mb-6">Assessment Completed</h2>
                        <p className="text-lg mb-4 font-semibold">
                            You scored {totalScore} out of {questions.length * 3} ({finalPercentage}%).
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="bg-green-600 text-white px-8 py-4 rounded-md hover:bg-green-700 transition text-lg font-semibold"
                                onClick={() => window.location.href = '/dashboard'}
                            >
                                Finish
                            </button>
                            {uuid && (
                                <a
                                    href={`/register?uuid=${uuid}`}
                                    className="bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition text-lg font-semibold"
                                >
                                    Register Now
                                </a>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-4xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-center">Level Three Assessment Test</h2>
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
