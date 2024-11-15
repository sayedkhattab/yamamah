<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AssessmentResult;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LevelAssessmentController extends Controller
{
    public function storeTemporaryResult(Request $request)
    {
        // زيادة الحد الأقصى لوقت التنفيذ لتجنب أخطاء انتهاء الوقت
        set_time_limit(300);

        // التحقق من صحة البيانات المدخلة
        $request->validate([
            'uuid' => 'required|string|uuid',
            'score' => 'required|integer|min:0',
            'percentage' => 'required|numeric|min:0|max:100',
            'level' => 'required|integer|min:1|max:3',
        ]);

        try {
            $existingResult = DB::table('temporary_results')
                ->where('uuid', $request->uuid)
                ->where('level', $request->level)
                ->first();

            if ($existingResult) {
                // تحديث النتيجة الموجودة
                DB::table('temporary_results')
                    ->where('uuid', $request->uuid)
                    ->where('level', $request->level)
                    ->update([
                        'score' => $request->score,
                        'percentage' => $request->percentage,
                        'updated_at' => now(),
                    ]);
            } else {
                // إدراج نتيجة جديدة
                DB::table('temporary_results')->insert([
                    'uuid' => $request->uuid,
                    'score' => $request->score,
                    'percentage' => $request->percentage,
                    'level' => $request->level,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            return response()->json(['message' => 'Result saved successfully.']);
        } catch (\Exception $e) {
            Log::error('Failed to save temporary result: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to save result.'], 500);
        }
    }

    public function getTemporaryResults(Request $request)
    {
        $request->validate([
            'uuid' => 'required|string|uuid',
        ]);

        // جلب النتائج لجميع المستويات المحفوظة بهذا الـ UUID
        $results = DB::table('temporary_results')
            ->where('uuid', $request->uuid)
            ->orderBy('level', 'asc')
            ->get();

        if ($results->isEmpty()) {
            return response()->json(['error' => 'No results found for the given UUID'], 404);
        }

        return response()->json($results);
    }

    public function saveFinalResult(Request $request)
    {
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'You need to login first.');
        }

        $request->validate([
            'uuid' => 'required|string|uuid',
        ]);

        $uuid = $request->input('uuid');

        if ($uuid) {
            $temporaryResults = DB::table('temporary_results')->where('uuid', $uuid)->get();

            if ($temporaryResults->isEmpty()) {
                return redirect()->route('dashboard')->with('error', 'No temporary results found.');
            }

            try {
                foreach ($temporaryResults as $temporaryResult) {
                    $result = new AssessmentResult();
                    $result->user_id = auth()->user()->id;
                    $result->score = $temporaryResult->score;
                    $result->percentage = $temporaryResult->percentage;
                    $result->level = $temporaryResult->level;
                    $result->save();
                }

                // حذف النتائج المؤقتة بعد حفظها بشكل نهائي
                DB::table('temporary_results')->where('uuid', $uuid)->delete();

                return redirect()->route('dashboard')->with('success', 'Your results have been saved successfully!');
            } catch (\Exception $e) {
                Log::error('Failed to save final result or delete temporary results: ' . $e->getMessage());
                return redirect()->route('dashboard')->with('error', 'Failed to save results. Please try again.');
            }
        }

        return redirect()->route('dashboard')->with('error', 'Invalid request.');
    }

    public function levelTwo()
    {
        return inertia('Assessment/LevelTwoAssessment');
    }

    public function levelThree()
    {
        return inertia('Assessment/LevelThreeAssessment');
    }
}
