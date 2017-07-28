```puml

participant QIPCamTest
participant QIPCam
participant QIPCamClient
participant QIPCamService

group init
  QIPCamTest -> QIPCam: QIPCam.connect
  activate QIPCamTest

  QIPCam -> QIPCamClient: QIPCamClient.connect
  activate QIPCam

  QIPCamClient --> QIPCamService: QIPCamService.connect
  activate QIPCamClient


  QIPCamService -> CameraAPI2: new CameraAPI2()
  activate QIPCamService

  CameraAPI2 --> media.camera: connect
  activate CameraAPI2

  note right of CameraAPI2 : Brillo doesn't support API1

  media.camera -> media.camera: getNumberOfCameras()
  media.camera -> media.camera: getCameraInfo
  media.camera -> CameraAPI2:
  deactivate CameraAPI2
  CameraAPI2 --> media.camera:  init
  activate CameraAPI2
  media.camera -> CameraDeviceUser: connectDevice
  activate media.camera
  CameraDeviceUser -> CameraDeviceUser: getCameraInfo -> CameraMetadata
  CameraDeviceUser -> CameraDeviceUser: find Supported PictureSize
  CameraDeviceUser -> media.camera:
  deactivate media.camera
  media.camera -> CameraAPI2:
  deactivate CameraAPI2
  CameraAPI2 --> CameraAPI2:  get Supported Video Sizes
  CameraAPI2 --> QIPCamService:
  deactivate QIPCamService
  QIPCamService --> QIPCamClient:
  deactivate QIPCamClient
  QIPCamClient --> QIPCam:
  deactivate QIPCam
  QIPCam --> QIPCamTest:
  deactivate QIPCamTest
==============================
  QIPCamTest -> QIPCamTest: Init Params -> QIPCamInitParams
==============================
  QIPCamTest -> QIPCam: QIPCam.init(Params)
  activate QIPCamTest
  QIPCam -> QIPCamClient: QIPCamClient.init(Params)
  activate QIPCam
  QIPCamClient --> QIPCamService: QIPCamService.init(Params)
  activate QIPCamClient
  QIPCamService --> QIPCamRecorder: QIPCamRecorder.init(Params)
  activate QIPCamService
  QIPCamRecorder --> QIPCamRecorder: save Params

  /'
    開始init
  '/

  QIPCamRecorder --> QIPCamCameraSource: QIPCamCameraSource.init(Params)
  QIPCamCameraSource --> QIPCamCameraSource: save Params
  QIPCamCameraSource --> PreviewSource:new PreviewSource
  note right of PreviewSource : BufferProducer
  PreviewSource --> QIPCamCameraSource:
  QIPCamCameraSource --> QIPCamRecorder:


  QIPCamRecorder --> QIPCamEncoder: QIPCamEncoder::createIPCamEncoder()
  QIPCamEncoder --> QIPCamRecorder:

  QIPCamRecorder --> QIPCamMuxer: QIPCamMuxer::createIPCamMuxer()
  QIPCamMuxer --> QIPCamRecorder:

  QIPCamRecorder --> AnalyticStream: new AnalyticStream() && init(Event callback)
  AnalyticStream --> QCameraVAFramework: QCameraVAFramework::init(Event callback)
  QCameraVAFramework --> QCameraVAFramework:dlopen & dlsym("VA_ALG_INFO_SYM") -> va_alg_module_t
  note right of QCameraVAFramework : /vendor/lib

  /'
    結束init
  '/
  QCameraVAFramework --> AnalyticStream:
  AnalyticStream --> QIPCamRecorder:
  QIPCamRecorder --> QIPCamService:
  deactivate QIPCamService
  QIPCamService --> QIPCamClient:
  deactivate QIPCamClient
  QIPCamClient --> QIPCam:
  deactivate QIPCam
  QIPCam --> QIPCamTest:
  deactivate QIPCamTest
end
```

------------------------------------------------------------------------------------------------------------

