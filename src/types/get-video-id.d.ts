declare module 'get-video-id' {
  export interface VideoMetadata {
    id: string;
    service: string;
  }

  const getVideoId: (url: string) => VideoMetadata;
  export default getVideoId;
}
