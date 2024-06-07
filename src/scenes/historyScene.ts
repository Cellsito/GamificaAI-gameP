import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene {
    // declaração do elemento texto
    elementoTexto?: HTMLElement

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
        this.elementoTexto = document.createElement("div") as HTMLElement
        // opacidade = 1 visível
        this.elementoTexto.style.opacity = "0"
        
        // inserir elementoTexto no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        // adicionar classe na div criada (elementoTexto)
        this.elementoTexto.classList.add("sobre-gamifica")

        // adiciona titulo de paragráfo dentro da div
        this.elementoTexto.innerHTML = `<h2>Sobre o GamificaAI</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.
        </p>`

        this.fadeInElement(this.elementoTexto!)

        // actor logo vertical
        let actorLogoV = new Actor ({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight - 50)
        })

        // carregando imagem do logoV
        let imagemLogoV = Resources.Logo_v.toSprite()

        // config tamanho/zoom
        imagemLogoV.scale = vec (0.7, 0.7)

        // add imagem no actor
        actorLogoV.graphics.add(imagemLogoV)
        
        // renderiza actor na cena
        this.add(actorLogoV)

        // monitora tecla pressionada
        this.input.keyboard.on("press", (event) => {
            // caso pressionado "Enter", próxima cena
            if (event.key == Keys.Enter) {
                // criar transição elementoTexto
                this.fadeOutElement(this.elementoTexto!)

                engine.goToScene("gamificacao")
            }
        })
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoTexto?.remove()
    }
}