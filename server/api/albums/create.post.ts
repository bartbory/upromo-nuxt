import { DisplayMode, Player, PrismaClient } from "@prisma/client";
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
  console.log(event);
  const player = () =>
    body.player === "SPOTIFY" ? Player.SPOTIFY : Player.SOUNDCLOUD;
  const displayMode = () =>
    body.displayMode === "LIGHT" ? DisplayMode.LIGHT : DisplayMode.DARK;
  

  console.log(body);
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
          create: body.contact.flatMap((c) => {
            return {
              email: c.email,
              name: c.name,
              role: c.role,
              phone: c.phone,
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
    console.log(result);
    return { data: sentPrompt };
  } catch (error) {
    console.log(error);
  }
});
