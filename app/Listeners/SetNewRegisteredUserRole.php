<?php

namespace App\Listeners;

use App\Events\NewRegisteredUser;

class SetNewRegisteredUserRole
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NewRegisteredUser $event): void
    {
        $event->user->assignRole('user');
    }
}
