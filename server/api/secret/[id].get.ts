import { DisplayMode, Player, PrismaClient } from "@prisma/client";
import { IAlbum } from "~/types";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    const result = await prisma.album.findUnique({
      where: { id: id },
      include: {
        files: true,
        imagesPromo: {
          select: {
            id: true,
            path: true,
            author: true,
            description: true,
            name: true,
            size: true,
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

      let tourData;

      if (
        result.tourName ||
        result.tourDescription ||
        result.tourImage ||
        result.tourLink ||
        result.tourLinkDisplayName
      ) {
        tourData = {
          name: result.tourName,
          description: result.tourDescription,
          image: result.tourImage,
          link: result.tourLink,
          displayName: result.tourLinkDisplayName,
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
        displayMode: displayMode(),
        customColor: result.customColor,
      };
      return { data: albumData };
    }
  } catch (error: any) {
    console.log("error");
  }
});
