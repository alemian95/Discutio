<?php

namespace App\Extensions\Cache;

use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CacheHelper
{

    public static function clearConfig()
    {
        Cache::forget('config_cache');
    }

    public static function clearDashboard()
    {
        Cache::forget('dashboard_data');
        $categories = Category::all();
        foreach ($categories as $category) {
            Cache::forget('category_data_' . $category->code);
        }
    }

    public static function clearAll()
    {
        self::clearConfig();
        self::clearDashboard();
    }
}
