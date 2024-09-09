<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    public const USER_REGISTERED = 'user.registered';
    public const USER_LOGGED = 'user.logged';
    public const USER_UPDATED = 'user.updated';
    public const USER_DELETED = 'user.deleted';
    public const USER_PASSWORD_CHANGED = 'user.password_changed';

    public const THREAD_CREATED = 'thread.created';
    public const THREAD_UPDATED = 'thread.updated';
    public const THREAD_DELETED = 'thread.deleted';

    public const ANSWER_CREATED = 'answer.created';
    public const ANSWER_UPDATED = 'answer.updated';
    public const ANSWER_DELETED = 'answer.deleted';
}
