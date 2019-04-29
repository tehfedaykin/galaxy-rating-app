import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gr-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.less'],
  providers: [     
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => TypeaheadComponent),
      multi: true     
    }   
  ]
})
export class TypeaheadComponent implements ControlValueAccessor {
  public selected;
  @Input() data;

  onChanged: any = () => {}
  onTouched: any = () => {}

  //gets the value from the formControl
  writeValue(val){ 
    if(val) {
      this.selectDropdown(val);
    }
  }

  registerOnChange(fn: any){
    this.onChanged = fn
  }
  registerOnTouched(fn: any){
    this.onTouched = fn
  }

  selectDropdown(val) {
    this.selected = this.data.filter(x => x.id == val)[0].name;
  }

  onSelect(ev) {
    this.onTouched();
    if(ev.item.id != this.selected.id) {
      this.onChanged(ev.item.id);
    }
  }

  onBlur(ev) {
    this.onTouched();
    if(!this.selected) {
      this.onChanged(null);
    }
  }

}
