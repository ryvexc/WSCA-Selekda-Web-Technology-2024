<?php

namespace App\Http\Resources;

use App\Models\RequestLog;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GoogleBaseResource extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $requestLog = new RequestLog();
        $requestLog->url = url()->current();
        $requestLog->status_code = $request->status_code;
        $requestLog->response = json_encode(parent::toArray($request));
        $requestLog->save();

        // return parent::toArray($request);
        return [
            "apiVersion" => '1.0',
            "id" => $requestLog->id,
            "data" => [
                ...parent::toArray($request)
            ],
        ];
    }
}
