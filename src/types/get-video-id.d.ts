declare module 'get-video-id' {
  interface VideoMetadata {
    id: string;
    service: string;
  }

  const getVideoId: (url: string) => VideoMetadata;
  export = getVideoId;
}
