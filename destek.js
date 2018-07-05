} else if (message.content.startsWith(prefix + "destek")) {
      let isEnabled;
      message.reply("ZENON Destek hattı ile iletişime geçtiğim için teşekkürler aktif bir yetkili varsa size ver den dönüş yapacaktır.");
      let chan = message.channel;
      let supportChan = "464379152674455572";
      const embed = new Discord.RichEmbed()
        .setTitle(`:bangbang: **yeni destek çağrısı!!** :bangbang:`)
        .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL}`)
        .setColor(0xFF0000)
        .setDescription(`**Guild:** ${message.guild.name} (${message.guild.id}) \n**Channel:** #${message.channel.name} (${message.channel.id}) \n**tarafından oluşguruldu:** ${message.author.tag} (${message.author.id})`)
        .setFooter("ZENON Canlı destek sistemi.")
        .setTimestamp()
      client.channels.get(supportChan).send({
        embed: embed
      });
      const collector = client.channels.get(supportChan).createCollector(message => message.content.startsWith(prefix + "aramak"), {
        time: 0
      });
      client.channels.get(supportChan).send(``${prefix}yanıtla` yazarak yanıglayabilir`${prefix}bitir` yazarak sonlabdırabilirsiniz.`);
      collector.on("message", (message) => {
        if (message.content === "+call end") collector.stop("aborted");
        if (message.content === "+call answer") collector.stop("success");
      });
      collector.on("end", (collected, reason) => {
        if (reason === "time") return message.reply("süre doldu lütfen tekrar dene.");
        if (reason === "aborted") {
          message.reply(":x: arama sona erdi.");
          client.channels.get(supportChan).send(":x: arama reddedildi.");
        }
        if (reason === "başarı") {
          client.channels.get(supportChan).send(":heavy_check_mark: Çağrı alındı!");
          chan.send(`${message.author}`);
          chan.send(":heavy_check_mark: Aramanız bir destek temsilcisi tarafından alındı");
          chan.send(":hourglass: en kısa zamanda size yardımcı olacaklar.");
          isEnabled = true;
          client.on("message", message => {
            function contact() {
              if (isEnabled === false) return;
              if (message.author.id === client.user.id) return;
              if (message.content.startsWith(prefix + "call end")) {
                message.channel.send(":x: Call has been hung up.");
                if (message.channel.id === chan.id) client.channels.get(supportChan).send(":x: The call was ended from the other side.");
                if (message.channel.id === supportChan) chan.send(":x: The call was ended from the other side.");
                return isEnabled = false;
              }
              if (message.channel.id === chan.id) client.channels.get(supportChan).send(`:telephone_receiver: **${message.author.tag}**: ${message.content}`);
              if (message.channel.id === supportChan) chan.send(`:star: ${message.content}`);
            }
            contact()
          });
        };
      });
