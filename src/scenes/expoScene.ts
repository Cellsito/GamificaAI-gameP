import { Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";

export class expoScene extends Scene {
    
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })

    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Black

        // carregar o mapa
        let tiledMap = Resources.Mapa

        // definir offset para renderização do mapa
        let offsetX = 135
        let offsety = 80

        // adcionar o mapa na cena
        tiledMap.addToScene(this, {
            pos: vec( offsetX, offsety)
        })

        // zoom da camera para aumentar a visualização
        this.camera.zoom = 1.25

        // criar e config Player
        let jogador = new Player()

        jogador.z = 1

        // adicionar o player na cena
        this.add(jogador)
    }
}