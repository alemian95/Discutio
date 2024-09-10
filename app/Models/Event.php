<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    public const USER_REGISTERED = 'user.registered';
    public const USER_LOGGED = 'user.logged';
    public const USER_UPDATED = 'user.updated';
    public const USER_DELETED = 'user.deleted';
    public const USER_PASSWORD_CHANGED = 'user.password_changed';
    public const USER_ASSIGNED_ROLE = 'user.assigned_role';

    public const THREAD_CREATED = 'thread.created';
    public const THREAD_UPDATED = 'thread.updated';
    public const THREAD_DELETED = 'thread.deleted';

    public const ANSWER_CREATED = 'answer.created';
    public const ANSWER_UPDATED = 'answer.updated';
    public const ANSWER_DELETED = 'answer.deleted';


    public static function create(string $type, string $message = null) : self
    {
        $event = new Event();
        $event->type = $type;
        $event->message = $message;
        return $event;
    }

    public function dispatchedBy(Model $entity) : self
    {
        $this->primary_entity_class = get_class($entity);
        $this->primary_entity_id = $entity->id;
        return $this;
    }

    public function referencesTo(Model $entity): self
    {
        $this->secondary_entity_class = get_class($entity);
        $this->secondary_entity_id = $entity->id;
        return $this;
    }

    public function addData(array $data) : self
    {
        $this->data = json_encode($data);
        return $this;
    }

    public function dispatcher() : Attribute
    {
        return Attribute::make(function() {
            get: fn() => $this->primary_entity_class::find($this->primary_entity_id);
        });
    }

    public function reference() : Attribute
    {
        return Attribute::make(function () {
           get: fn() => $this->secondary_entity_class::find($this->secondary_entity_id);
        });
    }


}
