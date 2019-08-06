import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IpManagerComponent } from './ip-manager.component';

describe('IP Manager Component', () => {
  let component: IpManagerComponent;
  let fixture: ComponentFixture<IpManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpManagerComponent, FormGroup]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Is IP Address Error message defined and valid', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.invaliderrormsg).toEqual('Please enter a valid IP address');
  }));


});
