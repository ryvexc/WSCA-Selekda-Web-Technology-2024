<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Http\Resources\GoogleBaseResource;
use App\Models\Blog;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
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

        return GoogleBaseResource::pagination(200, Blog::class, Blog::paginate($perPage));
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
            "image" => "required",
            "title" => "required",
            "description" => "required",
            "tags" => "required"
        ]);

        $image_url = Storage::put("public/blog", $request->file("image"));

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->description = $request->description;
        $blog->author_id = $request->user()->id;
        $blog->tags = $request->tags;
        $blog->image = $image_url;
        $blog->date = Carbon::now();
        $blog->save();

        return GoogleBaseResource::success(200, "Your blog has been created.", ["item" => $blog]);
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
            "tags" => "required"
        ]);

        Blog::find($id)->update($validator);

        return GoogleBaseResource::success(200, "Your blog has been successfully updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (($blog = Blog::find($id))) {
            $blog->delete();

            return GoogleBaseResource::success(200, "Your blog has been deleted.");
        }

        return GoogleBaseResource::error(404, "Blog not found");
    }
}
