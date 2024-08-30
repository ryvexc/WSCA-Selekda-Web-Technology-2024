<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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

    public static function success(int $code, string $message, $data)
    {
        return response()->json(
            static::format([
                "code" => $code,
                "message" => $message,
                ...$data
            ]),
            $code
        );
    }

    public static function data(int $code, $data)
    {
        return response()->json(
            static::format($data),
            $code
        );
    }

    public static function pagination(int $code, $class, $items)
    {
        $arrayed_items = $items->toArray();

        return response()->json(
            static::format([
                "updated" => Carbon::now(),
                "totalItems" => $class::all()->count(),
                "startIndex" => $arrayed_items["current_page"],
                "itemsPerPage" => $arrayed_items["per_page"],
                "items" => $arrayed_items["data"],
            ]),
            $code
        );
    }
}
