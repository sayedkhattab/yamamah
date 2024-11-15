import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        uuid: null,
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const uuidParam = params.get('uuid');
        if (uuidParam) {
            setData('uuid', uuidParam);
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => {
                reset('password', 'password_confirmation');

                // إذا كان هناك UUID، قم بحفظ النتيجة النهائية
                if (data.uuid) {
                    axios.post(route('save-final-result'), { uuid: data.uuid })
                        .then(response => {
                            console.log('Result saved successfully.');
                        })
                        .catch(error => {
                            console.error('Error saving result:', error);
                        });
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="flex flex-col items-center justify-center bg-[#3853A3] text-white">
                {/* Form Card */}
                <div className="w-full max-w-4xl p-20 space-y-6 bg-[#657452] text-gray-900 rounded-lg shadow-md">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" className="text-white" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full px-4 py-3 rounded-md bg-white text-black"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2 text-white" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" className="text-white" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full px-4 py-3 rounded-md bg-white text-black"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2 text-white" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" className="text-white" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full px-4 py-3 rounded-md bg-white text-black"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2 text-white" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-white" />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full px-4 py-3 rounded-md bg-white text-black"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2 text-white" />
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <Link
                                href={route('login')}
                                className="text-sm text-[#F0A122] underline hover:text-white transition"
                            >
                                Already registered?
                            </Link>

                            <PrimaryButton className="ml-4 px-6 py-3 bg-[#8aac46] hover:bg-[#9E764F]" disabled={processing}>
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
