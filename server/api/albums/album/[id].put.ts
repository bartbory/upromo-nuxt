import { DisplayMode, Player, PrismaClient } from "@prisma/client";
import { IAlbum } from "~/types";
import slugGenerator from "~/composables/slugGenerator";

const prisma = new PrismaClient();

interface IBodyAlbumCreate extends IAlbum {
  uid: string;
  prompt: void;
}

export default defineEventHandler(async (event) => {
  const body: IBodyAlbumCreate = await readBody(event);
  const player = () =>
    body.player === "SPOTIFY" ? Player.SPOTIFY : Player.SOUNDCLOUD;
  const displayMode = () =>
    body.displayMode === "LIGHT" ? DisplayMode.LIGHT : DisplayMode.DARK;
  try {
    //@ts-ignore
    const sentPrompt = body.prompt;
    const result = await prisma.album.update({
      where: { id: body.id },
      data: {
        artistName: body.artistName,
        artistSlug: slugGenerator(body.artistName),
        albumName: body.albumName,
        albumSlug: slugGenerator(body.albumName),
        releaseDate: body.releaseDate,
        description: body.description,
        label: body.label,
        genre: body.genre,
        player: player(),
        playerSoundcloud: body.playerSoundcloud,
        playerSpotify: body.playerSpotify,
        displayMode: displayMode(),
        tourName: body.tour ? body.tour.name : null,
        tourDescription: body.tour ? body.tour.description : null,
        tourImage: body.tour ? body.tour.image : null,
        tourLink: body.tour ? body.tour.link : null,
        tourLinkDisplayName: body.tour ? body.tour.displayName : null,
        secret: body.secret,
        youtubeVideos: body.youtubeVideos,
        imageCover: { connect: { path: body.images.cover } },
        imageHero: { connect: { path: body.images.hero } },
        imageBackground: body.images.background
          ? { connect: { path: body.images.background } }
          : undefined,
        imagesPromo: {
          set: body.images.promo.flatMap((i) => {
            return {
              id: i.id,
            };
          }),
        },
        contact: {
          set: body.contact.flatMap((c) => {
            return { id: c.id };
          }),
        },
        createdBy: { connect: { id: body.uid } },
        linkFacebook: body.links.facebook ? body.links.facebook : undefined,
        linkInstagram: body.links.instagram ? body.links.instagram : undefined,
        linkSoundcloud: body.links.soundcloud
          ? body.links.soundcloud
          : undefined,
        linkSpotify: body.links.spotify ? body.links.spotify : undefined,
        linkTiktok: body.links.tiktok ? body.links.tiktok : undefined,
        linkTwitter: body.links.twitter ? body.links.twitter : undefined,
        linkYoutube: body.links.youtube ? body.links.youtube : undefined,
        linkTidal: body.links.tidal ? body.links.tidal : undefined,
        files: {
          set: body.files.flatMap((f) => {
            return {
              id: f.id,
            };
          }),
        },
        customColor: body.customColor,
        language: body.language,
        additionalLink: body.additionalLink,
        additionalLinkName: body.additionalLinkName,
      },
    });
    return { data: sentPrompt };
  } catch (error) {
    console.log(error);
  }
});
