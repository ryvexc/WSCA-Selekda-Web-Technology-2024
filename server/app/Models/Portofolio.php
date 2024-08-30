<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portofolio extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ["title", "description", "image"];
    protected $hidden = ["created_at", "updated_at", "author_id"];
    protected $with = ["author"];

    public function author()
    {
        return $this->belongsTo(User::class);
    }
}
