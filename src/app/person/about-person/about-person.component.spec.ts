import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPersonComponent } from './about-person.component';

describe('AboutPersonComponent', () => {
  let component: AboutPersonComponent;
  let fixture: ComponentFixture<AboutPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPersonComponent]
    });
    fixture = TestBed.createComponent(AboutPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
