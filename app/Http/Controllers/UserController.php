<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // تحقق من صحة البيانات المدخلة
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // إنشاء مستخدم جديد وتخزينه في قاعدة البيانات
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']), // تشفير كلمة المرور
            'role' => 'student', // تحديد الدور كطالب
            'level' => 1, // تحديد المستوى الافتراضي
            'points' => 0, // تحديد النقاط الافتراضية
        ]);

        // إعادة استجابة JSON للمستخدم الجديد
        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }
}
