import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPersonComponent } from './tab-person.component';

describe('TabPersonComponent', () => {
  let component: TabPersonComponent;
  let fixture: ComponentFixture<TabPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabPersonComponent]
    });
    fixture = TestBed.createComponent(TabPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
