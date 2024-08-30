<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $fillable = ["title", "description", "status"];

    public static function format($data)
    {
        return array_map(function ($d) {
            $d["status"] = $d["status"] == "0" ? "inactive" : "active";
            return $d;
        }, $data);
    }
}
