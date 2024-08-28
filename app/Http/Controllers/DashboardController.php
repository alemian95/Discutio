<?php

namespace App\Http\Controllers;

use App\Extensions\Inertia\InertiaWithThemes;
use App\Models\Category;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        $parentCategories = Category::whereNull('parent_id')->get();

        foreach ($parentCategories as $index => $category) {
            $parentCategories[$index]->threads_count = count($category->threadsWithSubcategories);
            $parentCategories[$index]->last_thread = $category->lastInsertedThread;
        }

        return InertiaWithThemes::renderTheme('Dashboard', [
            'categories' => $parentCategories,
            'canCreateThreads' => $request->user()->can('create', \App\Models\Thread::class),
        ]);
    }

    public function category(Request $request, string $code)
    {
        try {
            $category = Category::findByCodeOrFail($code);
        } catch (\Exception $e) {
            abort(404);
        }

        $path = $category->path;
        $categories = $category->children()->get();
        $threads = $category->threads;

        foreach ($categories as $index => $c) {
            $categories[$index]->threads_count = count($c->threadsWithSubcategories);
            $categories[$index]->last_thread = $c->lastInsertedThread;
        }

        dump($path);
        dump($categories);
        dump($threads);
        dump($category->parent);
    }
}
