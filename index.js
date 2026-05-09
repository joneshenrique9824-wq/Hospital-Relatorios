// ==========================================
// BOT DE RELATÓRIOS HOSPITALARES
// COMPLETO
// ==========================================

import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
} from "discord.js";

// ==========================================
// CONFIGURAÇÕES
// ==========================================

// ID DO SERVIDOR
const SERVIDOR_ID = "1477683902041690342";

// ID DO CANAL DOS RELATÓRIOS
const CANAL_RELATORIOS =
  "1477683906026406084";

// ID DO CARGO PERMITIDO
const CARGO_PERMITIDO =
  "1490431614055088128";

// ==========================================
// CLIENT
// ==========================================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ==========================================
// BOT ONLINE
// ==========================================

client.once("clientReady", () => {
  console.log("=================================");
  console.log("✅ BOT ONLINE");
  console.log(`🤖 ${client.user.tag}`);
  console.log("=================================");
});

// ==========================================
// SISTEMA
// ==========================================

client.on("messageCreate", async (message) => {
  try {
    // IGNORA BOTS
    if (message.author.bot) return;

    // VERIFICA SERVIDOR
    if (
      message.guild?.id !== SERVIDOR_ID
    ) {
      return;
    }

    // VERIFICA CANAL
    if (
      message.channel.id !==
      CANAL_RELATORIOS
    ) {
      return;
    }

    // VERIFICA CARGO
    if (
      !message.member.roles.cache.has(
        CARGO_PERMITIDO
      )
    ) {
      return;
    }

    // ==========================================
    // COMANDO HELP
    // ==========================================

    if (message.content === "!help") {
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("📋 Comandos do Bot")
        .setDescription(`
📌 Comandos disponíveis:

\`!painel\`
➡️ Envia o painel do sistema.

\`!relatorio @membro\`
➡️ Cria um relatório automático.

━━━━━━━━━━━━━━━━━━

📄 Exemplo:

\`!relatorio @Mary\`

━━━━━━━━━━━━━━━━━━

👑 Apenas superiores podem usar.
        `)
        .setTimestamp();

      return message.channel.send({
        embeds: [embed],
      });
    }

    // ==========================================
    // COMANDO PAINEL
    // ==========================================

    if (message.content === "!painel") {
      const embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle(
          "📋 Sistema de Relatórios — Hospital"
        )
        .setDescription(`
Olá @|👑| Diretor (a)  
@|🎖️| Vice.Diretor (a)  
@|🔱| Supervisor (a)  
@|📋| Coordenador (a)

Essa aba será utilizada para:

• 📄 Relatórios Gerais  
• 📊 Frequência dos membros  
• 🩺 Avaliação de desempenho  
• ⏳ Tempo de serviço  
• ✅ Qualidade de serviço  
• ⭐ Desempenho geral  

━━━━━━━━━━━━━━━━━━

📌 Apenas superiores podem realizar relatórios.

• 👑 Diretor  
• 🎖️ Vice-Diretor  
• 🔱 Supervisor  
• 📋 Coordenador  

━━━━━━━━━━━━━━━━━━

👑 Responsável:
Diretor Henrique
        `)
        .setFooter({
          text: "Sistema Hospitalar",
        })
        .setTimestamp();

      return message.channel.send({
        embeds: [embed],
      });
    }

    // ==========================================
    // COMANDO RELATÓRIO
    // ==========================================

    if (
      message.content.startsWith(
        "!relatorio"
      )
    ) {
      // PEGA MEMBRO
      const membro =
        message.mentions.users.first();

      if (!membro) {
        return message.reply(
          "❌ Você precisa mencionar um membro."
        );
      }

      // EMBED
      const embed = new EmbedBuilder()
        .setColor("#00ff88")
        .setTitle("📄 Relatório Geral")
        .setThumbnail(
          membro.displayAvatarURL({
            dynamic: true,
          })
        )
        .setDescription(`
📄 Relatório Geral — Membro: ${membro}

📌 Cargo Atual:
Médica

📊 Frequência dos membros:
Apresenta frequência razoável, mantendo presença consistente em serviço.

🩺 Avaliação de desempenho:
Boa comunicação, RP forte e respeito à hierarquia.

⏳ Tempo de serviço:
Tempo adequado ao cargo.

✅ Qualidade de serviço:
Atendimentos rápidos e eficientes.

⭐ Desempenho geral:
Boa profissional com potencial de crescimento.

━━━━━━━━━━━━━━━━━━

👑 Relatório realizado por:
${message.author}
        `)
        .setFooter({
          text: "Hospital System",
        })
        .setTimestamp();

      return message.channel.send({
        embeds: [embed],
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// ==========================================
// LOGIN
// ==========================================

client.login(process.env.TOKEN);
