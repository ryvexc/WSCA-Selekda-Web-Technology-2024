<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BannerResource;
use App\Http\Resources\GoogleBaseResource;
use App\Models\Banner;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->isAdmin == 0) {
            return GoogleBaseResource::error(403, "Forbidden.");
        }

        // getting perpage items or default will be set.
        $perPage = isset($request->perPage) ? $request->perPage : 10;

        return GoogleBaseResource::pagination(200, Banner::class, Banner::paginate($perPage));
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
        if ($request->user()->isAdmin == 0) {
            return GoogleBaseResource::error(403, "Forbidden.");
        }

        $request->validate([
            "title" => "required",
            "image" => "required",
            "description" => "required",
            "status" => "required",
        ]);

        $image_url = Storage::put("public/banner", $request->file("image"));

        $banner = new Banner();
        $banner->title = $request->title;
        $banner->image = $image_url;
        $banner->description = $request->description;
        $banner->status = $request->status;
        $banner->date = Carbon::now();
        $banner->save();

        return GoogleBaseResource::success(200, "Your banner has been created.", ["item" => $banner]);
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
    public function update(Request $request, string $id)
    {
        if ($request->user()->isAdmin == 0) {
            return GoogleBaseResource::error(403, "Forbidden.");
        }

        $validator = $request->validate([
            "title" => "required",
            "description" => "required",
            "status" => "required"
        ]);

        Banner::find($id)->update($validator);

        return GoogleBaseResource::success(200, "Your banner has been successfully updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (($banner = Banner::find($id))) {
            $banner->delete();

            return GoogleBaseResource::success(200, "Your banner has been deleted.");
        }

        return GoogleBaseResource::error(404, "Banner not found");
    }
}
