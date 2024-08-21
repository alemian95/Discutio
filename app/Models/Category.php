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

    public static function getCategoryTree()
    {
        // Carica tutte le categorie
        $categories = Category::whereNull('parent_id')->with('children')->get();

        // Costruisce l'albero partendo dalle categorie senza parent
        return self::buildTree($categories);
    }

    // Funzione ricorsiva per costruire l'albero delle categorie
    private static function buildTree($categories, $parentId = null)
    {
        $branch = [];

        foreach ($categories as $category) {
            if ($category->parent_id == $parentId) {
                $category->children = self::buildTree($categories, $category->id);
                $branch[] = $category;
            }
        }

        return $branch;
    }
}
