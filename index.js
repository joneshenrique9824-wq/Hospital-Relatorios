// ==========================================
// BOT DE RELATÓRIOS HOSPITALARES
// SISTEMA COMPLETO COM FORMULÁRIO
// ==========================================

import "dotenv/config";

import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

// ==========================================
// CONFIGURAÇÕES
// ==========================================

const SERVIDOR_ID = "1477683902041690342";

const CANAL_RELATORIOS =
  "1477683906026406084";

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
// ONLINE
// ==========================================

client.once("clientReady", () => {
  console.log("=================================");
  console.log(`✅ BOT ONLINE`);
  console.log(`🤖 ${client.user.tag}`);
  console.log("=================================");
});

// ==========================================
// MENSAGENS
// ==========================================

client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;

    if (message.guild?.id !== SERVIDOR_ID)
      return;

    if (
      message.channel.id !==
      CANAL_RELATORIOS
    )
      return;

    // VERIFICA CARGO
    if (
      !message.member.roles.cache.has(
        CARGO_PERMITIDO
      )
    ) {
      return;
    }

    // ==========================================
    // PAINEL
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

📌 Clique no botão abaixo para preencher um relatório.
        `)
        .setFooter({
          text: "Sistema Hospitalar",
        })
        .setTimestamp();

      // BOTÃO
      const row =
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("abrir_relatorio")
            .setLabel("📄 Fazer Relatório")
            .setStyle(ButtonStyle.Primary)
        );

      return message.channel.send({
        embeds: [embed],
        components: [row],
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// ==========================================
// BOTÃO
// ==========================================

client.on("interactionCreate", async (interaction) => {
  try {
    // ==========================================
    // BOTÃO
    // ==========================================

    if (interaction.isButton()) {
      if (
        interaction.customId ===
        "abrir_relatorio"
      ) {
        const modal = new ModalBuilder()
          .setCustomId("modal_relatorio")
          .setTitle("📄 Relatório Hospitalar");

        // MEMBRO
        const membro =
          new TextInputBuilder()
            .setCustomId("membro")
            .setLabel("Nome do membro")
            .setStyle(
              TextInputStyle.Short
            )
            .setRequired(true);

        // CARGO
        const cargo =
          new TextInputBuilder()
            .setCustomId("cargo")
            .setLabel("Cargo Atual")
            .setStyle(
              TextInputStyle.Short
            )
            .setRequired(true);

        // FREQUÊNCIA
        const frequencia =
          new TextInputBuilder()
            .setCustomId("frequencia")
            .setLabel(
              "Frequência dos membros"
            )
            .setStyle(
              TextInputStyle.Paragraph
            )
            .setRequired(true);

        // AVALIAÇÃO
        const avaliacao =
          new TextInputBuilder()
            .setCustomId("avaliacao")
            .setLabel(
              "Avaliação de desempenho"
            )
            .setStyle(
              TextInputStyle.Paragraph
            )
            .setRequired(true);

        // DESEMPENHO
        const desempenho =
          new TextInputBuilder()
            .setCustomId("desempenho")
            .setLabel("Desempenho geral")
            .setStyle(
              TextInputStyle.Paragraph
            )
            .setRequired(true);

        // LINHAS
        const row1 =
          new ActionRowBuilder().addComponents(
            membro
          );

        const row2 =
          new ActionRowBuilder().addComponents(
            cargo
          );

        const row3 =
          new ActionRowBuilder().addComponents(
            frequencia
          );

        const row4 =
          new ActionRowBuilder().addComponents(
            avaliacao
          );

        const row5 =
          new ActionRowBuilder().addComponents(
            desempenho
          );

        modal.addComponents(
          row1,
          row2,
          row3,
          row4,
          row5
        );

        return interaction.showModal(modal);
      }
    }

    // ==========================================
    // MODAL
    // ==========================================

    if (interaction.isModalSubmit()) {
      if (
        interaction.customId ===
        "modal_relatorio"
      ) {
        // PEGA DADOS
        const membro =
          interaction.fields.getTextInputValue(
            "membro"
          );

        const cargo =
          interaction.fields.getTextInputValue(
            "cargo"
          );

        const frequencia =
          interaction.fields.getTextInputValue(
            "frequencia"
          );

        const avaliacao =
          interaction.fields.getTextInputValue(
            "avaliacao"
          );

        const desempenho =
          interaction.fields.getTextInputValue(
            "desempenho"
          );

        // EMBED
        const embed = new EmbedBuilder()
          .setColor("#00ff88")
          .setTitle(
            "📄 Relatório Geral"
          )
          .setDescription(`
📄 Relatório Geral — Membro: ${membro}

📌 Cargo Atual:
${cargo}

📊 Frequência dos membros:
${frequencia}

🩺 Avaliação de desempenho:
${avaliacao}

⭐ Desempenho geral:
${desempenho}

━━━━━━━━━━━━━━━━━━

👑 Relatório realizado por:
${interaction.user}
          `)
          .setFooter({
            text: "Sistema Hospitalar",
          })
          .setTimestamp();

        await interaction.reply({
          embeds: [embed],
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// ==========================================
// LOGIN
// ==========================================

client.login(process.env.TOKEN);
