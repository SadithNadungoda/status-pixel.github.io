<?php

namespace App\Filters;

use Carbon\Carbon;
use EloquentFilter\ModelFilter;

class IncidentFilter extends ModelFilter
{
    /**
     * Related Models that have ModelFilters as well as the method on the ModelFilter
     * As [relationMethod => [input_key1, input_key2]].
     *
     * @var array
     */
    public $relations = [];

    public function search($search): IncidentFilter
    {
        return $this->where('name', 'LIKE', '%'.$search.'%');
    }

    public function status($status): IncidentFilter
    {
        if ($status === 'open') {
            return $this->whereNull('end_at');
        }
        if ($status === 'closed') {
            return $this->whereDate('end_at', '<=', Carbon::now());
        }
        return $this;
    }

    public function type($type): IncidentFilter
    {
        return $this->where('type', $type);
    }
}
