<?php

namespace App\Http\Middleware;

use App\Models\Config;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class CacheConfigMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        Cache::remember('config_cache', 3600, function () {
            return Config::with('options')->get()->mapWithKeys(function ($config) {
                $options = $config->options->mapWithKeys(function ($option) {
                    return [$option->id => $option->value];
                });

                return [$config->key => [
                    'group' => $config->group,
                    'type' => $config->type,
                    'value' => $config->value,
                    'options' => $options,
                ]];
            });
        });

        return $next($request);
    }
}
