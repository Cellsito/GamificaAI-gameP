import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { Npc } from "../actors/npc";

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

        // carregar spawn point do player
        let spawnPoint = tiledMap.getObjectsByName("player_spawn")[0]

        // criar e config Player
        let jogador = new Player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsety))

        jogador.z = 3

        // adicionar o player na cena
        this.add(jogador)

        // pegar spawn point dos npc
        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPointB = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]

        // config npcs
        let npcA = new Npc(
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsety),
            Color.Blue,
            "NpcA"
        )

        let npcB = new Npc(
            vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsety),
            Color.Red,
            "NpcB"
        )

        let npcC = new Npc(
            vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsety),
            Color.Green,
            "NpcC"
        )

        this.add(npcA)
        this.add(npcB)
        this.add(npcC)

        // focar camera no player
        // this.camera.strategy.lockToActor(jogador)
        

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