import { Actor, Animation, CollisionType, Color, Engine, Keys, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    // propriedades do player
    private velocidade: number = 150

    // configuração do player
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height:32,
            name: "cleber",
            color: Color.fromHex("20aaff"),
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {
        // config sprite do player
        const playerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 4
                }
            }
        })

        let imagemPlayer = playerSpriteSheet.getSprite(3, 0)
        // imagemPlayer.scale = vec(1.3, 1.3)

        this.graphics.add(imagemPlayer)

        // criar animação
        // idle
        // idle esquerda
        const leftIdle = new Animation ({
            frames: [
                {graphic: playerSpriteSheet.getSprite(12, 1)},
                {graphic: playerSpriteSheet.getSprite(13, 1)},
                {graphic: playerSpriteSheet.getSprite(14, 1)},
                {graphic: playerSpriteSheet.getSprite(15, 1)},
                {graphic: playerSpriteSheet.getSprite(16, 1)},
                {graphic: playerSpriteSheet.getSprite(17, 1)},
            ],
            frameDuration: 70
        })
        
        this.graphics.add("left-idle", leftIdle)
        this.graphics.use("left-idle")


        // configurar player para evento "hold"
        engine.input.keyboard.on("hold", (event) => {
            // detectar qualtecla está precionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:                          
                    // mover para esquerda
                    this.vel.x = -this.velocidade
                    break;

                case Keys.Right:
                case Keys.D:
                    // mover para direita
                    this.vel.x = this.velocidade
                    break;

                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade
                    break;

                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade
                    break;
                
                default:
                    // zera velocidade do player
                    this.vel = vec(0, 0)
                    break;
            }
        })

        // configura player para evento "release"
        engine.input.keyboard.on("release", (event) => {
            // para o player
            // para lateralmente
            if (
                event.key == Keys.A || 
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                // zerar vel horizontal
                this.vel.x = 0
            }

            // para verticalmente
            if (
                event.key == Keys.W || 
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                // zerar vel vertical
                this.vel.y = 0
            }
        })
    }

}