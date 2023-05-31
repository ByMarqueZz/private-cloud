<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuthAssignmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auth_assignment', function (Blueprint $table) {
            $table->string('item_name', 64);
            $table->integer('user_id');
            $table->integer('created_at')->nullable();
            
            $table->primary(['item_name', 'user_id']);
            $table->foreign('item_name', 'fk_item_name')->references('name')->on('auth_item')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auth_assignment');
    }
}
