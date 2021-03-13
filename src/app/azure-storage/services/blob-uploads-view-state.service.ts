import { Injectable } from '@angular/core';
import { from, OperatorFunction, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { BlobContainerRequest, BlobItemUpload } from '../types/azure-storage';
import { BlobSharedViewStateService } from './blob-shared-view-state.service';
import { BlobStorageService } from './blob-storage.service';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BlobUploadsViewStateService {
  date!: number
  //private uploadQueueInner$ = new Subject<File>();
  private uploadQueueInner$ = new Subject<FileList>();

  uploadedItems$ = this.uploadQueue$.pipe(
    mergeMap(file => this.uploadFile(file, new Date().getTime(), file.name.split('.').pop())),
    this.blobState.scanEntries()
  );
  
  /*get uploadQueue$() {
    return this.uploadQueueInner$
      .asObservable();
  }*/
 
  get uploadQueue$() {
    return this.uploadQueueInner$
      .asObservable()
      .pipe(mergeMap(files => from(files)));
  }

  constructor(
    private blobStorage: BlobStorageService,
    private blobState: BlobSharedViewStateService
  ) {}

  /*uploadItems(files: File): void {
    this.uploadQueueInner$.next(files);
  }*/
  uploadItems(files: FileList): void {
    this.uploadQueueInner$.next(files);
  }

  private uploadFile = (file: File, date: number, fileExtension: any) =>
    this.blobState.getStorageOptionsWithContainer().pipe(
      switchMap(options =>
        this.blobStorage
          .uploadToBlobStorage(file, {
            ...options,
            filename: file.name.replace(fileExtension,'') + date.toString() + '.' + file.name.split('.').pop(),
          })
          .pipe(
            this.mapUploadResponse(file, date, fileExtension, options),
            this.blobState.finaliseBlobChange(options.containerName)
          )
      )
    );

  private mapUploadResponse = (
    file: File,
    date: number,
    fileExtension: any,
    options: BlobContainerRequest
  ): OperatorFunction<number, BlobItemUpload> => source =>
    source.pipe(
      map(progress => ({
        filename: file.name.replace(fileExtension,'') + date.toString() + '.' + file.name.split('.').pop(),
        nombreArchivo: file.name.replace(fileExtension,'') + date.toString() + '.' + file.name.split('.').pop(),
        urlImagen: environment.urlBlobStorage+options.containerName+'/'+file.name.replace(fileExtension,'') + date.toString() + '.' + file.name.split('.').pop(),
        containerName: options.containerName,
        progress: parseInt(((progress / file.size) * 100).toString(), 10),
        filetype: fileExtension
      })),
      startWith({
        filename: file.name.replace(fileExtension,'') + date.toString() + '.' + file.name.split('.').pop(),
        nombreArchivo: file.name.replace(fileExtension,'') + date.toString() + '.' + file.name.split('.').pop(),
        urlImagen: environment.urlBlobStorage+options.containerName+'/'+file.name.replace(fileExtension,'') + date.toString() + '.' + file.name.split('.').pop(),
        containerName: options.containerName,
        progress: 0,
        filetype: fileExtension
      })
    );
}
