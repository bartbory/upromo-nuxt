import { DisplayMode, PrismaClient, Status } from "@prisma/client";
import { IAlbum } from "../types";
import slugGenerator from "../helpers/slugGenerator";
import createSecret from "../helpers/createSecret";
import { Player } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createAlbum(data: IAlbum, userId: string) {
  const player = () =>
    data.player === "spotify" ? Player.SPOTIFY : Player.SOUNDCLOUD;
  const displayMode = () =>
    data.displayMode === "light" ? DisplayMode.LIGHT : DisplayMode.DARK;
  const status = () => {
    switch (data.status) {
      case "published":
        return Status.PUBLISHED;
        break;
      case "draft":
        return Status.DRAFT;
        break;
      case "unpublished":
        return Status.UNPUBLISHED;
        break;
      default:
        return Status.UNPUBLISHED;
        break;
    }
  };
  console.log("lapie dane: ", data, userId);
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
          path: data.images.hero?.path,
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

// createAlbum(a, b)
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
