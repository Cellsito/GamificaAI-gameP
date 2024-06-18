import { ImageFiltering, ImageSource, Loader, Sound } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logo_vert from "./images/logo-vertical.png";
import gamificas from "./images/gmificacion.png";

import phoenix from "./images/phoenix.png";
import delsin from "./images/delsin.png";
import spy from "./images/spy.png"

import { TiledResource } from "@excaliburjs/plugin-tiled";

import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic.tsx?url"
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url"
import tsxBiliotecaPath from "./maps/tileset_biblioteca.tsx?url"

import tmxMapaPath from "./maps/showroom.tmx?url"

import playerSpritePath from "./sprites/Dante.png"

import sariasong from "./sounds/zelda.mp3"

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  Logo_v: new ImageSource(logo_vert),
  PlayerSpriteSheet: new ImageSource(playerSpritePath, { filtering: ImageFiltering.Pixel }),
  Gamificasa: new ImageSource(gamificas),

  Phoenix: new ImageSource(phoenix),
  Delsin: new ImageSource(delsin),
  Spy: new ImageSource(spy),

  Saria_s: new Sound(sariasong),

  Mapa: new TiledResource(tmxMapaPath, {
    pathMap: [
      {path: "showroom.tmx", output: tmxMapaPath},
      {path: "Room_Builder_32x32.png", output: pngTilesetPath},
      {path: "tileset_paredes.tsx", output: tsxParedesPath},
      {path: "tileset_generic.tsx", output: tsxGenericPath},
      {path: "tileset_estoque.tsx", output: tsxEstoquePath},
      {path: "tileset_biblioteca.tsx", output: tsxBiliotecaPath},
    ]
  })
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
