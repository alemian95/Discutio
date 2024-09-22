<?php

namespace App\Http\Controllers;

use App\Facades\CacheService;
use App\Http\Requests\Answer\StoreAnswerRequest;
use App\Http\Requests\Answer\UpdateAnswerRequest;
use App\Models\Answer;
use App\Models\Thread;

class AnswerController extends Controller
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnswerRequest $request, Thread $thread)
    {
        $answer = new Answer;
        $answer->content = $request->content;
        $answer->thread_id = $thread->id;
        $answer->author_id = $request->user()->id;
        $answer->save();

        CacheService::clearCategory($thread->category);
    }

    /**
     * Display the specified resource.
     */
    public function show(Answer $answer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Answer $answer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnswerRequest $request, Thread $thread, Answer $answer)
    {
        $answer->content = $request->content;
        $answer->save();

        CacheService::clearCategory($thread->category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Answer $answer)
    {
        //
    }
}
