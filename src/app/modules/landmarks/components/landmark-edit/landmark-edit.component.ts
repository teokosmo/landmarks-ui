import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilities } from '@app/common/utilities';
import { ILandmarkObject, IUploadLandmarkPhotoResponse, IRequestResult } from '@app/models';
import { LandmarkUpdate, PhotoFile, RequestResults } from '@app/models/api-landmarks.model';
import { Constants } from '@app/common/constants';
import { CoreLandmarksService } from '@app/services/core';
import { ApiLandmarksService } from '@app/services/api';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-landmark-edit',
  templateUrl: './landmark-edit.component.html',
  styleUrls: ['./landmark-edit.component.css']
})
export class LandmarkEditComponent implements OnInit, OnDestroy, AfterViewInit {

  utils = Utilities;
  editLandmarkForm: FormGroup;
  editLandmarkErrorMessage = '';
  uploadedPhoto: File;
  landmarkObjectId: string;
  landmarkTitle: string;
  uploadedPhotoInfo: IUploadLandmarkPhotoResponse;
  uploadPhotoErrorMessage: string;
  updateLandmarkErrorMessage: string;
  photoFile: File;
  landmarkObjectGetSubscription: Subscription;
  landmarkObjectUpdateSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coreLandmarksService: CoreLandmarksService,
    private apiLandmarksService: ApiLandmarksService,
    private formBuilder: FormBuilder
  ) { }

  get formControls(): any { return this.editLandmarkForm.controls; }

  ngOnInit(): void {
    // init form
    this.editLandmarkForm = this.formBuilder.group({
      title: ['', Validators.required],
      url: [''],
      photo: [null],
      short_info: [''],
      description: [''],
    });

    // subscribe to observables
    this.landmarkObjectGetSubscription = this.coreLandmarksService.landmarkSubject.asObservable()
    .subscribe(
      (landmark: ILandmarkObject) => {
        this.landmarkTitle = landmark.title;
        this.updateFormValues(landmark);
      },
      (err) => {
        Utilities.logMsg(`${err.message}`, Constants.logLevel.error);
      }
    );
    this.landmarkObjectUpdateSubscription = this.coreLandmarksService.landmarkUpdateSubject.asObservable()
    .subscribe(
      (updateResult: IRequestResult) => {
        if (updateResult.result === RequestResults.SUCCESS) {
          this.returnToLandmarkView();
        } else if (updateResult.result === RequestResults.ERROR) {
          this.updateLandmarkErrorMessage = updateResult.message;
        } else {
          Utilities.logMsg(`undefined landmark update result`, Constants.logLevel.error);
        }
      },
      (err) => {
        Utilities.logMsg(`${err.message}`, Constants.logLevel.error);
      }
    );

    // parse objectId from route
    this.landmarkObjectId = this.route.snapshot.paramMap.get('objectId');
  }

  ngOnDestroy(): void {
    this.landmarkObjectGetSubscription.unsubscribe();
    this.landmarkObjectUpdateSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    interval(1)
      .pipe(take(1))
      .subscribe(() => {
        this.coreLandmarksService.getLandmark(this.landmarkObjectId);
      });
  }

  returnToLandmarkView(): void {
    this.router.navigateByUrl('/landmark/' + this.landmarkObjectId);
  }

  updateFormValues(landmark: ILandmarkObject): void {
    Utilities.logMsg('LandmarkEditComponent.updateFormValues');
    this.editLandmarkForm.patchValue({
      title: landmark.title,
      url: landmark.url,
      short_info: landmark.short_info,
      description: landmark.description,
    });
  }

  onPhotoChange(event: any): void {
    if (event.target.files.length > 0) {
      this.photoFile = event.target.files[0];
      this.uploadedPhotoInfo = null;
      this.uploadPhotoErrorMessage = null;
      // this.editLandmarkForm.patchValue({ photo: file }); // throws following error
      // DOMException: Failed to set the 'value' property on 'HTMLInputElement':
      // This input element accepts a filename, which may only be programmatically set to the empty string.
    }
  }

  uploadPhoto(): void {
    Utilities.showLoader();
    this.apiLandmarksService.uploadLandmark(this.photoFile)
      .subscribe(
        (uploadResponse: IUploadLandmarkPhotoResponse) => {
          this.uploadedPhotoInfo = uploadResponse;
          this.uploadPhotoErrorMessage = null;
          Utilities.hideLoader();
        },
        (err) => {
          this.uploadedPhotoInfo = null;
          this.uploadPhotoErrorMessage = err.error.error || err.message;
          Utilities.hideLoader();
        }
      );
  }

  saveLandmark(): void {
    this.updateLandmarkErrorMessage = null;
    const landmarkData = new LandmarkUpdate();
    Object.keys(this.formControls).forEach(formControlKey => {
      if (Utilities.isDefined(this.formControls[formControlKey].value)) {
        if (formControlKey === 'photo' && Utilities.isDefined(this.uploadedPhotoInfo)) {
          landmarkData[formControlKey] = new PhotoFile(this.uploadedPhotoInfo);
        } else if (formControlKey !== 'photo') {
          landmarkData[formControlKey] = this.formControls[formControlKey].value;
        }
      }
    });
    this.coreLandmarksService.updateLandmark(this.landmarkObjectId, landmarkData);
  }

}
