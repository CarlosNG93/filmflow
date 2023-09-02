-- CreateTable
CREATE TABLE "Pelicula" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "sinopsis" TEXT NOT NULL,
    "anioLanzamiento" INTEGER NOT NULL,
    "duracion" INTEGER NOT NULL,
    "imagenPortada" TEXT NOT NULL,
    "directorId" INTEGER NOT NULL,

    CONSTRAINT "Pelicula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Director" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "biografia" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "Director_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reparto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "biografia" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "Reparto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaPelicula" (
    "peliculaId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "CategoriaPelicula_pkey" PRIMARY KEY ("peliculaId","categoriaId")
);

-- CreateTable
CREATE TABLE "RepartoPelicula" (
    "peliculaId" INTEGER NOT NULL,
    "repartoId" INTEGER NOT NULL,

    CONSTRAINT "RepartoPelicula_pkey" PRIMARY KEY ("peliculaId","repartoId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- AddForeignKey
ALTER TABLE "Pelicula" ADD CONSTRAINT "Pelicula_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Director"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaPelicula" ADD CONSTRAINT "CategoriaPelicula_peliculaId_fkey" FOREIGN KEY ("peliculaId") REFERENCES "Pelicula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaPelicula" ADD CONSTRAINT "CategoriaPelicula_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepartoPelicula" ADD CONSTRAINT "RepartoPelicula_peliculaId_fkey" FOREIGN KEY ("peliculaId") REFERENCES "Pelicula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepartoPelicula" ADD CONSTRAINT "RepartoPelicula_repartoId_fkey" FOREIGN KEY ("repartoId") REFERENCES "Reparto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
