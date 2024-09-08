<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    public const USER_REGISTERED = 'user_registered';
    public const USER_LOGGED = 'user_logged';
    public const USER_UPDATED = 'user_updated';
    public const USER_DELETED = 'user_deleted';
    public const USER_PASSWORD_CHANGED = 'user_password_changed';

    public const THREAD_CREATED = 'thread_created';
    public const THREAD_UPDATED = 'thread_updated';
    public const THREAD_DELETED = 'thread_deleted';

    public const ANSWER_CREATED = 'answer_created';
    public const ANSWER_UPDATED = 'answer_updated';
    public const ANSWER_DELETED = 'answer_deleted';
}
