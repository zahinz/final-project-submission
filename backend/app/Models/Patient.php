<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Wildside\Userstamps\Userstamps;
use App\Models\WaitingList;

class Patient extends Model
{
    use HasFactory, Userstamps;

    protected $fillable = [
        'title',
        'name',
        'date_of_birth',
        'gender',
        'nric',
        'phone',
    ];

    /**
     * Join Patient and waiting
     */
    public function waiting(){
        return $this->hasMany(WaitingList::class);
    }
}
