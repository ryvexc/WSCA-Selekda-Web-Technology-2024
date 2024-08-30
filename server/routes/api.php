<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix("v1")->group(function () {
    Route::prefix("auth")->group(function () {
        Route::post("register", [AuthController::class, "register"]);
        Route::post("login", [AuthController::class, "login"]);
    });

    // Route::resource("user", UserController::class);
    Route::get("user", [UserController::class, "index"])->middleware("auth:sanctum");
    Route::put("user", [UserController::class, "update"])->middleware("auth:sanctum");

    Route::prefix("admin")->middleware("auth:sanctum")->group(function () {
        Route::resource("blog", Admin\BlogController::class);
        Route::resource("banner", Admin\BannerController::class);
        Route::resource("portofolio", Admin\PortofolioController::class);
    });
});
