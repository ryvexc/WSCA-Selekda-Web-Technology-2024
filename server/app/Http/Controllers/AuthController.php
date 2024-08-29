<?php

namespace App\Http\Controllers;

use App\Http\Resources\GoogleBaseResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
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

        $profilePictureURL = Storage::put("public/user", $request->file("profilePicture"));

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $request->username;
        $user->password = $request->password;
        $user->dateOfBirth = $request->dateOfBirth;
        $user->phoneNumber = $request->phoneNumber;
        $user->profilePicture = str_replace("public/", "", $profilePictureURL);
        $user->isActive = 0;
        $user->isAdmin = 0;
        $user->save();

        return new GoogleBaseResource([$user]);
    }
}
