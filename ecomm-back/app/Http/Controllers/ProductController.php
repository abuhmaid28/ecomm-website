<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('id', 'desc')->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg',
        ]);

        try {
            $data = $request->only(['name', 'price', 'quantity', 'description']);
            $imagePath = $request->file('image')->store('public');
            $data['image'] = $imagePath;
            $product = Product::create($data);

            // Return a JSON response with success message and product details
            return response()->json(['message' => 'Product created successfully.', 'product' => $product], 201);
        } catch (\Exception $e) {
            // Handle any exceptions that occur during image upload or product creation
            return response()->json(['message' => 'Failed to store the product.', 'error' => $e->getMessage()], 500);
        }
    }
    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        // Validate incoming request
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif,webp,svg',
        ]);

        try {
            // Find the product by ID
            $product = Product::findOrFail($id);

            // Update fields based on the request
            $data = $request->only(['name', 'price', 'quantity', 'description']);

            // Handle image update if provided
            if ($request->hasFile('image')) {
                // Delete the old image if exists
                Storage::delete($product->image);

                // Store new image
                $imagePath = $request->file('image')->store('public');
                $data['image'] = $imagePath;
            }

            // Update the product
            $product->update($data);

            // Return a JSON response with success message and updated product details
            return response()->json(['message' => 'Product updated successfully.', 'product' => $product], 200);
        } catch (\Exception $e) {
            // Handle any exceptions that occur during image upload or product update
            return response()->json(['message' => 'Failed to update the product.', 'error' => $e->getMessage()], 500);
        }
    }


    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully.'
        ]);
    }
    public function search(Request $request)
    {
        $searchTerm = $request->input('query');

        $products = Product::when($searchTerm, function ($query, $searchTerm) {
            $query->where(function ($query) use ($searchTerm) {
                $query->where('description', 'LIKE', '%' . $searchTerm . '%');
            });
        })->get();

        return response()->json($products);
    }
}
