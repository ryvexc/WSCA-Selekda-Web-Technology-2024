<?php

namespace App\Http\Controllers;

use App\Http\Resources\GoogleBaseResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return GoogleBaseResource::data(200, $request->user());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validator = $request->validate([
            "name" => "required",
            "username" => "required",
            "email" => "required|email",
            "password" => "required",
            "dateOfBirth" => "required",
            "phoneNumber" => "required"
        ]);

        if (($user = $request->user())) {
            $user->update($validator);
            return GoogleBaseResource::success(200, "Your profile has been updated.");
        }

        return GoogleBaseResource::error(500, "User not found");
    }

    /**
     * User want to change profile picture
     */
    public function updateProfilePicture(Request $Request, string $id)
    {
        // $request->validate([
        //     "profilePicture" => "required"
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
