<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\GoogleBaseResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->isAdmin == 0) {
            return GoogleBaseResource::error(403, "Forbidden.");
        }

        // getting perpage items or default will be set.
        $perPage = isset($request->perPage) ? $request->perPage : 10;

        return GoogleBaseResource::pagination(200, User::class, User::paginate($perPage)->through(
            fn($entity) =>
            $entity
                ->makeVisible('password')
        ));
    }
}
