export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface IButton {
  size: SizeTypes;
  styleType: StyleTypes;
  msg?: string;
  icon?: string;
}

export interface IAlbum {
  id: string;
  secret: string;
  artistName: string;
  artistSlug: string;
  albumName: string;
  albumSlug: string;
  releaseDate: string;
  label: string;
  genre: string;
  description: string;
  player: PlayerTypes;
  playerSoundcloud: string | null;
  playerSpotify: string | null;
  youtubeVideos: string | null;
  contact: IPerson[];
  links: ILinks;
  images: IImages;
  files: IFiles[];
  tour: ITour | null;
  status: StatusTypes;
  displayMode: DisplayTypes;
}

export interface IFiles {
  name: string;
  path: string;
  type: string;
}

export interface IPerson {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  role: string;
}

export interface IImages {
  hero: IImage | null;
  cover: IImage | null;
  promo: IImage[];
  logo: string | null;
  background: IImage | null;
}

export interface ILinks {
  facebook: string | null;
  instagram: string | null;
  spotify: string | null;
  youtube: string | null;
  soundcloud: string | null;
  tiktok: string | null;
  twitter: string | null;
}
export interface ITour {
  name: string;
  description: string | null;
  concerts: IConcert[] | null;
  image: IImage | null;
  link: string | null;
}
export interface IConcert {
  id: string;
  location: string;
  date: string;
  link: string | null;
}

export interface IImage {
  path: string;
  createdBy: string | null;
  alt: string | null;
}

export type StatusTypes = "unpublished" | "draft" | "published";
export type StyleTypes =
  | "primary"
  | "secondary"
  | "neutral"
  | "disable"
  | "danger"
  | "success";
export type SizeTypes = "small" | "normal" | "big";

export type SocialTypes =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "spotify"
  | "soundcloud"
  | "twitter"
  | "file";
export type PlayerTypes = "spotify" | "soundcloud";
export type DisplayTypes = "light" | "dark";
