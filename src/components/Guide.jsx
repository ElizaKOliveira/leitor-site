import { useState } from "react";
import { ArrowLeft } from "./Icons";

const CFG = {
  version: "1.0.0",
  date: "16/11/2026",
  installer: "https://github.com/ElizaKOliveira/integracar-processos/releases/download/v1.0.0/Setup-LeitorDeProcessos-1.0.0.exe",
  hash: "D7388AB1273BC8BD67CF7C84FE0D82F44A59E6C04841F1F03E79435B292CD0CE",
  sheet: "https://docs.google.com/spreadsheets/d/1yuWIBFzyXWmXOKeVL55KItCikqT4J4rw3vSQjeTLeEY/copy",
  contact: "elizakyoliveira@gmail.com",
  repo: "https://github.com/ElizaKOliveira/integracar-processos",
};

function Shot({ name, hint }) {
  const [ok, setOk] = useState(true);
  return (
    <figure>
      {ok ? (
        <img src={`/guide/${name}.png`} alt={hint} loading="lazy" onError={() => setOk(false)} />
      ) : (
        <div className="slot">
          Print: {hint}
          <br />
          <code>public/guide/{name}.png</code>
        </div>
      )}
    </figure>
  );
}

function detectOS() {
  try {
    const saved = localStorage.getItem("so-guia");
    if (saved === "linux" || saved === "windows") return saved;
  } catch {}
  const ua = navigator.userAgent;
  return /Linux/i.test(ua) && !/Android/i.test(ua) ? "linux" : "windows";
}

