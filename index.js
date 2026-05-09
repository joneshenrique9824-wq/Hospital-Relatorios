import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
} from "discord.js";

// ==========================================
// CLIENT
// ==========================================

// REMOVIDO O GuildMembers
// PARA NÃO DAR ERRO DE INTENTS

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ==========================================
// CONFIGURAÇÕES
// ==========================================

const SERVIDOR_ID = "1477683902041690342";

const CANAL_RELATORIOS =
  "1477683906026406084";

const CARGO_PERMITIDO =
  "1490431614055088128";

const CARGOS_SUPERIORES = [
  "Diretor",
  "Vice-Diretor",
  "Supervisor",
  "Coordenador",
];

// ==========================================
// BOT ONLINE
// ==========================================

client.once("ready", async () => {
  console.log("=================================");
  console.log(
    `✅ BOT ONLINE: ${client.user.tag}`
  );
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
    )
      return;

    // VERIFICA CANAL
    if (
      message.channel.id !==
      CANAL_RELATORIOS
    )
      return;

    // VERIFICA CARGO
    const possuiCargo =
      message.member.roles.cache.has(
        CARGO_PERMITIDO
      );

    if (!possuiCargo) {
      return;
    }

    // ==========================================
    // PAINEL
    // ==========================================

    if (
      message.content ===
      "!painelrelatorio"
    ) {
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

📌 Somente cargos superiores podem realizar relatórios.

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

      await message.channel.send({
        embeds: [embed],
      });
    }

    // ==========================================
    // RELATÓRIO
    // ==========================================

    if (
      message.content.startsWith(
        "!relatorio"
      )
    ) {
      const args =
        message.content.split(" ");

      const membro =
        message.mentions.users.first();

      if (!membro) {
        return message.reply(
          "❌ Mencione um membro."
        );
      }

      const cargo = args[2];

      if (
        !CARGOS_SUPERIORES.includes(
          cargo
        )
      ) {
        return message.reply(`
❌ Cargo inválido.

Permitidos:
• Diretor
• Vice-Diretor
• Supervisor
• Coordenador
        `);
      }

      const frequencia =
        args[3] || "Não informado";

      const avaliacao =
        args[4] || "Não informado";

      const tempo =
        args[5] || "Não informado";

      const qualidade =
        args[6] || "Não informado";

      const desempenho =
        args[7] || "Não informado";

      const embed = new EmbedBuilder()
        .setColor("#00ff88")
        .setTitle("📄 Relatório Geral")
        .setThumbnail(
          membro.displayAvatarURL({
            dynamic: true,
          })
        )
        .addFields(
          {
            name: "👤 Membro",
            value: `${membro}`,
            inline: true,
          },
          {
            name: "📌 Cargo Superior",
            value: cargo,
            inline: true,
          },
          {
            name:
              "📊 Frequência dos membros",
            value: frequencia,
          },
          {
            name:
              "🩺 Avaliação de desempenho",
            value: avaliacao,
          },
          {
            name:
              "⏳ Tempo de serviço",
            value: tempo,
          },
          {
            name:
              "✅ Qualidade de serviço",
            value: qualidade,
          },
          {
            name:
              "⭐ Desempenho geral",
            value: desempenho,
          }
        )
        .setFooter({
          text: `Relatório realizado por ${message.author.username}`,
        })
        .setTimestamp();

      await message.channel.send({
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
