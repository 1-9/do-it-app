import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwogisMapComponent } from './twogis-map.component';

describe('TwogisMapComponent', () => {
  let component: TwogisMapComponent;
  let fixture: ComponentFixture<TwogisMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwogisMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwogisMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
