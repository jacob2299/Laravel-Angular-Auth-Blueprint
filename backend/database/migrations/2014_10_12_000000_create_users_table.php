<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password')->nullable();
            $table->string('api_token', 60)->nullable()->unique();
            $table->tinyInteger('verified')->default(0);
            $table->string('email_verification_token', 60)->nullable()->unique();
            $table->string('google_id')->nullable()->unique();
            $table->string('google_token')->nullable()->unique();
            $table->text('google2fa_secret')->nullable();
            $table->tinyInteger('google2fa_enabled')->default(0);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
