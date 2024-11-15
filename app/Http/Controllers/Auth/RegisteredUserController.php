<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\AssessmentResult;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * عرض صفحة التسجيل.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * معالجة طلب التسجيل الجديد.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // التحقق من صحة البيانات المدخلة
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'uuid' => 'nullable|string|uuid',
        ]);
    
        // إنشاء المستخدم الجديد
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'student',
            'level' => 1,
            'points' => 0,
        ]);
    
        // إذا كان هناك UUID، نقل النتائج المؤقتة إلى assessment_results
        if ($request->uuid) {
            $temporaryResults = DB::table('temporary_results')
                ->where('uuid', $request->uuid)
                ->get();
    
            if (!$temporaryResults->isEmpty()) {
                foreach ($temporaryResults as $temporaryResult) {
                    AssessmentResult::create([
                        'user_id' => $user->id,
                        'score' => $temporaryResult->score,
                        'percentage' => $temporaryResult->percentage,
                        'level' => $temporaryResult->level,
                    ]);
                }
    
                // حذف النتائج المؤقتة بعد نقلها
                DB::table('temporary_results')->where('uuid', $request->uuid)->delete();
            }
        }
    
        // إرسال حدث التسجيل
        event(new Registered($user));
    
        // تسجيل الدخول للمستخدم الجديد
        Auth::login($user);
    
        return redirect()->route('dashboard')->with('success', 'تم تسجيل حسابك بنجاح وتم حفظ نتائج تقييمك!');
    }
    
}
