<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            "name" => "required",
            "username" => "required",
            "email" => "required|email",
            "password" => "required",
            "dateOfBirth" => "required|date",
            "phoneNumber" => "required",
            "profilePicture" => "required"
        ]);

        $profilePictureURL = Storage::put("/user", $request->file("profilePicture"));

        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = $request->password;
        $user->dateOfBirth = $request->dateOfBirth;
        $user->phoneNumber = $request->phoneNumber;
        $user->profilePicture = $profilePictureURL;

        return $user;
    }
}
