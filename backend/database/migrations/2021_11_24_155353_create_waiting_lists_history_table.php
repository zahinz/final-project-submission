<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWaitingListsHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('waiting_lists_history', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('status');
            // Foreign key
            $table->unsignedBigInteger('waiting_list_id');
            $table->foreign('waiting_list_id')->references('id')->on('waiting_lists');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('waiting_lists_history');
    }
}
