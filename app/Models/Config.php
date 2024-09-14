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

    protected static $cache = null;

    public function options(): HasMany
    {
        return $this->hasMany(ConfigOption::class);
    }

    public static function getValue(string $key)
    {
        if (self::$cache === null) {
            self::$cache = Cache::get('config_cache')->toArray();
        }

        return self::$cache[$key]['value'] ?? throw new Exception('Invalid config value requested');
    }
}
