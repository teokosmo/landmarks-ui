export interface ILandmarkObject {
  objectId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  order?: number;
  short_info?: string;
  description?: string;
  location?: number[];
  url?: string;
  photo?: any;
  photo_thumb?: any;
}

export class LandmarkObject implements ILandmarkObject {

  objectId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  order?: number;
  short_info?: string;
  description?: string;
  location?: number[];
  url?: string;
  photo?: any;
  photo_thumb?: any;

  private _allKeysRetrieved: boolean;

  get allKeysRetrieved(): boolean {
    return this._allKeysRetrieved;
  }

  constructor(data: ILandmarkObject, allKeysRetrieved: boolean = false) {
    Object.assign(this, data);
    this._allKeysRetrieved = allKeysRetrieved;
  }
}

export interface ILandmarksCache {
  [objectId: string]: LandmarkObject;
}
