import { ImageSource, Loader } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logo_vert from "./images/logo-vertical.png";
import gamificas from "./images/gmificacion.png"

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  Logo_v: new ImageSource(logo_vert),
  Gamificasa: new ImageSource(gamificas),
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
