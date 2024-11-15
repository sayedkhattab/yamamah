<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('temporary_results', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique(); // معرّف فريد للزائر
            $table->integer('score'); // النتيجة
            $table->decimal('percentage', 5, 2); // النسبة المئوية
            $table->timestamps(); // created_at و updated_at
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temporary_results');
    }
};
