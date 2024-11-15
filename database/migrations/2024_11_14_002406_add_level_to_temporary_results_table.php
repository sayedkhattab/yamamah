<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::table('temporary_results', function (Blueprint $table) {
        $table->integer('level')->after('percentage'); // إضافة العمود 'level' بعد عمود 'percentage'
    });
}

public function down()
{
    Schema::table('temporary_results', function (Blueprint $table) {
        $table->dropColumn('level'); // إزالة العمود 'level' إذا تم الرجوع إلى الخلف
    });
}

};
