import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { TypeaheadComponent } from './typeahead.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  template: '<gr-typeahead [data]="testData" [formControl]="galaxy"></gr-typeahead>'
})
class TestHostComponent {
  @ViewChild(TypeaheadComponent, /* TODO: add static flag */ {})
  public typeaheadComponent: TypeaheadComponent;

  public testData = [{id: 1, name: 'foo'},{id: 2, name: 'bar'}];
  public galaxy: FormControl = new FormControl({value: null, disabled: false});
}

describe('TypeaheadComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeaheadComponent, TestHostComponent ],
      imports: [
        TypeaheadModule.forRoot(),
        FormsModule, 
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent.typeaheadComponent).toBeTruthy();
  });

  it('should select dropdown based on formControl value', () => {
    testHostComponent.galaxy.patchValue(1);
    hostFixture.detectChanges();
    expect(testHostComponent.typeaheadComponent.selected).toEqual('foo');
  });

  it('should send a touch event when item is selected', ()=> {
    testHostComponent.typeaheadComponent.selected = {
      id: 2,
      name: 'foo'
    }
    const compiled = hostFixture.debugElement.nativeElement;
    let component = compiled.querySelector('gr-typeahead');
    expect(component.classList.contains('ng-touched')).toBe(false);
    component.querySelector('input').dispatchEvent(new Event('blur'));
    hostFixture.detectChanges();
    expect(component.classList.contains('ng-touched')).toBe(true);
  });

  it('should send a change event with the new value when item is selected with new value', () => {
    testHostComponent.typeaheadComponent.selected = {
      id: 2,
      name: 'foo'
    }
    testHostComponent.typeaheadComponent.onSelect({item: {id: 3}});
    hostFixture.detectChanges();
    expect(testHostComponent.galaxy.value).toBe(3);
  });

  it('should send a null value if the dropdown value is cleared out', () => {
    testHostComponent.typeaheadComponent.selected = {
      id: 2,
      name: 'foo'
    }
    testHostComponent.typeaheadComponent.onSelect({item: {id: 3}});
    expect(testHostComponent.galaxy.value).toBe(3);
    testHostComponent.typeaheadComponent.selected = null;
    const compiled = hostFixture.debugElement.nativeElement;
    compiled.querySelector('gr-typeahead input').dispatchEvent(new Event('blur'));
    expect(testHostComponent.galaxy.value).toBe(null);
  });

  it('should set invalid class when field is required, has been touched, and has no value', () => {
    testHostComponent.galaxy.setValidators([Validators.required]);
    testHostComponent.typeaheadComponent.selected = null;
    const compiled = hostFixture.debugElement.nativeElement;
    let component = compiled.querySelector('gr-typeahead');
    expect(testHostComponent.galaxy.touched).toBe(false);
    expect(component.classList.contains('ng-invalid')).toBe(false);
    component.querySelector('input').dispatchEvent(new Event('blur'));
    hostFixture.detectChanges();
    expect(testHostComponent.galaxy.touched).toBe(true);
    expect(component.classList.contains('ng-invalid')).toBe(true);
  });

});
