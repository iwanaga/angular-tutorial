import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Resource, ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';

interface TaskQueryParams {
  name?: string
  dueDate?: Date
}

@Injectable()
@ResourceParams({
  url: '/api/v1/tasks'
})
export class TaskService extends Resource {
  @ResourceAction({ path: '/', isArray: true })
  index: ResourceMethod<TaskQueryParams, any>;

  @ResourceAction({ path: '/{!id}' })
  show: ResourceMethod<{id: number}, any>
}
