<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->integer('id')->primary();
            $table->string('slug')->unique('slug');
            $table->string('username')->unique('username');
            $table->string('auth_key', 32);
            $table->string('password_hash');
            $table->string('password_reset_token')->nullable()->unique('password_reset_token');
            $table->string('access_token')->nullable()->unique('access_token');
            $table->string('email')->nullable()->unique('email');
            $table->string('avatar')->nullable()->unique('avatar');
            $table->smallInteger('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
}
