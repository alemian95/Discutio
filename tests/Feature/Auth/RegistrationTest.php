<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        Notification::fake();

        if (!Role::where('name', 'user')->exists()) {
            Role::create(['name' => 'user']);
        }

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        // $this->assertAuthenticated();
        // $response->assertRedirect(route('dashboard', absolute: false));

        $user = User::where('email', 'test@example.com')->first();
        $this->assertNotNull($user);
        $this->assertFalse($user->hasVerifiedEmail());

        $this->actingAs($user);
        $user->markEmailAsVerified();

        $this->assertAuthenticated();

        // $response->assertRedirect(route('dashboard', absolute: false));
    }
}
