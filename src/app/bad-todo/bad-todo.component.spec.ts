import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadTodoComponent } from './bad-todo.component';

describe('BadTodoComponent', () => {
  let component: BadTodoComponent;
  let fixture: ComponentFixture<BadTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadTodoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
