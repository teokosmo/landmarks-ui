import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilities } from '@app/common/utilities';
import { Landmark, IUploadLandmarkPhotoResponse } from '@app/models';
import { ApiLandmarksService } from '@app/services/api';
import { LandmarkUpdate, PhotoFile } from '@app/models/api-landmarks.model';
import { Constants } from '@app/common/constants';

@Component({
  selector: 'app-landmark-edit',
  templateUrl: './landmark-edit.component.html',
  styleUrls: ['./landmark-edit.component.css']
})
export class LandmarkEditComponent implements OnInit {

  utils = Utilities;
  editLandmarkForm: FormGroup;
  editLandmarkErrorMessage = '';
  uploadedPhoto: File;
  landmarkObjectId: string;
  landmarkTitle: string;
  uploadedPhotoInfo: IUploadLandmarkPhotoResponse;
  uploadPhotoErrorMessage: string;
  updateLandmarkErrorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiLandmarksService: ApiLandmarksService,
    private formBuilder: FormBuilder
  ) { }

  get formControls(): any { return this.editLandmarkForm.controls; }

  ngOnInit(): void {
    this.editLandmarkForm = this.formBuilder.group({
      title: ['', Validators.required],
      url: [''],
      photo: [null],
      short_info: [''],
      description: [''],
    });

    this.landmarkObjectId = this.route.snapshot.paramMap.get('objectId');
    // this.landmark = this.apiLandmarksService.getLandmark(this.landmarkObjectId);
    this.apiLandmarksService.getLandmark(this.landmarkObjectId)
      .subscribe(
        (landmark: Landmark) => {
          this.landmarkTitle = landmark.title;
          this.updateFormValues(landmark);
        },
        (err) => {
          Utilities.logMsg(`${err.message}`, Constants.logLevel.error);
        }
      );
  }

  returnToLandmarkView(): void {
    this.router.navigateByUrl('/landmark/' + this.landmarkObjectId);
  }

  updateFormValues(landmark: Landmark): void {
    Utilities.logMsg('LandmarkEditComponent.updateFormValues');
    this.editLandmarkForm.patchValue(landmark);
  }

  onPhotoChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadedPhotoInfo = null;
      this.uploadPhotoErrorMessage = null;
      this.editLandmarkForm.patchValue({ photo: file }); // throws following error
      // DOMException: Failed to set the 'value' property on 'HTMLInputElement':
      // This input element accepts a filename, which may only be programmatically set to the empty string.
    }
  }

  uploadPhoto(): void {
    this.apiLandmarksService.uploadLandmark(this.formControls.photo.value)
      .subscribe(
        (uploadResponse: IUploadLandmarkPhotoResponse) => {
          this.uploadedPhotoInfo = uploadResponse;
          this.uploadPhotoErrorMessage = null;
        },
        (err) => {
          this.uploadedPhotoInfo = null;
          this.uploadPhotoErrorMessage = err.error.error || err.message;
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
    this.apiLandmarksService.updateLandmark(this.landmarkObjectId, landmarkData)
      .subscribe(
        (updateResponse: any) => {
          this.returnToLandmarkView();
        },
        (err) => {
          this.updateLandmarkErrorMessage = err.error.error;
        }
      );
  }

}
