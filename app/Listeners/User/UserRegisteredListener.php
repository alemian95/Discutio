<?php

namespace App\Listeners\User;

use App\Events\User\UserRegisteredEvent;
use App\Models\Event;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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
        $event->user->assignRole('user');

        $e = new Event();
        $e->type = Event::USER_REGISTERED;
        $e->primary_entity_class = User::class;
        $e->primary_entity_id = $event->user->id;

        $e->save();
    }
}
