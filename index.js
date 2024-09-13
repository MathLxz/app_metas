const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = 'Bem vindo';
let meta = {
    value: 'Codar todo dia',
    checked: false
}
let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({ message: 'Insira uma meta:' })

    if (meta.length == 0) {
        mensagem = 'A meta não pode ser em branco!';
        return
    }

    metas.push({ value: meta, checked: false })
    mensagem = 'Meta cadastrada';
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: 'Use as setas para navegar, espaço para selecionar e enter para confimar.',
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false;
    })

    if (respostas.length == 0) {
        mensagem = 'Nenhuma meta selecionada.';
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true;
    })
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((m) => {
        return m.checked
    })

    if (realizadas.length == 0) {
       mensagem = 'Nenhuma meta realizada.';
        return
    }

    await select({
        message: `Metas realizadas: ${realizadas.length}`,
        choices: [...realizadas]
    })

}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((m) => {
        return { value: m.value, checked: false }
    })

    const deletar = await checkbox({
        message: 'Selecione metas para deletar',
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if (deletar.length == 0) {
        mensagem = 'Nenhum item selecionado.';
        return
    }

    deletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    mensagem = 'Deleção realizada';

}

const metasAbertas = async () => {
    const abertas = metas.filter((m) => {
        return !m.checked
    })

    if (abertas.length == 0) {
       mensagem = 'Nenhuma meta aberta.';
        return
    }

    await select({
        message: `Metas abertas: ${abertas.length}`,
        choices: [...abertas],
    })
}

const mostrarMensagem = () => {
    console.clear();
    if (mensagem != '') {
        console.log(mensagem);
        console.log();
        mensagem = '';
    }
}

const start = async () => {
    
    while (true) {
        mostrarMensagem();
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
                // console.log(metas);
                break;
            case 'listar':
                await listarMetas();
                break;
            case 'realizadas':
                await metasRealizadas();
                break;
            case 'abertas':
                await metasAbertas();
                break;
            case 'deletar':
                await deletarMetas();
                break;
            case 'sair':
                console.log('Saindo');
                return

        }
    }
}

start();