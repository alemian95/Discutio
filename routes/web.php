<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\Api\ThreadController as ApiThreadController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ThreadController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('Themes/'.env('APP_FRONTEND_THEME').'/Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);

    return redirect()->route('dashboard');
});

// dashboard routes
Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
Route::get('/dashboard/{code}', [DashboardController::class, 'category'])->name('dashboard.category');

Route::get('/search', [SearchController::class,'search'])->name('search');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('categories', CategoryController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
Route::resource('threads', ThreadController::class)->only(['create', 'store', 'edit', 'update', 'show']);
Route::resource('threads/{thread}/answers', AnswerController::class)->only(['store', 'update']);

Route::resource('configs', ConfigController::class)->only(['index']);
Route::post('configs/update', [ConfigController::class, 'updateAll'])->name('configs.update.all');


Route::name('admin.')->prefix('admin')->group(function () {
    Route::resource('users', UserController::class);
});


Route::name('api.')->prefix('api')->group(function () {
    Route::resource('api/threads', ApiThreadController::class);
});

require __DIR__.'/auth.php';
