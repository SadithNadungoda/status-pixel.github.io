<?php

namespace App\Filters;

use EloquentFilter\ModelFilter;
use Illuminate\Database\Eloquent\Builder;

class UserRoleFilter extends ModelFilter
{
    /**
     * Related Models that have ModelFilters as well as the method on the ModelFilter
     * As [relationMethod => [input_key1, input_key2]].
     *
     * @var array
     */
    public $relations = [];

    public function search($search): UserRoleFilter
    {
        return $this->where(static function ($query) use ($search) {
            /** @var Builder $query */
            return $query->where('name', 'LIKE', '%'.$search.'%');
        });
    }
}
