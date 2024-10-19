<?php

namespace App\Traits;

use App\Models\Config;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;

trait HasHumanTimestamps
{
    public function humanCreatedAt(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->humanTimestamp($this->created_at)
        );
    }

    public function humanUpdatedAt(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->humanTimestamp($this->updated_at)
        );
    }

    public function shortHumanCreatedAt(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->shortHumanTimestamp($this->created_at)
        );
    }

    public function shortHumanUpdatedAt(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->shortHumanTimestamp($this->updated_at)
        );
    }

    private function humanTimestamp(string $timestamp): string
    {
        Carbon::setLocale(app()->getLocale());
        $d = Carbon::parse($timestamp);

        try {
            if ((bool) Config::getValue('show_time_only_if_date_is_today') && $d->isToday()) {
                return $d->isoFormat(Config::getValue('time_format'));
            }

            if ((bool) Config::getValue('show_day_and_time_only_if_date_is_this_week') && $d->isCurrentWeek()) {
                return $d->isoFormat('dddd, '.Config::getValue('time_format'));
            }

            return ucwords($d->isoFormat(Config::getValue('date_format').' '.Config::getValue('time_format')));
        } catch (\Exception $e) {
            return $d->isoFormat('dddd, MMMM D, YYYY h:mm A');
        }
    }

    private function shortHumanTimestamp(string $timestamp): string
    {
        Carbon::setLocale(app()->getLocale());
        $d = Carbon::parse($timestamp);
        $dateFormat = Config::getValue('date_format');
        $dateFormat = str_replace('dddd, ', '', $dateFormat);
        $dateFormat = str_replace('ddd, ', '', $dateFormat);

        return ucwords($d->isoFormat($dateFormat.' '.Config::getValue('time_format')));
    }
}
