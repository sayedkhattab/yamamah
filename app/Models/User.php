<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * الحقول القابلة للتعبئة (fillable)
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'level',
        'points',
    ];

    /**
     * إخفاء الحقول الحساسة عند التحويل إلى JSON
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
}
