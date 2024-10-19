<?php

namespace Tests\Feature\Thread;

use App\Models\Thread;
use App\Models\User;
use Tests\TestCase;

class ThreadTest extends TestCase
{
    /**
     * Test that any user can view the dashboard
     */
    public function test_any_user_can_view_dashboard(): void
    {
        $response = $this->get('/dashboard');

        $response->assertStatus(200);
    }

    /**
     * Test that an unverified user cannot create thread, must trigger 403 response
     */
    public function test_unverified_user_cannot_create_thread(): void
    {
        $user = User::factory()->unverified()->create();

        $response = $this->actingAs($user)->get('/threads/create');
        $response->assertStatus(403);

        $post = $this->actingAs($user)->post('/threads', Thread::factory()->make()->toArray());
        $post->assertStatus(403);
    }

    /**
     * Test that a verified user can create thread
     */
    public function test_verified_user_can_create_thread(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/threads/create');
        $response->assertStatus(200);

        $post = $this->actingAs($user)->post('/threads', Thread::factory()->make()->toArray());
        $post->assertRedirect();
    }
}
