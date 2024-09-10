<?php

namespace App\Listeners\User;

use App\Events\User\UserRegisteredEvent;
use App\Models\Event;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Spatie\Permission\Models\Role;

class UserRegisteredListener
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
    public function handle(UserRegisteredEvent $event): void
    {

        Event::create(Event::USER_REGISTERED)->dispatchedBy($event->user)->save();

        $role = Role::findByName('user');
        $event->user->assignRole($role);

        Event::create(Event::USER_ASSIGNED_ROLE)->dispatchedBy($event->user)->referencesTo($role)->save();

    }
}
