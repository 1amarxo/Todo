import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCurrentItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoCurrentItemComponent;
  let fixture: ComponentFixture<TodoCurrentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoCurrentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCurrentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
