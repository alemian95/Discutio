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
    use HasFactory, HasHumanTimestamps, HasRoles, Notifiable, SoftDeletes;

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
        'last_ban_instance',
        'is_banned',
        'banned_until',
        'human_banned_until',
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

    public function createBanInstance(): BanInstance
    {
        $ban = new BanInstance;
        $ban->user_id = $this->id;

        return $ban;
    }

    public function lastBanInstance(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->hasMany(BanInstance::class)->orderBy('created_at', 'desc')->first()
        )->shouldCache();
    }

    public function isBanned(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->last_ban_instance ?
                (is_null($this->last_ban_instance->until) || Carbon::now()->isBefore(Carbon::parse($this->last_ban_instance->until)))
                &&
                Carbon::now()->isAfter(Carbon::parse($this->last_ban_instance->from))
                :
                false,
        )->shouldCache();
    }

    public function bannedUntil(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->last_ban_instance ? $this->last_ban_instance->until : null
        )->shouldCache();
    }

    public function humanBannedUntil(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->banned_until ? $this->shortHumanTimestamp($this->banned_until) : null,
        )->shouldCache();
    }
}
