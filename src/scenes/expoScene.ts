import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
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

        // adicionar colisão em cada objeto
        // pegar camada de colisores
        let camadaObjetosColisores = tiledMap.getObjectLayers("ObjetosColisores")[0]

        // percorrer objetos com foreach e para cada objeto renderizar um actor
        camadaObjetosColisores.objects.forEach(objeto => {
            // configurar um actor
            const objetoAtual = new Actor({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsety + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed,
                // color: Color.Red
            })

            // adicionar colisores na cena
            this.add(objetoAtual)
        })

    }
}