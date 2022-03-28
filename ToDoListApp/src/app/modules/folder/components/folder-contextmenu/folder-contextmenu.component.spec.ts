import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderContextmenuComponent } from './folder-contextmenu.component';

describe('FolderContextmenuComponent', () => {
  let component: FolderContextmenuComponent;
  let fixture: ComponentFixture<FolderContextmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderContextmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderContextmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
