<?php

namespace App\Http\Controllers;

use App\Http\Requests\Thread\StoreThreadRequest;
use App\Http\Requests\Thread\UpdateThreadRequest;
use App\Models\Thread;
use App\Extensions\Inertia\InertiaWithThemes;
use App\Models\Category;

class ThreadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Thread::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        // $categories = Category::getCategoryTree();
        $categories = Category::getPreOrderList();

        return InertiaWithThemes::renderTheme('Thread/Form', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreThreadRequest $request)
    {
        $thread = new Thread;
        $thread->fill($request->validated());
        $thread->save();

        return response()->noContent();
    }

    /**
     * Display the specified resource.
     */
    public function show(Thread $thread)
    {
        return $thread;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Thread $thread)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThreadRequest $request, Thread $thread)
    {
        $thread->fill($request->validated());
        $thread->save();

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Thread $thread)
    {
        $thread->delete();

        return response()->noContent();
    }
}
