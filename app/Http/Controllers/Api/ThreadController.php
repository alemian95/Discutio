<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Thread\StoreThreadRequest;
use App\Http\Requests\Thread\UpdateThreadRequest;
use App\Models\Category;
use App\Models\Thread;

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
     * Store a newly created resource in storage.
     */
    public function store(StoreThreadRequest $request)
    {
        $thread = new Thread();
        $thread->fill($request->validated());

        $thread->category_id = Category::getByCode($request->category)->id;
        $thread->author_id = $request->user()->id;

        $thread->save();
        return $thread;
    }

    /**
     * Display the specified resource.
     */
    public function show(Thread $thread)
    {
        return $thread;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThreadRequest $request, Thread $thread)
    {
        $thread->fill($request->validated());
        $thread->save();
        return $thread;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Thread $thread)
    {
        $thread->delete();
    }
}
