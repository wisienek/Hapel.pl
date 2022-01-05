export const Links = {
  BasePage: 'http://3.10.125.121/',
  API: 'http://3.10.125.121/api',
  widget(forHic: boolean = false) {
    return `https://discord.com/api/guilds/${
      forHic ? process.env.hapelICDC : process.env.hapelDC
    }/widget.json`;
  },
};
