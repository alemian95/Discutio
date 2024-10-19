<?php

namespace App\Models;

use App\Traits\HasHumanTimestamps;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, HasRoles, Notifiable, SoftDeletes, HasHumanTimestamps;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'human_created_at',
        // 'human_updated_at',
        'short_human_created_at',
        // 'short_human_updated_at',
        'is_banned'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isSuperadmin(): bool
    {
        return $this->hasRole('superadmin');
    }

    public function isAdmin(): bool
    {
        return $this->isSuperadmin() || $this->hasRole('admin');
    }

    public function isModerator(): bool
    {
        return $this->isAdmin() || $this->hasRole('moderator');
    }

    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class, 'author_id', 'id');
    }

    public function createBanInstance() : BanInstance {
        $ban = new BanInstance();
        $ban->user_id = $this->id;
        return $ban;
    }

    public function isBanned(): Attribute
    {
        $ban = $this->hasMany(BanInstance::class)->orderBy('created_at', 'desc')->first();
        return Attribute::make(
            get: fn () => (is_null($ban->until) || Carbon::now()->isBefore(Carbon::parse($ban->until))) && Carbon::now()->isAfter(Carbon::parse($ban->from)),
        );
    }
}
