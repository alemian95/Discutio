<?php

namespace App\Http\Controllers;

use App\Extensions\Inertia\InertiaWithThemes;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        $parentCategories = Category::whereNull('parent_id')->withCount('threads')->get();

        foreach ($parentCategories as &$category) {
            $category->threads_count = count($category->threadsWithSubcategories);
        }

        return InertiaWithThemes::renderTheme('Dashboard', [
            'categories' => $parentCategories,
            'canCreateThreads' => $request->user()->can('create', \App\Models\Thread::class),
        ]);
    }

    public function category(Request $request, string $code)
    {
        $category = Category::where('code', $code)->first();

        if (! $category) {
            abort(404);
        }

        return $category;
    }

    public function categoryChildren(Request $request, Category $category)
    {
        return $category->children;
    }
}
