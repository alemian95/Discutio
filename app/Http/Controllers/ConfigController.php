<?php

namespace App\Http\Controllers;

use App\Extensions\Cache\CacheHelper;
use App\Extensions\Inertia\InertiaWithThemes;
use App\Http\Requests\Config\StoreConfigRequest;
use App\Http\Requests\Config\UpdateConfigRequest;
use App\Models\Config;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Config::class);

        $configs = Config::orderBy('key')->orderBy('group')->with('options')->get()->map(function ($config) {
            if ($config->group == "datetime") {
                Carbon::setLocale(app()->getLocale());
                $config->valueLabel = Carbon::now()->isoFormat($config->value);
                $config->options->map(function ($option) {
                    $option->valueLabel = Carbon::now()->isoFormat($option->value);
                });
            }
            $config->keyLabel = __('config.'. $config->group .'.'. $config->key);
            return $config;
        });

        return InertiaWithThemes::renderTheme('Configs/Index', [
            'configs' => $configs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConfigRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Config $config)
    {
        //
    }

    public function updateAll(Request $request) {

        Gate::authorize('viewAny', Config::class);

        CacheHelper::clearConfig();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Config $config)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConfigRequest $request, Config $config)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Config $config)
    {
        //
    }
}
