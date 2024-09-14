<?php

namespace App\Providers;

use App\Models\Config;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;

class ConfigCacheProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Cache::rememberForever('config', function () {
            return Config::with('options')->get()->mapWithKeys( function ($config) {
                $options = $config->options->mapWithKeys(function ($option) {
                    return [ $option->id => $option->value ];
                });

                return [ $config->key => [
                    'group' => $config->group,
                    'type' => $config->type,
                    'value' => $config->value,
                    'options' => $options,
                ]];
            });
        });
    }
}
