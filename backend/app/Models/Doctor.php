<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Wildside\Userstamps\Userstamps;

class Doctor extends Model
{
    use HasFactory, Userstamps;

    protected $fillable = [
        'mmc_registration_number',
        'graduated_from',
        'is_on_duty',
    ];
}
