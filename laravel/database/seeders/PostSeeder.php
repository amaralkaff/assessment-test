<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the test user or create it if it doesn't exist
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
            ]
        );

        // Create demo posts
        $posts = [
            [
                'title' => 'Welcome to Our Blog Platform',
                'content' => 'This is a demo post to showcase the blog functionality. You can create, edit, and delete posts using the interface. Feel free to explore all the features!',
            ],
            [
                'title' => 'Getting Started with Laravel and Next.js',
                'content' => 'This application demonstrates the integration between Laravel backend and Next.js frontend. Laravel handles authentication and API endpoints, while Next.js provides a modern, responsive user interface using DaisyUI components.',
            ],
            [
                'title' => 'Authentication System Overview',
                'content' => 'The authentication system uses JWT tokens for secure API communication. Users can register, login, and manage their own posts. Each post is associated with its author, ensuring proper authorization.',
            ],
            [
                'title' => 'CRUD Operations Made Easy',
                'content' => 'This platform supports full CRUD operations: Create new posts, Read existing content, Update your posts, and Delete posts you no longer need. All operations are protected and only available to authenticated users.',
            ],
            [
                'title' => 'Pagination and Performance',
                'content' => 'Posts are paginated to ensure optimal performance even with large datasets. The pagination controls at the bottom allow you to navigate through multiple pages of content seamlessly.',
            ],
        ];

        foreach ($posts as $postData) {
            Post::create([
                'user_id' => $user->id,
                'title' => $postData['title'],
                'content' => $postData['content'],
            ]);
        }
    }
}
