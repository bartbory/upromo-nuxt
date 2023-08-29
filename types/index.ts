export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  plan: PlanTypes;
}
export interface IRegister {
  id: string;
  name: string;
  email: string;
  password: string;
  plan: PlanTypes;
}

export interface IButton {
  size: SizeTypes;
  styleType: StyleTypes;
  msg?: string;
  icon?: string;
  type: "button" | "submit";
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
  additionalLink: string | null;
  additionalLinkName: string | null;
  tour: ITour | null;
  displayMode: DisplayTypes;
  customColor: string | null;
  language: LanguageTypes;
}

export interface IAlbumList {
  id: string;
  artistName: string;
  albumName: string;
  artistSlug: string;
  albumSlug: string;
  releaseDate: string;
  imageCoverPath: string;
  secret: string;
}

export interface IFiles {
  id: string;
  name: string;
  path: string;
  size: number;
  extention: string;
}

export interface IPerson {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  role: string;
}

export interface IImages {
  hero: string;
  cover: string;
  promo: IImage[];
  logo: string | null;
  background: string | null;
}

export interface ILinks {
  facebook: string | null;
  instagram: string | null;
  spotify: string | null;
  tidal: string | null;
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
  displayName: string | null;
}
export interface IConcert {
  id: string;
  location: string;
  date: string;
  link: string | null;
}

export interface IImage {
  id: string;
  name: string;
  path: string;
  size: number;
  author: string | null;
  description: string | null;
}

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
  | "tidal"
  | "file";
export type PlayerTypes = "SPOTIFY" | "SOUNDCLOUD";
export type DisplayTypes = "LIGHT" | "DARK";
export type PlanTypes = "LITE" | "BASIC" | "PRO";
export type LanguageTypes = "PL" | "EN" | "DE" | "ES";
