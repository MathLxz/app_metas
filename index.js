const { select } = require('@inquirer/prompts')


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
                console.log('Cadastrando meta');
                break;
            case 'listar':
                console.log('Listando metas');
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