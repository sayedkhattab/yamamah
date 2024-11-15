<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Assessment/StartAssessment');
    }
}
