import { PrismaClient } from "@prisma/client";
import type { DisplayTypes, PlayerTypes } from "~/types";
import { IAlbum } from "~/types";
import slugGenerator from "~/composables/slugGenerator";
import createSecret from "~/composables/createSecret";

const prisma = new PrismaClient();

interface IBodyAlbumCreate extends IAlbum {
  uid: string;
  prompt: void;
}

export default defineEventHandler(async (event) => {
  const body: IBodyAlbumCreate = await readBody(event);
  const player = () => (body.player === "SPOTIFY" ? "SPOTIFY" : "SOUNDCLOUD");
  const displayMode = () => (body.displayMode === "LIGHT" ? "LIGHT" : "DARK");
  try {
    //@ts-ignore
    const sentPrompt = body.prompt;
    const result = await prisma.album.create({
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
        secret: createSecret(),
        youtubeVideos: body.youtubeVideos,
        imageCover: { connect: { path: body.images.cover } },
        imageHero: { connect: { path: body.images.hero } },
        imageBackground: body.images.background
          ? { connect: { path: body.images.background } }
          : undefined,
        imagesPromo: {
          connect: body.images.promo.flatMap((i) => {
            return {
              id: i.id,
            };
          }),
        },
        contact: {
          connect: body.contact.flatMap((c) => {
            return {
              id: c.id,
            };
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
        files: {
          connect: body.files.flatMap((f) => {
            return {
              id: f.id,
            };
          }),
        },
      },
    });
    return { data: sentPrompt };
  } catch (error) {
    console.log(error);
  }
});
