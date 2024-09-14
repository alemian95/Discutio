<?php

namespace Database\Seeders;

use App\Models\Config;
use Illuminate\Database\Seeder;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $config_groups = [
        //     'text_format' => [
        //         'cutBreadcrumbsTextAfterNCharacters' => [ 'integer', '20' ],
        //         'cutThreadPreviewTextAfterNCharacters' => [ 'integer', '100' ],
        //     ],
        //     'datetime_format' => [
        //         'defaultFunction' => [ 'string', 'toDayDateTimeString' ],
        //         'defaultFormat' => [ 'string', 'Y-m-d H:i:s' ],
        //         'showTimePassedByIfMoreThanOneDay' => [ 'boolean', false ],
        //         'showTimeOnlyIfDateIsToday' => [ 'boolean', false ],
        //         'showDayAndTimeOnlyIfDateIsLessThanAWeek' => [ 'boolean', false ],
        //     ]
        // ];

        // foreach ($config_groups as $group => $configs) {
        //     foreach ($configs as $key => $value) {
        //         (new Config([
        //             'group' => $group,
        //             'key' => $key,
        //             'type' => $value[0],
        //             'value' => $value[1]
        //         ]))->save();
        //     }
        // }
    }
}
