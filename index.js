const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Codar todo dia',
    checked: false
}
let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({ message: 'Insira uma meta:' })

    if (meta.length == 0) {
        console.log('A meta não pode ser em branco!');
        return
    }

    metas.push({ value: meta, checked: false })
}

const listarMetas = async () =>{
    const respostas = await checkbox({
        message: 'Use as setas para navegar, espaço para selecionar e enter para confimar.',
        choices: [...metas],
        instructions: false,
    })

    if (respostas.length == 0) {
        console.log('Nenhuma meta selecionada.');
        return
    }

    metas.forEach((m) =>{
        m.checked = false;
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true;
    })
}


const start = async () => {

    while (true) {

        const opcao = await select({
            message: 'Menu >',
            choices: [
                {
                    name: 'Cadastrar meta',
                    value: 'cadastrar'
                },
                {
                    name: 'Listar metas',
                    value: 'listar'
                },
                {
                    name: 'Metas realizadas',
                    value: 'realizadas'
                },
                {
                    name: 'Metas abertas',
                    value: 'abertas'
                },
                {
                    name: 'Deletar metas',
                    value: 'deletar'
                },
                {
                    name: 'Sair',
                    value: 'sair'
                },
            ]
        })

        switch (opcao) {
            case 'cadastrar':
                await cadastrarMeta();
                console.log(metas);
                
                break;
            case 'listar':
                await listarMetas();
                break;
            case 'realizadas':
                console.log('Metas Realizadas');
                break;
            case 'abertas':
                console.log('Metas abertas');
                break;
            case 'deletar':
                console.log('Deletar metas');
                break;
            case 'sair':
                console.log('Saindo');
                return

        }
    }
}

start()