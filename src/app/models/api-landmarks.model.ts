import { ILandmarkObject } from './landmark.model';

export interface IGetLandmarksResponse {
  results: ILandmarkObject[];
}

export interface IGetLandmarksRequestParams {
  order?: string;
  keys?: string;
  excludeKeys?: string;
}

export interface IUploadLandmarkPhotoResponse {
  url: string;
  name: string;
}

export interface PhotoFile extends IUploadLandmarkPhotoResponse {
  __type: string;
}

export class PhotoFile implements PhotoFile {
  url: string;
  name: string;
  __type: string;

  constructor(photoInfo: IUploadLandmarkPhotoResponse) {
    Object.assign(this, photoInfo);
    this.__type = 'File';
  }
}

export interface ILandmarkUpdate {
  title: string;
  short_info?: string;
  description?: string;
  url?: string;
  photo?: PhotoFile;
}

export interface ILandmarkUpdateResponse extends ILandmarkUpdate {
  updatedAt?: string;
}

export class LandmarkUpdate implements ILandmarkUpdate {
  title: string;
  short_info?: string;
  description?: string;
  url?: string;
  photo?: PhotoFile;

  constructor() { }
}

export enum RequestResults {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IRequestResult {
  result: RequestResults;
  message?: string;
}
