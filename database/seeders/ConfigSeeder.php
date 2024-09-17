<?php

namespace Database\Seeders;

use App\Models\Config;
use App\Models\ConfigOption;
use Illuminate\Database\Seeder;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $config_groups = [
            'text' => [
                'cut_breadcrumbs_text_after_n_characters' => ['integer', '20'],
                'cut_thread_preview_text_after_n_characters' => ['integer', '100'],
            ],
            'datetime' => [
                'time_format' => ['string', 'h:mm A'],
                'date_format' => ['string', 'dddd, MMMM D, YYYY'],
                'show_time_only_if_date_is_today' => ['boolean', false],
                'show_day_and_time_only_if_date_is_this_week' => ['boolean', false],
            ],
        ];

        foreach ($config_groups as $group => $configs) {
            foreach ($configs as $key => $value) {
                (new Config([
                    'group' => $group,
                    'key' => $key,
                    'type' => $value[0],
                    'value' => $value[1],
                ]))->save();
            }
        }

        $options = [

            ['datetime.time_format', 'hh:mm A'],
            ['datetime.time_format', 'h:mm A'],
            ['datetime.time_format', 'HH:mm'],
            ['datetime.time_format', 'H:mm'],

            ['datetime.date_format', 'dddd, MMMM D, YYYY'],
            ['datetime.date_format', 'dddd, D MMMM, YYYY'],
            ['datetime.date_format', 'ddd, MMM D, YYYY'],
            ['datetime.date_format', 'ddd, D MMM, YYYY'],
            ['datetime.date_format', 'D MMMM Y'],
            ['datetime.date_format', 'D MMM Y'],
            ['datetime.date_format', 'MMMM D Y'],
            ['datetime.date_format', 'MMM D Y'],
            ['datetime.date_format', 'DD/MM/Y'],
            ['datetime.date_format', 'MM/DD/Y'],
            ['datetime.date_format', 'D/M/Y'],
            ['datetime.date_format', 'M/D/Y'],

        ];

        foreach ($options as $option) {
            [$group, $key] = explode('.', $option[0]);
            $config = Config::where('group', $group)->where('key', $key)->first();
            $co = new ConfigOption;
            $co->config_id = $config->id;
            $co->value = $option[1];
            $co->save();
        }
    }
}
