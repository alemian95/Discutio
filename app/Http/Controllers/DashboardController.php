<?php

namespace App\Http\Controllers;

use App\Extensions\Inertia\InertiaWithThemes;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {

        $cacheKey = 'dashboard_data';
        $data = Cache::remember($cacheKey, config('cache.lifetime.dashboard'), function () {
            $parentCategories = Category::whereNull('parent_id')->withCount('children')->get();

            foreach ($parentCategories as $index => $category) {
                $parentCategories[$index]->threads_count = count($category->threadsWithSubcategories);
                $parentCategories[$index]->last_thread = $category->threadsWithSubcategories->get(0);
            }

            return [
                'categories' => $parentCategories,
            ];
        });

        $data['canCreateThreads'] = $request->user() && $request->user()->can('create', \App\Models\Thread::class);

        return InertiaWithThemes::render('Dashboard', $data);
    }

    public function category(Request $request, string $code)
    {
        try {
            $category = Category::findByCodeOrFail($code);
        } catch (\Exception $e) {
            abort(404, $e->getMessage());
        }

        $cacheKey = 'category_data_'.$code;

        $data = Cache::remember($cacheKey, config('cache.lifetime.dashboard'), function () use ($category) {
            $path = $category->path;
            $categories = $category->children()->withCount('children')->get();
            $threads = $category->threads()->with('author')->withCount('answers')->get();

            foreach ($categories as $index => $c) {
                $categories[$index]->threads_count = count($c->threadsWithSubcategories);
                $categories[$index]->last_thread = $c->lastInsertedThread;
            }

            return [
                'categories' => $categories,
                'threads' => $threads,
                'category' => $category,
                'breadcrumbs' => array_reverse($path),
            ];
        });

        $data['canCreateThreads'] = $request->user() && $request->user()->can('create', \App\Models\Thread::class);

        return InertiaWithThemes::render('Dashboard', $data);
    }
}
