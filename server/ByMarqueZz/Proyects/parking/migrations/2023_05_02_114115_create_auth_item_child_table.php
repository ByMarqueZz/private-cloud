<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuthItemChildTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auth_item_child', function (Blueprint $table) {
            $table->string('parent', 64);
            $table->string('child', 64);
            
            $table->primary(['parent', 'child']);
            $table->foreign('child', 'fk_child_item_child')->references('name')->on('auth_item')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('parent', 'fk_parent_item_child')->references('name')->on('auth_item')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auth_item_child');
    }
}
