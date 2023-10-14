import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewformComponent } from './addnewform.component';

describe('AddnewformComponent', () => {
  let component: AddnewformComponent;
  let fixture: ComponentFixture<AddnewformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewformComponent]
    });
    fixture = TestBed.createComponent(AddnewformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
