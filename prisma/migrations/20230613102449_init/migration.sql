-- CreateEnum
CREATE TYPE "Player" AS ENUM ('SPOTIFY', 'SOUNDCLOUD');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PUBLISHED', 'DRAFT', 'UNPUBLISHED');

-- CreateEnum
CREATE TYPE "DisplayMode" AS ENUM ('LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "Plans" AS ENUM ('LITE', 'BASIC', 'PRO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "plan" "Plans" NOT NULL DEFAULT 'LITE',
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "uploadById" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "author" TEXT,
    "description" TEXT,
    "uploadById" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "artistSlug" TEXT NOT NULL,
    "albumName" TEXT NOT NULL,
    "albumSlug" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "player" "Player" NOT NULL,
    "playerSoundcloud" TEXT,
    "playerSpotify" TEXT,
    "youtubeVideos" TEXT,
    "imageHeroPath" TEXT NOT NULL,
    "imageCoverPath" TEXT NOT NULL,
    "imageBackgroundPath" TEXT,
    "tourName" TEXT,
    "tourDescription" TEXT,
    "tourLink" TEXT,
    "tourImage" TEXT,
    "linkSpotify" TEXT,
    "linkSoundcloud" TEXT,
    "linkYoutube" TEXT,
    "linkFacebook" TEXT,
    "linkInstagram" TEXT,
    "linkTiktok" TEXT,
    "linkTwitter" TEXT,
    "status" "Status" NOT NULL,
    "displayMode" "DisplayMode" NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AlbumToContact" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_promo-image" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumToFile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "File_id_key" ON "File"("id");

-- CreateIndex
CREATE INDEX "File_uploadById_idx" ON "File"("uploadById");

-- CreateIndex
CREATE UNIQUE INDEX "Media_id_key" ON "Media"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_path_key" ON "Media"("path");

-- CreateIndex
CREATE INDEX "Media_uploadById_idx" ON "Media"("uploadById");

-- CreateIndex
CREATE UNIQUE INDEX "Album_id_key" ON "Album"("id");

-- CreateIndex
CREATE INDEX "Album_imageHeroPath_idx" ON "Album"("imageHeroPath");

-- CreateIndex
CREATE INDEX "Album_imageCoverPath_idx" ON "Album"("imageCoverPath");

-- CreateIndex
CREATE INDEX "Album_createdById_idx" ON "Album"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_key" ON "Contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToContact_AB_unique" ON "_AlbumToContact"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToContact_B_index" ON "_AlbumToContact"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_promo-image_AB_unique" ON "_promo-image"("A", "B");

-- CreateIndex
CREATE INDEX "_promo-image_B_index" ON "_promo-image"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToFile_AB_unique" ON "_AlbumToFile"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToFile_B_index" ON "_AlbumToFile"("B");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploadById_fkey" FOREIGN KEY ("uploadById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_uploadById_fkey" FOREIGN KEY ("uploadById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_imageHeroPath_fkey" FOREIGN KEY ("imageHeroPath") REFERENCES "Media"("path") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_imageCoverPath_fkey" FOREIGN KEY ("imageCoverPath") REFERENCES "Media"("path") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_imageBackgroundPath_fkey" FOREIGN KEY ("imageBackgroundPath") REFERENCES "Media"("path") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToContact" ADD CONSTRAINT "_AlbumToContact_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToContact" ADD CONSTRAINT "_AlbumToContact_B_fkey" FOREIGN KEY ("B") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_promo-image" ADD CONSTRAINT "_promo-image_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_promo-image" ADD CONSTRAINT "_promo-image_B_fkey" FOREIGN KEY ("B") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToFile" ADD CONSTRAINT "_AlbumToFile_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToFile" ADD CONSTRAINT "_AlbumToFile_B_fkey" FOREIGN KEY ("B") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
