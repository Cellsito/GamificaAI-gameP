import { Actor, Color, Engine, FadeInOut, Font, Keys, Label, Scene, TextAlign, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class welcomeScene extends Scene {

    enterToPlay?: Label

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        // this = essa classe
        this.backgroundColor = Color.Black

        // configura objeto para texto "bemvindo"
        let fraseBemVindo = new Label ({
           text: "Bem vindo ao Portfolio",
           width: 400,
           height: 50,
           pos: vec(engine.drawWidth / 2, 300),  
           font: new Font({
                color: Color.White,
                size: 40,
                textAlign: TextAlign.Center,
                family: "Anta"
           })
        })

        // adiciona a frase na cena
        this.add(fraseBemVindo)

        // configurar Actor do logo
        let actorLogo = new Actor ({
            pos: vec(engine.drawWidth / 2, 430)
        })

        // utilizar imagem do logo
        let imagemLogo = Resources.Logo.toSprite()

        // zoom na imagem - 40% de x, e 40% de y
        imagemLogo.scale = vec (0.4, 0.4)

        // configurar Actor para usar a imagem
        actorLogo.graphics.add(imagemLogo)

        // adiciona Actor logo na tela
        this.add(actorLogo)

        // let enterToPlay = new Label ({
        //     text: 'Pressione "Enter" para iniciar...',
        //     pos: vec(engine.drawWidth / 2, 650),  
        //     font: new Font({
        //          color: Color.White,
        //          size: 15,
        //          textAlign: TextAlign.Center,
        //          family: "Anta"
        //     })
        // })
        
        // this.add(enterToPlay)

        this.enterToPlay = new Label ({
            text: 'Pressione "Enter" para iniciar...',
            pos: vec(engine.halfDrawWidth, 630), 
            font: new Font({
                 color: Color.White,
                 size: 15,
                 textAlign: TextAlign.Center,
                 family: "Anta"
            })
        }) 

        this.add(this.enterToPlay)

        this.enterToPlay?.actions.repeatForever( context => {
            context.fade(0, 1000)
            context.fade(1, 1000)
        })

        // monitora evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            // caso pressionado "Enter", próxima cena
            if (event.key == Keys.Enter) {
                engine.goToScene("historia")
            }
        })
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
    //     this.enterToPlay?.actions.fade(0, 1000)
    //     this.enterToPlay?.actions.fade(1, 1000)
    }
    
}