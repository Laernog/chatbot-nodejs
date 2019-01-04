const prompt = require ('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1');

const chatbot = new watson({
    username: '3e4164d7-3056-41c4-8d25-6711db122dcb',
    password: 'XZWft60sVi27',
    version: '2018-02-16',
});

const workspace_id = '103633a9-396a-4388-b599-32118da1e124';

//Começamos com a conversação com uma mensagem vazia, para que o chatbot seja inicialiazado e caia no wellcome
chatbot.message({workspace_id}, trataResposta);

let fimDeConversa = false;



function trataResposta(err, resposta) {
    if (err){
        console.log(err); //Caso tenha erro
        return;
    }

    //Detecta a intenção do Usuário
    if (resposta.intents.length > 0){
        console.log('Eu detectei a intenção: ' + resposta.intents[0].intent);
        if(resposta.intents[0].intent == 'despedida'){
            fimDeConversa = true;
        }
    }
       
    //Exibe a resposta do diálogo, caso haja
    if(resposta.output.text.lengh > 0){
        console.log(resposta.output.text[0])
    }
   
    if(!fimDeConversa){
        const mensagemUsuario = prompt('>>');
        chatbot.message({
            workspace_id,
            input: {text: mensagemUsuario},
            context: resposta.context
        }, trataResposta);
    }    
}