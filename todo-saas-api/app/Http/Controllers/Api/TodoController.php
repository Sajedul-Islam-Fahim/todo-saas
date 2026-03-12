<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->todos();

        if ($request->status)   $query->where('status', $request->status);
        if ($request->priority) $query->where('priority', $request->priority);
        if ($request->due_date) $query->whereDate('due_date', $request->due_date);
        if ($request->search)   $query->where('title', 'like', "%{$request->search}%");

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'in:pending,in_progress,completed',
            'priority'    => 'in:low,medium,high',
            'due_date'    => 'nullable|date',
        ]);

        $data['user_id'] = $request->user()->id;

        $todo = Todo::create($data);

        return response()->json($todo, 201);
    }

    public function show(Todo $todo)
    {
        $this->authorize('view', $todo);

        return response()->json($todo);
    }

    public function update(Request $request, Todo $todo)
    {
        $this->authorize('update', $todo);

        $data = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'in:pending,in_progress,completed',
            'priority'    => 'in:low,medium,high',
            'due_date'    => 'nullable|date',
        ]);

        $todo->update($data);

        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $this->authorize('delete', $todo);
        $todo->delete();

        return response()->json(['message' => 'Todo deleted successfully']);
    }

    public function dashboard(Request $request)
    {
        $todos = $request->user()->todos();

        return response()->json([
            'total'         => (clone $todos)->count(),
            'pending'       => (clone $todos)->where('status', 'pending')->count(),
            'in_progress'   => (clone $todos)->where('status', 'in_progress')->count(),
            'completed'     => (clone $todos)->where('status', 'completed')->count(),
            'high_priority' => (clone $todos)->where('priority', 'high')->where('status', '!=', 'completed')->count(),
            'overdue'       => (clone $todos)->where('due_date', '<', now())->where('status', '!=', 'completed')->count(),
        ]);
    }
}
