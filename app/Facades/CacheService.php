<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void clearConfig()
 * @method static void clearDashboard()
 * @method static void clearCategory(Category $category)
 * @method static void clearAll()
 */
class CacheService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'cache_service';
    }
}
