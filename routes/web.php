<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\LevelAssessmentController;
use App\Http\Controllers\AssessmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user();
    $assessmentResults = \App\Models\AssessmentResult::where('user_id', $user->id)->get();

    return Inertia::render('Dashboard', [
        'assessmentResults' => $assessmentResults,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
Route::post('/save-final-result', [LevelAssessmentController::class, 'saveFinalResult'])->name('save-final-result');

Route::get('/level-assessment', [LevelAssessmentController::class, 'show'])->name('level-assessment');
Route::get('/assessment/start', [LevelAssessmentController::class, 'start'])->name('assessment.start');
Route::get('/start-assessment', [AssessmentController::class, 'index'])->name('start-assessment');
Route::get('/next-level', [LevelAssessmentController::class, 'nextLevel'])->name('next-level');
Route::get('/level-two', [LevelAssessmentController::class, 'levelTwo'])->name('level-two');
Route::get('/level-three', [LevelAssessmentController::class, 'levelThree'])->name('level-three');
Route::post('/save-result', [LevelAssessmentController::class, 'saveResult'])->name('save-result');
Route::get('/get-temporary-results', [LevelAssessmentController::class, 'getTemporaryResults']);
Route::post('/store-temporary-result', [LevelAssessmentController::class, 'storeTemporaryResult'])->name('store-temporary-result');

require __DIR__.'/auth.php';
