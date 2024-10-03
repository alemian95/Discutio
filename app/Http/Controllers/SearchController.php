<?php

namespace App\Http\Controllers;

use App\Extensions\Inertia\InertiaWithThemes;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('query');

        $subQuery = Thread::select('threads.id', DB::raw("
            (MATCH (threads.title, threads.content) AGAINST (? IN NATURAL LANGUAGE MODE) +
            (SELECT IFNULL(SUM(MATCH (answers.content) AGAINST (? IN NATURAL LANGUAGE MODE)), 0)
            FROM answers WHERE answers.thread_id = threads.id)) as relevance
        "))
        ->whereRaw("MATCH (threads.title, threads.content) AGAINST (? IN NATURAL LANGUAGE MODE)", [$query, $query])
        ->orWhereExists(function ($queryBuilder) use ($query) {
            $queryBuilder->select(DB::raw(1))
                ->from('answers')
                ->whereRaw("MATCH (answers.content) AGAINST (? IN NATURAL LANGUAGE MODE)", [$query, $query])
                ->whereColumn('answers.thread_id', 'threads.id');
        });

        $threads = Thread::joinSub($subQuery, 'search_results', function ($join) {
            $join->on('threads.id', '=', 'search_results.id');
        })
        ->select('threads.*', 'search_results.relevance')
        // ->with('answers')
        ->withCount('answers')
        ->orderByDesc('search_results.relevance')
        ->get();

        // dd($threads);

        return InertiaWithThemes::render("Search", [
            'query' => $query,
            'threads' => $threads
        ]);
    }
}
