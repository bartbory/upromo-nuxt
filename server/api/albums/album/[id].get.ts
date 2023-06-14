import { DisplayMode, Player, PrismaClient, Status } from "@prisma/client";
import { IAlbum, ITour } from "~/types";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    console.log("album:", id);
    const result = await prisma.album.findUnique({
      where: { id: id },
      include: {
        files: true,
        imagesPromo: {
          select: {
            path: true,
            author: true,
            description: true,
          },
        },
        contact: true,
      },
    });

    let albumData: IAlbum;

    if (result) {
      const player = () =>
        result.player === Player.SPOTIFY ? "SPOTIFY" : "SOUNDCLOUD";
      const displayMode = () =>
        result.displayMode === DisplayMode.LIGHT ? "LIGHT" : "DARK";
      const status = () => {
        switch (result.status) {
          case Status.PUBLISHED:
            return "PUBLISHED";
            break;
          case Status.DRAFT:
            return "DRAFT";
            break;
          case Status.UNPUBLISHED:
            return "UNPUBLISHED";
            break;
          default:
            return "UNPUBLISHED";
            break;
        }
      };

      let tourData;

      if (
        result.tourName ||
        result.tourDescription ||
        result.tourImage ||
        result.tourLink
      ) {
        tourData = {
          name: result.tourName,
          description: result.tourDescription,
          image: result.tourImage,
          link: result.tourLink,
          concerts: null,
        };
      } else {
        tourData = null;
      }

      albumData = {
        id: result.id,
        secret: result.secret,
        albumName: result.albumName,
        albumSlug: result.albumSlug,
        artistName: result.artistName,
        artistSlug: result.artistSlug,
        releaseDate: result.releaseDate,
        label: result.label,
        genre: result.genre,
        description: result.description,
        player: result.player,
        playerSoundcloud: result.playerSoundcloud,
        playerSpotify: result.playerSpotify,
        youtubeVideos: result.youtubeVideos,
        contact: result.contact,
        links: {
          spotify: result.linkSpotify,
          soundcloud: result.linkSoundcloud,
          youtube: result.linkYoutube,
          facebook: result.linkFacebook,
          instagram: result.linkInstagram,
          tiktok: result.linkTiktok,
          twitter: result.linkTwitter,
        },
        images: {
          hero: result.imageHeroPath,
          logo: null,
          cover: result.imageCoverPath,
          promo: result.imagesPromo,
          background: result.imageBackgroundPath,
        },
        files: result.files,
        tour: tourData,
        status: status(),
        displayMode: displayMode(),
      };
      return { data: albumData };
    }
  } catch (error: any) {
    //handle error here
    console.log("error");
  }
});
