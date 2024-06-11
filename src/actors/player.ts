import { Actor, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor {
    // propriedades do player
    private velocidade: number = 180 

    // configuração do player
    constructor() {
        super({
            pos: vec(599, 608),
            width: 32,
            height:32,
            name: "cleber",
            color: Color.Red
        })
    }

    onInitialize(engine: Engine<any>): void {
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