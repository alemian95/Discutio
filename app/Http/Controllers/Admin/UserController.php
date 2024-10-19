<?php

namespace App\Http\Controllers\Admin;

use App\Extensions\Inertia\InertiaWithThemes;
use App\Http\Controllers\Controller;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    public function __construct()
    {
        Gate::authorize('viewAny', User::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dump(User::find(1)->human_banned_until);
        // dump(User::find(9)->human_banned_until);
        // die;

        foreach (User::all() as $user){
            dump($user->id, $user->human_banned_until);
        }
        return InertiaWithThemes::render('Admin/Users/Index', [
            'users' => User::with('threads', 'roles')->get()
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
