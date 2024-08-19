<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['code', 'name'];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'id', 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id', 'id');
    }

    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class, 'category_id', 'id');
    }

    public function pathToParent(): array
    {
        $pointer = $this;
        $path = [];
        while ($pointer->parent) {
            $path[] = $pointer->parent;
            $pointer = $pointer->parent;
        }

        return array_reverse($path);
    }

    public static function getByCode(string $code): ?Category
    {
        return Category::where('code', 'technology')->first();
    }

    public static function getByCodeOrFail(string $code): Category
    {
        return Category::where('code', 'technology')->firstOrFail();
    }
}