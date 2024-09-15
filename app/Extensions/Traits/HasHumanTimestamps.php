<?php

namespace App\Extensions\Traits;

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

    private function humanTimestamp(string $timestamp): string
    {
        Carbon::setLocale(app()->getLocale());
        $d = Carbon::parse($timestamp);

        if ((bool) Config::getValue('show_time_only_if_date_is_today') && $d->isToday()) {
            return $d->isoFormat(Config::getValue('time_format'));
        }

        return ucwords($d->isoFormat(Config::getValue('date_format') . ' ' . Config::getValue('time_format')));
    }
}
