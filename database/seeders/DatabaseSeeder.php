<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $roles = [
            'superadmin' => Role::create(['name' => 'superadmin']),
            'admin' => Role::create(['name' => 'admin']),
            'moderator' => Role::create(['name' => 'moderator']),
            'user' => Role::create(['name' => 'user']),
        ];

        $user = User::factory()->create([
            'name' => env('SUPERADMIN_DEFAULT_NAME'),
            'email' => env('SUPERADMIN_DEFAULT_EMAIL'),
            'password' => Hash::make(env('SUPERADMIN_DEFAULT_PASSWORD')),
        ]);

        $user->assignRole($roles['superadmin']);

        // User::factory(10)->create();

        (new CategoriesSeeder)->run();
        (new ConfigSeeder)->run();

    }
}
