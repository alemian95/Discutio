<?php

namespace App\Extensions\Inertia;

use Inertia\Inertia;

class InertiaWithThemes extends Inertia
{

    public static function renderTheme($component, $props = [])
    {
        return self::render('Themes/' . env('APP_FRONTEND_THEME') . '/' . $component, $props);
    }
}
