<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GoogleBaseResource
{
    public static function format($data)
    {
        return [
            "apiVersion" => "1.0",
            "data" => $data
        ];
    }

    public static function error(int $code, string $message)
    {
        return response()->json(
            static::format([
                "code" => $code,
                "message" => $message
            ]),
            $code
        );
    }

    public static function success(int $code, string $message)
    {
        return response()->json(
            static::format([
                "code" => $code,
                "message" => $message
            ]),
            $code
        );
    }
}
