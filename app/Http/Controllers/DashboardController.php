<?php

namespace App\Http\Controllers;

use App\Extensions\Inertia\InertiaWithThemes;
use App\Models\Category;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        $parentCategories = Category::whereNull('parent_id')->withCount('children')->get();

        foreach ($parentCategories as $index => $category) {
            $parentCategories[$index]->threads_count = count($category->threadsWithSubcategories);
            $parentCategories[$index]->last_thread = $category->threadsWithSubcategories->get(0);
        }

        return InertiaWithThemes::renderTheme('Dashboard', [
            'categories' => $parentCategories,
            'canCreateThreads' => $request->user() && $request->user()->can('create', \App\Models\Thread::class),
        ]);
    }

    public function category(Request $request, string $code)
    {
        try {
            $category = Category::findByCodeOrFail($code);
        } catch (\Exception $e) {
            abort(404, $e->getMessage());
        }

        $path = $category->path;
        $categories = $category->children()->withCount('children')->get();
        $threads = $category->threads()->with('author')->withCount('answers')->get();

        foreach ($categories as $index => $c) {
            $categories[$index]->threads_count = count($c->threadsWithSubcategories);
            $categories[$index]->last_thread = $c->lastInsertedThread;
        }

        return InertiaWithThemes::renderTheme('Dashboard', [
            'categories' => $categories,
            'threads' => $threads,
            'category' => $category,
            'breadcrumbs' => array_reverse($path),
            'canCreateThreads' => $request->user() && $request->user()->can('create', \App\Models\Thread::class),
        ]);
    }
}
