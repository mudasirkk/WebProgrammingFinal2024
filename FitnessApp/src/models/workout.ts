export interface Location {
    lat: number;
    lng: number;
  }
  
  export interface WorkoutPost {
    id: string;
    username: string;
    handle: string;
    userImage: string;
    timeAgo: string;
    description: string;
    location: Location;
    distance: {
      value: number;
      unit: 'mi' | 'ft';
    };
    duration: string;
    image?: string;
    likes: number;
    retweets: number;
    replies: number;
  }