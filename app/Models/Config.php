<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

class Config extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'group', 'key', 'type', 'value',
    ];

    public function options(): HasMany
    {
        return $this->hasMany(ConfigOption::class);
    }

    public static function getValue(string $key)
    {
        $config = Cache::get('config_cache')->toArray();

        return $config[$key]['value'] ?? throw new Exception('Invalid config value requested');
    }
}