export default function Guide({ t, onBack }) {
  const [so, setSo] = useState(detectOS);

  const choose = (v) => {
    setSo(v);
    try {
      localStorage.setItem("so-guia", v);
    } catch {}
  };

  return (
    <>
      <div className="guide-bar">
        <button type="button" className="back" onClick={onBack}>
          <ArrowLeft /> {t.install.back}
        </button>
        <div className="lang" role="tablist" aria-label="Sistema operacional">
          <button type="button" role="tab" aria-selected={so === "windows"} className={so === "windows" ? "lang-btn active" : "lang-btn"} onClick={() => choose("windows")}>
            Windows
          </button>
          <button type="button" role="tab" aria-selected={so === "linux"} className={so === "linux" ? "lang-btn active" : "lang-btn"} onClick={() => choose("linux")}>
            Linux
          </button>
        </div>
      </div>

      <main className="guide" data-so={so}>
        <h1>
          Leitor de processos
          <span>IntegraCar</span>
        </h1>
        <p className="sub">Guia de instalação e uso · v{CFG.version} · atualizado em {CFG.date}</p>

        <p>
          O Leitor de Processos lê a capa dos processos do Simlam/CAR, mostra os dados para você conferir e grava tudo em uma planilha. <strong>A leitura acontece dentro do seu computador</strong>: o documento não é enviado para a internet.
        </p>

        <nav className="toc" aria-label="Índice">
          <strong>Neste guia</strong>
          <ol>
            <li><a href="#baixar">Baixar e instalar</a></li>
            <li><a href="#usar">Usar no dia a dia</a></li>
            <li><a href="#planilha">Gravar no Google Sheets (opcional)</a></li>
            <li><a href="#atualizar">Atualizar e desinstalar</a></li>
            <li><a href="#problemas">Problemas comuns</a></li>
            <li><a href="#privacidade">Privacidade e seus dados</a></li>
          </ol>
        </nav>

        <h2 id="baixar">1. Baixar e instalar</h2>

        <div className="so-win">
          <p>
            <strong>O que você precisa:</strong> um computador com Windows 10 ou 11 (64 bits) e cerca de 500 MB livres. Não é preciso instalar mais nada e <strong>não é preciso ser administrador</strong>. Internet só para baixar o programa.
          </p>

          <h3>Baixar</h3>
          <p>
            <a className="cta" href={CFG.installer}>Baixar o instalador</a>
          </p>

          <details>
            <summary>Quero conferir se o arquivo é original</summary>
            <p>O código abaixo funciona como uma “impressão digital” do arquivo. Se a sua for igual à da página, o arquivo não foi alterado:</p>
            <p><code>{CFG.hash}</code></p>
            <p>
              Para calcular a do seu arquivo, abra o <strong>PowerShell</strong> (menu Iniciar → digite PowerShell) e rode, trocando o caminho pelo do seu arquivo baixado:
            </p>
            <pre><code>{`Get-FileHash "$env:USERPROFILE\\Downloads\\Setup-LeitorDeProcessos-${CFG.version}.exe" -Algorithm SHA256`}</code></pre>
          </details>

          <h3>Instalar</h3>
          <p>O Windows costuma exibir avisos em programas novos que não vêm de uma loja. É esperado, e abaixo está o que clicar em cada um.</p>

          <ol className="passos">
            <li>
              <strong>Aviso do navegador.</strong> Ao terminar o download, o Chrome ou o Edge podem dizer que o arquivo “não é baixado com frequência” ou “pode ser perigoso”. Clique nos três pontinhos ao lado do arquivo e escolha <strong>Manter</strong> (no Edge, depois <strong>Manter mesmo assim</strong>).
            </li>
            <li>
              <strong>Abra o arquivo</strong> baixado (duplo clique no <code>Setup-LeitorDeProcessos</code>, na pasta Downloads).
            </li>
            <li>
              <strong>Tela “O Windows protegeu o computador”.</strong> Clique em <strong>Mais informações</strong> e, depois, em <strong>Executar assim mesmo</strong>. Ela aparece porque o instalador ainda não tem assinatura digital paga, e não indica problema.
              <Shot name="02-smartscreen-1" hint="tela do SmartScreen com o link “Mais informações”" />
              <Shot name="03-smartscreen-2" hint="a mesma tela, com o botão “Executar assim mesmo”" />
            </li>
            <li>
              <strong>Assistente de instalação.</strong> Clique em <strong>Avançar</strong>. Deixe marcada a opção <em>Criar um atalho na Área de Trabalho</em> e clique em <strong>Instalar</strong>. Não será pedida senha de administrador.
              <Shot name="04-assistente" hint="tela do assistente com a opção do atalho marcada" />
            </li>
            <li>
              <strong>Concluir.</strong> Deixe marcado <em>Abrir o Leitor de Processos agora</em> e clique em <strong>Concluir</strong>.
            </li>
          </ol>

          <h3>O que acontece ao abrir</h3>
          <p>
            Aparecem duas coisas: um <strong>terminal (janela preta)</strong> com o nome do programa e, em seguida, o <strong>navegador</strong> com o sistema pronto. O terminal é o motor do programa: <strong>deixe-o aberto</strong> enquanto estiver trabalhando.
          </p>
          <Shot name="05-primeira-abertura" hint="a janela preta ao lado do navegador com o sistema aberto" />
        </div>

        <div className="so-linux">
          <div className="aviso">
            No Linux <strong>não existe instalador</strong> (o <code>.exe</code> é só para Windows). O programa roda dentro do <strong>Docker</strong>, que já traz tudo o que ele precisa (leitor de texto, site e o restante). Você precisa do Docker e do código do projeto.
          </div>

          <p>
            <strong>O que você precisa:</strong> Linux de 64 bits, alguns GB livres (a primeira instalação baixa e monta as peças) e internet nessa primeira vez. Não é preciso instalar Python, Node nem Tesseract.
          </p>

          <h3>1. Instalar o Docker (só uma vez)</h3>
          <p>No Ubuntu, Debian e derivados:</p>
          <pre><code>{`sudo apt update
sudo apt install docker.io docker-compose-v2
sudo systemctl enable --now docker
sudo usermod -aG docker $USER`}</code></pre>
          <p>
            Depois do último comando, <strong>saia da sessão e entre de novo</strong> (ou reinicie), para poder usar o Docker sem <code>sudo</code>. Confira com <code>docker --version</code> e <code>docker compose version</code>. Para outras distribuições, siga o guia oficial: <a href="https://docs.docker.com/engine/install/" target="_blank" rel="noreferrer">docs.docker.com/engine/install</a>.
          </p>

          <h3>2. Baixar o projeto</h3>
          <pre><code>{`git clone ${CFG.repo} leitor-processos
cd leitor-processos`}</code></pre>
          <p>Sem o Git, baixe o arquivo <code>.zip</code> do repositório, extraia e entre na pasta pelo terminal.</p>

          <h3>3. Ligar (a primeira vez)</h3>
          <pre><code>{`mkdir -p dados
docker compose up -d --build`}</code></pre>
          <p>
            A primeira vez leva alguns minutos. Depois, abra no navegador <strong>http://127.0.0.1:3000</strong> (use exatamente esse endereço, com os números).
          </p>
          <Shot name="12-linux-primeira-abertura" hint="o terminal com os comandos e o navegador com o sistema aberto no Linux" />

          <details>
            <summary>Prefiro rodar sem Docker (avançado)</summary>
            <p>
              Precisa de Python 3.12 ou mais novo, Node 20 ou mais novo e do Tesseract com o idioma português (Ubuntu/Debian: <code>sudo apt install tesseract-ocr tesseract-ocr-por</code>; Fedora: <code>sudo dnf install tesseract tesseract-langpack-por</code>). Na pasta do projeto:
            </p>
            <pre><code>{`cd frontend
npm ci
NEXT_PUBLIC_API_URL="" npm run build

cd ../backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python launcher.py`}</code></pre>
            <p>
              O navegador abre sozinho. Neste modo, o CSV fica em <code>Documentos/Leitor de Processos</code> e as configurações em <code>~/.config/LeitorProcessos</code>.
            </p>
          </details>
        </div>

        <h2 id="usar">2. Usar no dia a dia</h2>

        <h3>Ligar e desligar</h3>
        <ul className="so-win">
          <li><strong>Ligar:</strong> duplo clique no atalho <em>Leitor de Processos</em> da Área de Trabalho. Use sempre o atalho (não salve o endereço nos favoritos), porque o endereço pode mudar de um dia para o outro.</li>
          <li><strong>Desligar:</strong> feche o terminal. Fechar só o navegador não encerra o programa.</li>
        </ul>
        <ul className="so-linux">
          <li><strong>Ligar:</strong> no terminal, dentro da pasta do projeto, <code>docker compose up -d</code>, e abra <strong>http://127.0.0.1:3000</strong>. Depois de reiniciar o computador, ele pode voltar sozinho; se não abrir, rode o comando de novo.</li>
          <li><strong>Desligar:</strong> <code>docker compose down</code>.</li>
        </ul>

        <h3>Processar uma capa</h3>
        <ol className="passos">
          <li>Arraste a capa (PDF, PNG, JPG ou WEBP) para a área indicada, ou clique nela para escolher o arquivo. Em PDFs grandes, <strong>só a primeira página é lida</strong>, então não importa o tamanho do arquivo.</li>
          <li>Aguarde a mensagem “Lendo…” (alguns segundos).</li>
          <li><strong>Confira cada campo</strong> comparando com o documento. Os campos em <strong>amarelo</strong> estão vazios: o programa não conseguiu ler, e você precisa digitar.</li>
          <li>Preencha os campos manuais: <strong>Qnt folhas</strong>, <strong>Processo E-DOCS</strong> e <strong>Num. Registro</strong>.</li>
          <li>Clique em <strong>Finalizado</strong>. A linha é gravada e a tela fica limpa para a próxima capa.</li>
        </ol>
        <Shot name="06-revisao" hint="tela com os campos preenchidos (e um campo amarelo, para mostrar o aviso)" />
        <p>
          O botão <strong>Finalizado</strong> só é liberado quando todos os campos estão preenchidos. Se escolheu o arquivo errado, use <strong>Descartar e escolher outro arquivo</strong>.
        </p>

        <div className="aviso">
          <strong>Importante:</strong> o programa ajuda a ler, mas <strong>quem confere é você</strong>. Documentos escaneados com pouca qualidade podem sair com erros de leitura. Sempre compare os campos com a capa antes de finalizar.
        </div>

        <h3>Onde ficam os resultados</h3>
        <p className="so-win">
          Por padrão, em um arquivo chamado <code>processos.csv</code>, dentro da pasta <strong>Documentos → Leitor de Processos</strong>. Cada capa vira uma linha, e a última coluna (<em>Status</em>) começa como “Falta imprimir”. Para abrir a pasta, clique em <strong>⚙ Configurações → Abrir pasta</strong>.
        </p>
        <p className="so-linux">
          Por padrão, em um arquivo chamado <code>processos.csv</code>, dentro da pasta <strong><code>dados</code></strong> do projeto. Cada capa vira uma linha, e a última coluna (<em>Status</em>) começa como “Falta imprimir”. O botão “Abrir pasta” das Configurações não funciona no Docker: abra a pasta <code>dados</code> pelo gerenciador de arquivos.
        </p>
        <ul className="so-win">
          <li>Abra o <code>processos.csv</code> com o Excel (duplo clique).</li>
          <li><strong>Feche o Excel antes de clicar em Finalizado.</strong> Com o arquivo aberto, o Windows impede a gravação, e o programa avisa com uma mensagem de erro. Basta fechar o Excel e clicar de novo.</li>
          <li>Se os acentos aparecerem quebrados, no Excel use <strong>Dados → De Texto/CSV</strong> e escolha a codificação <strong>UTF-8</strong>.</li>
          <li>Faça cópias de segurança desse arquivo de vez em quando.</li>
        </ul>
        <ul className="so-linux">
          <li>Abra o <code>processos.csv</code> no <strong>LibreOffice Calc</strong>. Na janela de importação, confira a codificação <strong>UTF-8</strong> e o separador <strong>ponto e vírgula (;)</strong>.</li>
          <li>O Calc não mostra as linhas novas sozinho: feche e abra o arquivo de novo para ver o que foi gravado depois.</li>
          <li>O Docker cria o arquivo como administrador (root). Para poder editá-lo ou apagá-lo, rode uma vez: <code>sudo chown -R $USER dados</code>.</li>
          <li>Faça cópias de segurança desse arquivo de vez em quando.</li>
        </ul>

        <h2 id="planilha">3. Gravar no Google Sheets (opcional)</h2>
        <p>
          Se você prefere uma planilha online, em vez do arquivo CSV, é possível ligar o programa a uma planilha <strong>sua</strong> do Google. Leva uns 10 minutos, e só precisa ser feito uma vez. Quem não quiser pode pular esta parte: o CSV continua funcionando sozinho. Os passos são os mesmos no Windows e no Linux.
        </p>

        <div className="aviso">
          <strong>Antes de começar, dois cuidados:</strong>
          <ul>
            <li><strong>Dados pessoais.</strong> A planilha vai receber nome e CPF dos interessados. Confirme com a sua chefia ou com o encarregado de dados da instituição se pode guardá-los em uma conta Google e em qual conta (pessoal ou institucional).</li>
            <li><strong>Contas institucionais</strong> (por exemplo, @ifes.edu.br) podem ter bloqueios definidos pela instituição, como impedir a publicação de “aplicativos da web”. Se algum passo abaixo não estiver disponível, o bloqueio é da conta, e não seu: nesse caso, fique no CSV ou use outra conta que a instituição permita.</li>
          </ul>
        </div>

        <ol className="passos">
          <li>
            <strong>Faça sua cópia da planilha modelo.</strong> Abra o link abaixo, entre na sua conta Google e clique em <strong>Fazer uma cópia</strong>.
            <br />
            <a href={CFG.sheet} target="_blank" rel="noreferrer">Abrir a planilha modelo</a>
            <Shot name="07-copia-planilha" hint="janela “Fazer uma cópia”" />
          </li>
          <li>
            Na sua cópia, clique em <strong>Extensões → Apps Script</strong>. Já existe um código pronto ali. <strong>Não precisa alterar nada.</strong>
            <Shot name="08-menu-apps-script" hint="menu Extensões → Apps Script" />
          </li>
          <li>
            No canto superior direito, clique em <strong>Implantar → Nova implantação</strong>. Na engrenagem ao lado de “Selecionar tipo”, escolha <strong>App da Web</strong>.
          </li>
          <li>
            Preencha exatamente assim:
            <ul>
              <li><strong>Executar como:</strong> Eu (o seu e-mail)</li>
              <li><strong>Quem pode acessar:</strong> <strong>Qualquer pessoa</strong></li>
            </ul>
            Clique em <strong>Implantar</strong>.
            <Shot name="09-implantacao" hint="tela de implantação com “Executar como: Eu” e “Qualquer pessoa”" />
          </li>
          <li>
            O Google pede <strong>autorização</strong>. Clique em <strong>Autorizar acesso</strong>, escolha sua conta e, se aparecer “O Google não verificou este app”, clique em <strong>Avançado</strong> e depois em <strong>Acessar … (não seguro)</strong>. É o seu próprio script, e ele só precisa de permissão para escrever na sua planilha.
            <Shot name="10-autorizacao" hint="aviso “O Google não verificou este app” com o link “Avançado”" />
          </li>
          <li>
            Ao terminar, aparece o <strong>URL do app da Web</strong> (começa com <code>https://script.google.com/…</code> e termina com <code>/exec</code>). Clique em <strong>Copiar</strong>.
          </li>
          <li>
            <strong>Teste o endereço:</strong> abra uma janela anônima do navegador (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>N</kbd>), cole o endereço e dê Enter. Deve aparecer um texto curto com <code>"ok":true</code>. Se pedir login do Google, volte ao passo 4 e confira se está em “Qualquer pessoa”.
          </li>
          <li>
            No Leitor de Processos, clique em <strong>⚙ Configurações</strong>, cole o endereço no campo do Google Sheets e clique em <strong>Testar conexão</strong>. Deve aparecer “Conectado à planilha …”. Então clique em <strong>Salvar</strong>.
            <Shot name="11-configuracoes" hint="janela de Configurações com a mensagem “Conectado à planilha”" />
          </li>
        </ol>

        <p>
          Pronto: a partir de agora, cada clique em <strong>Finalizado</strong> grava uma linha na sua planilha. A coluna <em>Status</em> tem um menu com “Falta imprimir” e “Finalizado”, e você muda à mão quando quiser. Para voltar ao CSV, apague o endereço em Configurações e salve.
        </p>
        <p>
          <strong>Mudou o código do Apps Script?</strong> Só vale depois de <strong>Implantar → Gerenciar implantações → editar (lápis) → Nova versão</strong>. O endereço continua o mesmo.
        </p>

        <h2 id="atualizar">4. Atualizar e desinstalar</h2>
        <ul className="so-win">
          <li><strong>Atualizar:</strong> baixe o instalador novo nesta página e execute-o. Ele substitui a versão antiga, e <strong>seus dados e configurações são mantidos</strong>. Antes, feche o terminal do programa.</li>
          <li><strong>Desinstalar:</strong> <strong>Configurações do Windows → Aplicativos → Leitor de Processos → Desinstalar</strong>. Isso <strong>não apaga</strong> o seu <code>processos.csv</code> (em Documentos → Leitor de Processos) nem as configurações.</li>
        </ul>
        <ul className="so-linux">
          <li><strong>Atualizar:</strong> na pasta do projeto, <code>git pull</code> (ou extraia o novo <code>.zip</code> por cima, sem apagar a pasta <code>dados</code>) e depois <code>docker compose up -d --build</code>. Seus dados e configurações, que ficam na pasta <code>dados</code>, são mantidos.</li>
          <li><strong>Desinstalar:</strong> <code>docker compose down --rmi local</code> e, se quiser, apague a pasta do projeto. <strong>Guarde antes a pasta <code>dados</code></strong> se ainda precisar do <code>processos.csv</code>.</li>
        </ul>

        <h2 id="problemas">5. Problemas comuns</h2>

        <details className="so-win">
          <summary>O Windows ou o antivírus bloqueou ou apagou o instalador</summary>
          <p>Programas novos sem assinatura digital às vezes são marcados por engano. Se o Windows Defender ou outro antivírus removeu o arquivo, abra o histórico de proteção, restaure o arquivo e permita-o. Antes, confira o código de verificação (seção 1) para ter certeza de que é o original. Se a sua instituição bloqueia a instalação de programas, fale com o suporte de TI dela.</p>
        </details>

        <details className="so-win">
          <summary>Cliquei no atalho e nada aparece / o terminal fechou sozinho</summary>
          <p>Dê um novo duplo clique no atalho e aguarde uns 20 segundos. Se persistir, veja a seção “Como pedir ajuda”.</p>
        </details>

        <details className="so-win">
          <summary>O navegador mostra “Não foi possível acessar esse site” ou o sistema diz “Não consegui falar com o leitor”</summary>
          <p>O programa não está rodando (o terminal foi fechado). Abra de novo pelo atalho da Área de Trabalho e <strong>use sempre o atalho</strong>, não os favoritos.</p>
        </details>

        <details className="so-win">
          <summary>“Não consegui gravar o arquivo”</summary>
          <p>O <code>processos.csv</code> está aberto no Excel. Feche o Excel e clique em Finalizado de novo.</p>
        </details>

        <details className="so-linux">
          <summary>“permission denied” ao rodar o <code>docker</code></summary>
          <p>Você ainda não saiu e entrou na sessão depois do comando <code>usermod</code>, ou não está no grupo <code>docker</code>. Como solução rápida, use <code>sudo docker compose ...</code>.</p>
        </details>

        <details className="so-linux">
          <summary>“Cannot connect to the Docker daemon”</summary>
          <p>O serviço do Docker está parado. Rode <code>sudo systemctl start docker</code>.</p>
        </details>

        <details className="so-linux">
          <summary>“port is already allocated” / a página não abre</summary>
          <p>Outro programa está usando a porta 3000. Descubra qual com <code>ss -ltnp | grep :3000</code>, ou troque o número no arquivo <code>docker-compose.yml</code> (a linha <code>"127.0.0.1:3000:8000"</code>, por exemplo, para <code>3001</code>) e use o novo endereço.</p>
        </details>

        <details className="so-linux">
          <summary>Não consegue gravar o CSV (Fedora, RHEL e outras distribuições com SELinux)</summary>
          <p>No <code>docker-compose.yml</code>, troque a linha do volume <code>- ./dados:/app/dados</code> por <code>- ./dados:/app/dados:z</code> e rode <code>docker compose up -d</code> de novo.</p>
        </details>

        <details>
          <summary>Um campo veio vazio ou errado</summary>
          <p>É normal em documentos com baixa qualidade. Digite o valor correto e siga. Se acontecer com muitos documentos parecidos, avise o suporte.</p>
        </details>

        <details>
          <summary>“A planilha recusou o envio” ou “Não consegui falar com a planilha”</summary>
          <p>Confira em Configurações se o endereço está completo (termina em <code>/exec</code>) e use <strong>Testar conexão</strong>. Se a implantação estiver como “Somente eu” em vez de “Qualquer pessoa”, refaça o passo 4 da seção 3. Sem internet, a gravação no Google não funciona, mas o que você digitou continua na tela até conseguir enviar.</p>
        </details>

        <h3 id="ajuda">Como pedir ajuda</h3>
        <p>
          Escreva para <strong>{CFG.contact}</strong> informando o que você estava fazendo e, se possível, estas duas informações:
        </p>
        <ol>
          <li>Com o programa aberto, no navegador, troque o final do endereço da barra por <code>/api/diagnostico</code> (por exemplo, <code>http://127.0.0.1:8000/api/diagnostico</code>) e copie o texto que aparece.</li>
          <li className="so-win">O arquivo de registro, que fica em <code>%LOCALAPPDATA%\LeitorProcessos\logs\leitor.log</code> (cole esse caminho na barra de endereço do Explorador de Arquivos).</li>
          <li className="so-linux">O resultado, no terminal, de <code>docker compose logs --tail 100</code>.</li>
        </ol>
        <p><strong>Não envie capas reais nem prints com CPF.</strong> Se precisar mostrar um documento, troque antes os dados por fictícios.</p>

        <h2 id="privacidade">6. Privacidade e seus dados</h2>
        <table>
          <tbody>
            <tr><th>O quê</th><th>Onde fica</th></tr>
            <tr><td>O documento que você envia</td><td>É lido no seu computador e <strong>apagado</strong> logo depois. Não vai para a internet.</td></tr>
            <tr className="so-win"><td>Os dados gravados (CSV)</td><td>No seu computador, em Documentos → Leitor de Processos.</td></tr>
            <tr className="so-linux"><td>Os dados gravados (CSV)</td><td>No seu computador, na pasta <code>dados</code> do projeto.</td></tr>
            <tr><td>Google Sheets (se ligar)</td><td>Só a linha final de cada processo vai para a <strong>sua</strong> planilha, na sua conta Google.</td></tr>
            <tr className="so-win"><td>Configurações</td><td>No seu computador, em <code>%LOCALAPPDATA%\LeitorProcessos</code>.</td></tr>
            <tr className="so-linux"><td>Configurações</td><td>No seu computador, em <code>dados/config</code>, dentro do projeto.</td></tr>
          </tbody>
        </table>
        <p>
          O programa só aceita conexões do próprio computador: ninguém na sua rede consegue acessá-lo. Os programas e bibliotecas de terceiros usados e suas licenças estão listados no arquivo <code>AVISOS.txt</code>, dentro da pasta do programa.
        </p>
      </main>
    </>
  );
}