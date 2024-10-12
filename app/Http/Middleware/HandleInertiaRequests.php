<?php

namespace App\Http\Middleware;

use App\Models\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'canViewAdmin' => $request->user()?->isAdmin() ?? false,
                'canViewConfigs' => $request->user()?->can('viewAny', Config::class) ?? false,
            ],
            'config' => [
                'text' => Cache::rememberForever('text_config', fn () => Config::where('group', 'text')->get()->pluck('value', 'key')->toArray()),
                'datetime' => Cache::rememberForever('datetime_config', fn () => Config::where('group', 'datetime')->get()->pluck('value', 'key')->toArray()),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
