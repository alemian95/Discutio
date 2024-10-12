<?php

namespace App\Helpers;

use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CacheHelper
{
    public static function clearConfig()
    {
        Cache::forget('config_cache');
        Cache::forget('text_config');
        Cache::forget('datetime_config');
    }

    public static function clearDashboard()
    {
        Cache::forget('dashboard_data');
    }

    public static function clearCategory(Category $category)
    {
        Cache::forget('category_data_'.$category->code);
    }

    public static function clearAll()
    {
        self::clearConfig();
        self::clearDashboard();
        foreach (Category::all() as $category) {
            Cache::forget('category_data_'.$category->code);
        }
    }
}
