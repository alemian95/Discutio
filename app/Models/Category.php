<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['code', 'name'];

    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id', 'id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id', 'id');
    }

    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class, 'category_id', 'id');
    }

    public function lastInsertedThread(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->threads()->orderBy('created_at', 'desc')->first()
        );
    }

    public function threadsWithSubcategories(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getThreadsWithSubcategories($this)
        );
    }

    private function getThreadsWithSubcategories($category)
    {
        $categoryIds = $this->getAllSubCategoryIds($category);

        return Thread::whereIn('category_id', $categoryIds)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    private function getAllSubCategoryIds($category)
    {
        $categoryIds = [$category->id];

        foreach ($category->children as $childCategory) {
            $categoryIds = array_merge($categoryIds, $this->getAllSubCategoryIds($childCategory));
        }

        return $categoryIds;
    }

    public function path(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->pathToParent(),
        );
    }

    public function pathToParent(): array
    {
        return Cache::rememberForever('category_path_'.$this->code, function () {
            $pointer = $this;
            $path = [];

            while ($pointer != null) {
                $path[] = $pointer;
                $pointer = $pointer->parent;
            }

            return $path;
        });
    }

    public function depth(): Attribute
    {
        return Attribute::make(
            get: fn () => count($this->pathToParent()) + 1,
        );
    }

    public static function findByCode(string $code): ?Category
    {
        return Category::where('code', $code)->first();
    }

    public static function findByCodeOrFail(string $code): Category
    {
        return Category::where('code', $code)->firstOrFail();
    }

    public static function categoryTree()
    {
        $categories = Category::whereNull('parent_id')->with('children')->get();

        return self::buildTree($categories);
    }

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

    public static function getPreOrderList()
    {
        return Cache::rememberForever('categories_preorder', function () {
            $categories = Category::whereNull('parent_id')->with('children')->get()->keyBy('id');
            $ordered = [];
            foreach ($categories as $category) {
                if ($category->parent_id === null) {
                    self::preorderTraversal($category, $ordered);
                }
            }

            return $ordered;
        });
    }

    private static function preorderTraversal($category, &$ordered)
    {
        $ordered[] = $category;

        foreach ($category->children as $child) {
            self::preorderTraversal($child, $ordered);
        }
    }
}
