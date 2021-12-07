<?php

namespace App\Http\Traits;

/**
 * 
 */
trait JsonTrait
{
    public function jsonSuccessResponse ($data, $message='', $code = 200) {
        return response()->json([
            'status' => ($code != 200) ? false : true,
            'code' => $code,
            'data' => $data,
            'message' => $message,
        ], $code);
    }
}
