<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuthItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auth_item', function (Blueprint $table) {
            $table->string('name', 64)->primary();
            $table->smallInteger('type')->index('idx-auth_item-type');
            $table->text('description')->nullable();
            $table->string('rule_name', 64)->nullable();
            $table->binary('data')->nullable();
            $table->timestamps();
            
            $table->foreign('rule_name', 'fk_rule_name_item')->references('name')->on('auth_rule')->onDelete('set NULL')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auth_item');
    }
}
