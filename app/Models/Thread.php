<?php

namespace App\Models;

use App\Http\Requests\Thread\StoreThreadRequest;
use App\Traits\HasHumanTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Thread extends Model
{
    use HasFactory, HasHumanTimestamps, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'content'];

    protected $appends = ['human_created_at'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id', 'id');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }

    public static function createFromRequest(StoreThreadRequest $request): self
    {
        $thread = new Thread;
        $thread->fill($request->validated());

        $thread->category_id = Category::findByCode($request->category)->id;
        $thread->author_id = $request->user()->id;

        return $thread;
    }
}
