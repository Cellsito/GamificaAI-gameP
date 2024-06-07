import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {

    elementoTextoG?: HTMLElement

    
    fadeInElement(elemento: HTMLElement) {
        // pegar opacidade do elemento HTML
        let opacidade2 = parseFloat(elemento.style.opacity)

        // repetir diminuição da opacidade
        setInterval(() => {
            // se o elemento está invisível
            if (opacidade2 < 1) {
                // almentar opacidede
                opacidade2 += 0.01
    
                // atualizar a opacidade do elemento
                elemento.style.opacity = opacidade2.toString()
            }

        }, 15)

    }

    // método para esmaecer elemento Html
    fadeOutElement(elemento: HTMLElement) {
        // pegar opacidade do elemento HTML
        let opacidade = parseFloat(elemento.style.opacity)

        // repetir diminuição da opacidade
        setInterval(() => {
            // se o elemento está visível
            if (opacidade > 0) {
                // diminuir opacidede
                opacidade -= 0.03

                // atualizar a opacidade do elemento
                elemento.style.opacity = opacidade.toString()
            }

        }, 30)

    }

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })

    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")

        // criar elemento com descrição de empresa
        this.elementoTextoG = document.createElement("div") as HTMLElement
        // opacidade = 1 visível
        this.elementoTextoG.style.opacity = "0"

        // inserir elementoTexto no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTextoG)

        // adicionar classe na div criada (elementoTexto)
        this.elementoTextoG.classList.add("gamifications")

        this.elementoTextoG.innerHTML = `
         <h2>O que é gamificação?</h2>
         <p>
           Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.
        </p>`

        this.fadeInElement(this.elementoTextoG!)

        let actorGami = new Actor({
            pos: vec(300, engine.halfDrawHeight)
        })

        // carregando imagem do logoV
        let imageGami = Resources.Gamificasa.toSprite()

        // config tamanho/zoom
        imageGami.scale = vec(0.7, 0.7)

        // add imagem no actor
        actorGami.graphics.add(imageGami)

        // renderiza actor na cena
        this.add(actorGami)

        // monitora tecla pressionada
        this.input.keyboard.on("press", (event) => {
            // caso pressionado "Enter", próxima cena
            if (event.key == Keys.Enter) {
                // criar transição elementoTexto
                this.fadeOutElement(this.elementoTextoG!)

                engine.goToScene("exposicao")
            }
        })

    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoTextoG?.remove()
    }
}