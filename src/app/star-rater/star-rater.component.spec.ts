import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { StarRaterComponent } from './star-rater.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: '<gr-star-rater [formControl]="rating"></gr-star-rater>'
})
class TestHostComponent {
  @ViewChild(StarRaterComponent, { static: false })
  public starRaterComponent: StarRaterComponent;

  public rating: FormControl = new FormControl({value: null, disabled: false});
}

describe('StarRaterComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarRaterComponent, TestHostComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent.starRaterComponent).toBeTruthy();
  });

  it('should set the star rating based on the formControl value', () => {
    testHostComponent.rating.patchValue(3);
    hostFixture.detectChanges();
    expect(testHostComponent.starRaterComponent._value).toEqual(3);
    const compiled = hostFixture.debugElement.nativeElement;
    let selectedStars = compiled.querySelectorAll('gr-star-rater .selected');
    expect(selectedStars.length).toEqual(3)
  });

  it('should set disabled class when formControl is disabled', () => {
    testHostComponent.rating.disable();
    hostFixture.detectChanges();
    const compiled = hostFixture.debugElement.nativeElement;
    let stars = compiled.querySelector('gr-star-rater .stars');
    expect(stars.classList.contains('disabled')).toBe(true);
  });

  it('should remove disabled class when formControl is enabled', () => {
    testHostComponent.rating.disable();
    hostFixture.detectChanges();
    const compiled = hostFixture.debugElement.nativeElement;
    let stars = compiled.querySelector('gr-star-rater .stars');
    expect(stars.classList.contains('disabled')).toBe(true);
    testHostComponent.rating.enable();
    hostFixture.detectChanges();
    expect(stars.classList.contains('disabled')).toBe(false);
  });

  it('should not call touch or change events when disabled', () => {
    testHostComponent.rating.patchValue(3);
    testHostComponent.rating.disable();
    hostFixture.detectChanges();
    const compiled = hostFixture.debugElement.nativeElement;
    let star1 = compiled.querySelector('gr-star-rater .stars .star');
    star1.dispatchEvent(new Event('click'));
    hostFixture.detectChanges();
    expect(testHostComponent.rating.value).toBe(3);
  });

  it('should call touched when star selected', () => {
    const compiled = hostFixture.debugElement.nativeElement;
    let star1 = compiled.querySelector('gr-star-rater .stars .star');
    star1.dispatchEvent(new Event('click'));
    hostFixture.detectChanges();
    expect(compiled.querySelector('gr-star-rater').classList.contains('ng-touched')).toBe(true);
  });

  it('should call change with rating value when star selected', () => {
    const compiled = hostFixture.debugElement.nativeElement;
    let star3 = compiled.querySelectorAll('gr-star-rater .stars .star')[2];
    star3.dispatchEvent(new Event('click'));
    hostFixture.detectChanges();
    expect(testHostComponent.rating.value).toBe(3);
  });

});
