<?php

namespace App\Extensions\Inertia;

use Inertia\Inertia;

class InertiaWithThemes extends Inertia
{
    public static function render($component, $props = []): \Inertia\Response
    {
        return parent::render('Themes/'.env('APP_FRONTEND_THEME').'/'.$component, $props);
    }
}
