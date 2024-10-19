<?php

namespace App\Policies;

use App\Models\BanInstance;
use App\Models\User;

class BanInstancePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, BanInstance $banLog): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, BanInstance $banLog): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, BanInstance $banLog): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, BanInstance $banLog): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, BanInstance $banLog): bool
    {
        return $user->isAdmin();
    }
}
