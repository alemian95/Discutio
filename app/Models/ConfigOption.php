<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConfigOption extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'config_id', 'value'
    ];

    public function config() : BelongsTo
    {
        return $this->belongsTo(Config::class);
    }
}
