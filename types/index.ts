export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: PlanTypes;
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
}

export interface IPerson {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  role: string;
}

export interface IImages {
  hero: string | null;
  cover: string | null;
  promo: IImage[];
  logo: string | null;
  background: string | null;
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
  name: string | null;
  description: string | null;
  concerts: IConcert[] | null;
  image: string | null;
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
  author: string | null;
  description: string | null;
}

export type StatusTypes = "UNPUBLISHED" | "DRAFT" | "PUBLISHED";
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
export type PlayerTypes = "SPOTIFY" | "SOUNDCLOUD";
export type DisplayTypes = "LIGHT" | "DARK";
export type PlanTypes = "LITE" | "BASIC" | "PRO";