```puml

participant QIPCamTest
participant QIPCam
participant QIPCamClient
participant QIPCamService

group startCamera
  QIPCamTest --> QIPCam: QIPCam.startCamera()
  QIPCam --> QIPCamClient: QIPCamClient.startCamera()
  QIPCamClient --> QIPCamService: QIPCamService.startCamera()
  QIPCamService --> QIPCamRecorder: QIPCamRecorder.startCamera()
  QIPCamRecorder --> QIPCamCameraSource: QIPCamCameraSource.startCamera()
  ==============================
  QIPCamCameraSource --> PreviewSource: PreviewSource.startStream()
  PreviewSource --> PreviewSource: createPreviewSurface -> IGraphicBufferProducer -> Surface
  PreviewSource --> CameraAPI2:   CameraAPI2.startCamera()

  /'
    開始startCamera
    Step1 -

    IGraphicBufferProducer -> Surface -> Request

    if (!renderPreview)
      IGraphicBufferConsumer -> BufferItemConsumer -> setFrameAvailableListener(FrameListener) ->
                                onFrameAvailable -> FrameListener::handleBuffer -> PreviewSource::handlePreviewBuffer
    else
      IGraphicBufferConsumer -> CpuConsumer  
                             -> PreviewSource::Surface::IGraphicBufferProducer
                             -> BufferItemConsumer -> setFrameAvailableListener(FrameListener) {enabled then use FrameListner with new thread} ->
                                onFrameAvailable(BufferItem) -> FrameListener::handleBuffer -> PreviewSource::handlePreviewBuffer (BufferItem -> StreamBuffer) ->
                                BufferProducerImpl.notifyBuffer(streamBuffer) -> vector<IBufferConsumer>.onFrameAvailable(streamBuffer)

  '/
  CameraAPI2 --> CameraAPI2:   setupPreviewQueues
  note right of CameraAPI2 : IGraphicBufferConsumer
  note right of CameraAPI2 : BufferItemConsumer -> setFrameAvailableListener(FrameListener)-> onFrameAvailable -> PreviewSource::handlePreviewBuffer
  CameraAPI2 --> CameraAPI2:   setupSnapshotQueues
  note right of CameraAPI2 : IGraphicBufferProducer
  note right of CameraAPI2 : IGraphicBufferConsumer
  note right of CameraAPI2 : CpuConsumer -> setFrameAvailableListener(SnapshotFrameListener)-> onFrameAvailable -> CameraAPI2::mSnapshotCb

  CameraAPI2 --> CameraAPI2:   setupRawQueues
  note right of CameraAPI2 : IGraphicBufferProducer
  note right of CameraAPI2 : IGraphicBufferConsumer
  note right of CameraAPI2 : CpuConsumer -> setFrameAvailableListener(RawFrameListener)-> onFrameAvailable -> CameraAPI2::mRawCb

'Step2 - createStream'
  CameraAPI2 --> CameraDeviceUser:   CameraDeviceUser.beginConfigure()
  CameraAPI2 --> CameraDeviceUser:   CameraDeviceUser.createStream(preview)
  CameraAPI2 --> CameraDeviceUser:   CameraDeviceUser.createStream(snapshot)
  CameraAPI2 --> CameraDeviceUser:   CameraDeviceUser.createStream(raw)
  CameraAPI2 --> CameraDeviceUser:   CameraDeviceUser.endConfigure()

'Step3 - Set Preview Callback & Request'
'Preview Callback : PreviewSource::handlePreviewBuffer'
  CameraAPI2 --> CameraDeviceUser:   CameraDeviceUser.createDefaultRequest(CAMERA3_TEMPLATE_PREVIEW)
  CameraAPI2 --> CameraDeviceUser:   CameraDeviceUser.submitRequest(CAMERA3_TEMPLATE_PREVIEW)


  CameraAPI2 --> PreviewSource:  
  PreviewSource --> QIPCamCameraSource:  
  QIPCamCameraSource --> QIPCamRecorder:
  QIPCamRecorder --> AnalyticStream:  AnalyticStream::startStream()
  AnalyticStream --> AnalyticStream:  IBufferProducer(PreviewSource) -> addConsumer()
  AnalyticStream --> QIPCamRecorder:  
  /'
    結束startCamera
  '/
    ==============================
  QIPCamRecorder --> QIPCamService:
  QIPCamService --> QIPCamClient:  
  QIPCamClient --> QIPCam:
  QIPCam --> QIPCamTest:
end
```

