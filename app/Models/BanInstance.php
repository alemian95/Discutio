<?php

namespace App\Models;

use App\Traits\HasHumanTimestamps;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BanInstance extends Model
{
    use HasFactory, HasHumanTimestamps;

    protected $appends = [
        'human_banned_from',
        'human_banned_until',
        'human_created_at',
        'short_human_created_at',
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function humanBannedFrom(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->shortHumanTimestamp($this->from)
        );
    }

    public function humanBannedUntil(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->until ? $this->shortHumanTimestamp($this->until) : null
        );
    }

    public function withMessage(string $message) : self
    {
        $this->message = $message;
        return $this;
    }

    public function withDescription(string $description) : self
    {
        $this->description = $description;
        return $this;
    }

    public function from(Carbon | string $date) : self
    {
        if ($date instanceof Carbon) {
            $date = $date->format('Y-m-d H:i:s');
        }
        $this->from = $date;
        return $this;
    }

    public function until(Carbon | string $date): self
    {
        if ($date instanceof Carbon) {
            $date = $date->format('Y-m-d H:i:s');
        }
        $this->until = $date;
        return $this;
    }

}
