<?php

namespace App\Http\Controllers;

use App\Extensions\Inertia\InertiaWithThemes;
use App\Http\Requests\Thread\StoreThreadRequest;
use App\Http\Requests\Thread\UpdateThreadRequest;
use App\Models\Answer;
use App\Models\Category;
use App\Models\Thread;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;

class ThreadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        if ($request->user()->cannot('create', Thread::class)) {
            abort(403);
        }

        $categories = Category::getPreOrderList();

        $category = null;

        try {
            if ($request->get('category')) {
                $category = Category::findByCodeOrFail($request->get('category'));
            }
        } catch (Exception $e) {
            abort(404);
        }

        $props = [
            'categories' => $categories,
        ];

        if ($category) {
            $props['category'] = $category->code;
            $props['breadcrumbs'] = $category->path;
        }

        return InertiaWithThemes::renderTheme('Thread/Form', $props);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreThreadRequest $request)
    {
        $thread = Thread::createFromRequest($request);

        $thread->save();

        return Redirect::route('threads.show', ['thread' => $thread]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Thread $thread)
    {
        $thread->author;
        $thread->human_created_at;

        return InertiaWithThemes::renderTheme('Thread/Show', [
            'thread' => $thread,
            'answers' => $thread->answers()->orderBy('created_at')->get(),
            'breadcrumbs' => array_reverse($thread->category->path),
            'canAnswerThread' => $request->user()->can('create', Answer::class),
            'canUpdateThread' => $request->user()->can('update', $thread),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Thread $thread)
    {
        Gate::authorize('update', $thread);

        $categories = Category::getPreOrderList();

        $thread->category;

        return InertiaWithThemes::renderTheme('Thread/Form', [
            'categories' => $categories,
            'thread' => $thread,
            'breadcrumbs' => array_reverse($thread->category->path),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThreadRequest $request, Thread $thread)
    {
        $thread->fill($request->validated());
        $thread->save();

        return Redirect::route('threads.show', ['thread' => $thread]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Thread $thread)
    {
        //
    }
}
