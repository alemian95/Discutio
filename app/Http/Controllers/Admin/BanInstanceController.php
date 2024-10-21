<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BanInstance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BanInstanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(User $user, Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(User $user, Request $request)
    {
        $validated = $request->validate([
            'from_now' => 'nullable|boolean',
            'until_forever' => 'nullable|boolean',
            'from_date' => Rule::requiredIf($request->get('from_now') === false),
            'until_date' => Rule::requiredIf($request->get('until_forever') === false),
            'message' => 'required|string',
            'description' => 'nullable|string'
        ]);

        $ban = new BanInstance();
        $ban->user_id = $user->id;
        $ban->message = $validated['message'];
        $ban->description = $validated['description'] ?? null;
        $ban->from = $validated['from_now'] ? Carbon::now()->format("Y-m-d H:i:s") : Carbon::parse($validated['from_date'])->format("Y-m-d H:i:s");
        $ban->until = $validated['until_forever'] ? null : Carbon::parse($validated['until_date'])->format("Y-m-d H:i:s");
        $ban->save();

        // return response()->noContent();
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user, BanInstance $banLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user, BanInstance $banLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(User $user, Request $request, BanInstance $banLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, BanInstance $banLog)
    {
        //
    }
}
