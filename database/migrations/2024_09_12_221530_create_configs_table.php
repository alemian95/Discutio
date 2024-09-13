<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('configs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();
            $table->string('group');
            $table->string('key')->unique();
            $table->string('type');
        });

        Schema::create('config_options', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();
            $table->foreignIdFor('configs', 'config_id');
            $table->longText('value')->nullable();
        });

        Schema::create('config_values', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();
            $table->foreignIdFor('configs', 'config_id');
            $table->foreignIdFor('config_options', 'option_id')->nullable();
            $table->longText('value')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configs');
        Schema::dropIfExists('config_options');
        Schema::dropIfExists('config_values');
    }
};
