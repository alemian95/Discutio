<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::beginTransaction();
        try {

            $technology = new Category(['code' => 'technology', 'name' => 'Technology']);
            $business = new Category(['code' => 'business', 'name' => 'Business']);
            $hardware = new Category(['code' => 'hardware', 'name' => 'Hardware']);
            $software = new Category(['code' => 'software', 'name' => 'Software']);
            $entertainment = new Category(['code' => 'entertainment', 'name' => 'Entertainment']);
            $music = new Category(['code' => 'music', 'name' => 'Music']);
            $movies = new Category(['code' => 'movies', 'name' => 'Movies']);
            $games = new Category(['code' => 'games', 'name' => 'Games']);
            $sports = new Category(['code' => 'sports', 'name' => 'Sports']);
            $education = new Category(['code' => 'education', 'name' => 'Education']);
            $science = new Category(['code' => 'science', 'name' => 'Science']);

            $technology->save();
            $business->save();
            $entertainment->save();
            $sports->save();
            $education->save();

            $technology->children()->save($hardware);
            $technology->children()->save($software);

            $entertainment->children()->save($music);
            $entertainment->children()->save($movies);
            $entertainment->children()->save($games);

            $education->children()->save($science);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        DB::commit();
    }
}
