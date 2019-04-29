import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { StarRaterComponent } from './star-rater/star-rater.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TypeaheadComponent,
        StarRaterComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TypeaheadModule.forRoot()
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'galaxy-rating-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('galaxy-rating-app');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Galaxy Rating App');
  });

  it('should enable the star rating formcontrol when galaxy formcontrol has a value', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const starRatingControl = fixture.componentInstance.galaxyForm.get('rating');
    expect(starRatingControl.disabled).toBe(true);
    fixture.componentInstance.galaxyForm.get('galaxy').patchValue(1);
    fixture.detectChanges();
    expect(starRatingControl.disabled).toBe(false);
  })
});
