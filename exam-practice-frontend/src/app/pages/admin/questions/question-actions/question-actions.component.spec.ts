import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionActionsComponent } from './question-actions.component';

describe('QuestionActionsComponent', () => {
  let component: QuestionActionsComponent;
  let fixture: ComponentFixture<QuestionActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionActionsComponent]
    });
    fixture = TestBed.createComponent(QuestionActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
