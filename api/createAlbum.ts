import { DisplayMode, PrismaClient, Status } from "@prisma/client";
import { IAlbum } from "../types";
import slugGenerator from "../composables/slugGenerator";
import createSecret from "../composables/createSecret";
import { Player } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createAlbum(data: IAlbum, userId: string) {
  const player = () =>
    data.player === "SPOTIFY" ? Player.SPOTIFY : Player.SOUNDCLOUD;
  const displayMode = () =>
    data.displayMode === "LIGHT" ? DisplayMode.LIGHT : DisplayMode.DARK;
  const status = () => {
    switch (data.status) {
      case "PUBLISHED":
        return Status.PUBLISHED;
        break;
      case "DRAFT":
        return Status.DRAFT;
        break;
      case "UNPUBLISHED":
        return Status.UNPUBLISHED;
        break;
      default:
        return Status.UNPUBLISHED;
        break;
    }
  };
  await prisma.album.create({
    data: {
      secret: createSecret(),
      albumName: data.albumName,
      albumSlug: slugGenerator(data.albumName),
      artistName: data.artistName,
      artistSlug: slugGenerator(data.artistName),
      releaseDate: data.releaseDate,
      description: data.description,
      label: data.label,
      genre: data.genre,
      player: player(),
      playerSoundcloud: data.playerSoundcloud,
      playerSpotify: data.playerSpotify,
      youtubeVideos: data.youtubeVideos,
      contact: {
        connectOrCreate: data.contact.map((c) => {
          return {
            where: { id: c.id },
            create: {
              name: c.name,
              email: c.email,
              phone: c.phone,
              role: c.role,
            },
          };
        }),
      },
      imageHero: {
        connect: {
          path: data.images.hero,
        },
      },
      imageCover: { connect: { path: data.images.cover?.path } },
      imageBackgroud: { connect: { path: data.images.background?.path } },
      imagesPromo: {
        connect: data.images.promo.map((i) => {
          return {
            path: i.path,
          };
        }),
      },
      tourName: data.tour?.name,
      tourDescription: data.tour?.description,
      tourImage: data.tour?.image?.path,
      tourLink: data.tour?.link,
      linkFacebook: data.links.facebook,
      linkInstagram: data.links.instagram,
      linkSoundcloud: data.links.soundcloud,
      linkSpotify: data.links.spotify,
      linkTiktok: data.links.tiktok,
      linkTwitter: data.links.twitter,
      linkYoutube: data.links.youtube,
      status: status(),
      displayMode: displayMode(),
      createdBy: { connect: { id: userId } },
    },
  });
}