------------------------------------------------------------------------------------------------------------

```puml

participant QIPCamTest
participant QIPCam
participant QIPCamClient
participant QIPCamService

group startTwoStreamRecord
group createStream  

/'
  開始createStream(new StreamSource)  :
  StreamSource（IBufferConsumer） --> StreamEncoder --> StreamMuxer
'/

  QIPCamTest --> QIPCam: QIPCam.createStream(1&2 , videoElementryCb , audioElementryCb)
  QIPCam --> QIPCamClient: QIPCamClient.createStream()
  QIPCamClient --> QIPCamService: QIPCamService.createStream()
  QIPCamService --> QIPCamRecorder: QIPCamRecorder.createStream()
  QIPCamRecorder --> QIPCamCameraSource: QIPCamCameraSource.createStream()

  '-----------創造VideoSource（IBufferProducer）'

  QIPCamCameraSource --> VideoSource: if(NULL) -> new VideoSource(this)
  note right of VideoSource : IBufferProducer
  VideoSource --> QIPCamCameraSource:



  '-----------創造StreamSource（IBufferConsumer）'

  QIPCamCameraSource --> QIPCamCameraSource: StreamMap.add (new StreamSource)
  note right of QIPCamCameraSource : IBufferConsumer
  QIPCamCameraSource --> QIPCamRecorder:


  '-----------StreamSource -> StreamMuxer'

  QIPCamRecorder --> QIPCamEncoder: QIPCamEncoder.addSource(StreamSource)
  QIPCamEncoder --> QIPCamEncoder: (new StreamMuxer()).init()
  QIPCamEncoder --> QIPCamRecorder:


  '-----------StreamMuxer -> StreamEncoder'
  /'this傳給QIPCamMuxer是為了呼叫
    QIPCamRecorder.videoElementryStreamCB -> QIPCamClient.notifyVideoElementryData -> QIPCamClient.mVideoElementryCBList

    而QIPCamClient.mVideoElementryCBList 等等會加入
  '/

  QIPCamRecorder --> QIPCamMuxer: QIPCamMuxer.addSource(QIPCamEncoder,this)
  QIPCamMuxer --> QIPCamMuxer: (new StreamEncoder()).init()
  QIPCamMuxer --> QIPCamRecorder:

  QIPCamRecorder --> QIPCamRecorder: mStreamsParamMap.add(streamId, streamEncParams)

  QIPCamRecorder --> QIPCamService:
  QIPCamService --> QIPCamClient:  



  /'-----------加入 QIPCamClient.mVideoElementryCBList From QIPCamTest'/

  QIPCamClient --> QIPCamClient:  mVideoElementryCBList.add(streamId,videoElementryCb)
  QIPCamClient --> QIPCamClient:  mAudioElementryCBList.add(streamId,audioElementryCb)
  QIPCamClient --> QIPCam:
  QIPCam --> QIPCamTest:


end /'結束createStream'/

==============================

group startStream   
/'
  開始startRecording :
  IGraphicBufferProducer -> Surface -> Request

  IGraphicBufferConsumer -> BufferItemConsumer -> setFrameAvailableListener(FrameListener) ->
  FrameListener.onFrameAvailable -> FrameListener::handleBuffer -> VideoSource::handleCameraBuffer ->
  VideoSource.BufferProducerImpl（IBufferProducer).`notifyBuffer` -> StreamSource.BufferConsumerImpl（IBufferConsumer）.onFrameAvailable -> StreamSource.onFrameAvailable ->
  StreamSource.pushFrameToList(StreamBuffer frame) -> StreamSource.signal -> StreamSource.read ->
  |
  |
  CameraAPI2.returnCameraBuffer(StreamBuffer buffer) -> BufferItemConsumer.releaseBuffer(bufferItem)
  |
  |
  StreamEncoder -> StreamMuxer.readStreamEncoderOutput(thread start)(while getOMXEncoder() -> read ) ->  QIPCamClient.mVideoElementryCBList
'/

  QIPCamTest --> QIPCam: QIPCam.startStreamRecord()
  QIPCam --> QIPCamClient: QIPCamClient.startStreamRecord()
  QIPCamClient --> QIPCamService: QIPCamService.startStreamRecord()
  QIPCamService --> QIPCamRecorder: QIPCamRecorder.startStreamRecord()
  QIPCamRecorder --> QIPCamCameraSource: QIPCamCameraSource.startStream()
  QIPCamCameraSource --> VideoSource: VideoSource.startCameraSource()
  VideoSource --> CameraAPI2: CameraAPI2.startRecording()
  CameraAPI2 --> CameraAPI2: cancelRequests(PreviewRequest)

  /'-----------Step1 -

    IGraphicBufferProducer -> Surface -> Request

    IGraphicBufferConsumer -> BufferItemConsumer -> setFrameAvailableListener(FrameListener) ->
                              onFrameAvailable -> FrameListener::handleBuffer -> VideoSource::handleCameraBuffer
  '/
  CameraAPI2 --> CameraAPI2:   setupVideoQueues()



'-----------Step2 - createStream'

  CameraAPI2 --> CameraDeviceUser:   CameraDeviceUser.beginConfigure()
  CameraAPI2 --> CameraDeviceUser:   CameraDeviceUser.createStream(Video)
  CameraAPI2 --> CameraDeviceUser:   CameraDeviceUser.endConfigure()



'-----------Step3 - Set Video Callback & Request'

  CameraAPI2 -> CameraAPI2 : PreviewRequest.addSurface()
  CameraAPI2 -> CameraDeviceUser : CameraDeviceUser.submitRequest(PreviewRequest)

  CameraAPI2 --> VideoSource :  
  VideoSource --> QIPCamCameraSource:  
  QIPCamCameraSource --> VideoSource : VideoSource.addConsumer(StreamTopology(streamId).streamSource)
  VideoSource --> QIPCamCameraSource:  
  QIPCamCameraSource --> QIPCamRecorder:  
  QIPCamRecorder --> QIPCamMuxer:  QIPCamMuxer.start(streamId) -> readStreamEncoderOutput
  QIPCamMuxer --> QIPCamRecorder:


  /'-----------Step1 -
    IGraphicBufferProducer -> Surface -> Request

    IGraphicBufferConsumer -> BufferItemConsumer -> setFrameAvailableListener(FrameListener) ->
    FrameListener.onFrameAvailable -> FrameListener::handleBuffer -> PreviewSource::handlePreviewBuffer ->
    PreviewSource.BufferProducerImpl（IBufferProducer).`notifyBuffer` -> AnalyticStream.BufferConsumerImpl（IBufferConsumer）.onFrameAvailable -> AnalyticStream.onFrameAvailable ->
    QCameraVAFramework.processFrame(StreamBuffer frame) -> QCameraVAFramework.process() -> QCameraVAFramework.algModule->methods->process(handle,&mVAFrame.vaFrame, &needHiRes);
  '/
  QIPCamRecorder --> AnalyticStream:  AnalyticStream::startStream()
  AnalyticStream --> AnalyticStream:  IBufferProducer(PreviewSource) -> addConsumer()
  AnalyticStream --> QIPCamRecorder:  













  end /'結束startStream'/
end  /'結束startTwoStreamRecord'/
````





codecName=OMX.qcom.video.encoder.avc





VA Control flow:
- QIPCamRecorder -> AnalyticStream -> VA Framework

Buffer flow:
- Video/Preview StreamSource -> AnalyticStream -> VA Framework -> (Alg1, Alg2)

Event flow:
- VA Framework -> QIPCamRecorder -> client





* beginConfigure must be called before any call to deleteStream, createStream,
 * or endConfigure.  It is not valid to call this when the device is not idle.
