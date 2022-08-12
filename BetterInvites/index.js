const GLOBAL_NAME = "BetterInvites";

module.exports = {
    Plugin: new (class {
        config = {
            info: {
                name: GLOBAL_NAME,
                description: "Shows some useful information in the invitation",
            },
            author: "HypedDomi#1711",
            authorId: "354191516979429376",
            version: "1.6.2",
            license: "MIT",
        };
        getName() {
            return this.GLOBAL_NAME;
        }
        onStart() {
            const { WebpackModules, Patcher, React, Styling } = VApi;
            const Invite = WebpackModules.find(m => m.default?.displayName === "GuildInvite");
            const TooltipContainer = WebpackModules.findByProps('TooltipContainer').TooltipContainer;

            Styling.injectCSS(GLOBAL_NAME, `
            .wrapper-1HIH0j .header-3anOjb { margin-bottom: 6px; }
            .${GLOBAL_NAME}-banner { margin-bottom: 6px; }
            .wrapper-1HIH0j .content-1r-J1r { flex-wrap: wrap; gap: 0; }
            `);

            Patcher.after(GLOBAL_NAME, Invite, "default", ([props], component) => {
                const { invite } = props;
                if (!invite) return;
                const { guild, inviter } = invite;

                let expireTooltip = "";
                if (invite.expires_at != null) {
                    const inviteExpireDays = Math.floor((new Date(invite.expires_at) - Date.now()) / 1000 / 60 / 60 / 24);
                    const inviteExpireHours = Math.floor((new Date(invite.expires_at) - Date.now()) / 1000 / 60 / 60);
                    const inviteExpireMinutes = Math.floor((new Date(invite.expires_at) - Date.now()) / 1000 / 60);

                    if (inviteExpireDays > 0) inviteExpireDays === 1 ? expireTooltip = `${inviteExpireDays} day` : expireTooltip = `${inviteExpireDays} days`;
                    else if (inviteExpireHours > 0) inviteExpireHours === 1 ? expireTooltip = `${inviteExpireHours} hour` : expireTooltip = `${inviteExpireHours} hours`;
                    else inviteExpireMinutes === 1 ? expireTooltip = `${inviteExpireMinutes} minute` : expireTooltip = `${inviteExpireMinutes} minutes`;
                }

                const boostLevel = component.props.children[2].props.children[0].props.guild?.premiumTier;
                component.props.children[2].props.children.splice(2, 0,
                    React.createElement("div", { className: `${GLOBAL_NAME}-iconWrapper`, style: { display: "grid", grid: "auto / auto auto", direction: "rtl", "grid-gap": "3px" } },
                        // Boost
                        boostLevel > 0 ?
                            React.createElement(TooltipContainer, { text: `Boost Level ${boostLevel}` },
                                React.createElement("img", { style: { height: "28px", borderRadius: "5px", objectFit: "contain" }, src: "https://discord.com/assets/4a2618502278029ce88adeea179ed435.svg" }))
                            : null,
                        // Inviter
                        inviter ?
                            React.createElement(TooltipContainer, { text: `Invited by: ${inviter?.username}#${inviter?.discriminator}` },
                                React.createElement("img", { style: { height: "28px", borderRadius: "5px", objectFit: "contain" }, onClick: () => { DiscordNative.clipboard.copy(inviter?.id); window.BdApi.showToast("Copied ID", { type: "info", icon: true, timeout: 4000 }) }, src: `https://cdn.discordapp.com/avatars/${inviter?.id}/${inviter?.avatar}.png?size=1024`, onError: (e) => { e.target.src = "https://cdn.discordapp.com/embed/avatars/0.png"; } }))
                            : null,
                        // Verification
                        guild?.verification_level > 0 ?
                            React.createElement(TooltipContainer, { text: `Verification Level ${guild?.verification_level}` },
                                React.createElement("img", { style: { height: "28px", borderRadius: "5px", objectFit: "contain" }, src: "https://discord.com/assets/e62b930d873735bbede7ae1785d13233.svg" }))
                            : null,
                        // NSFW
                        guild?.nsfw_level > 0 ?
                            React.createElement(TooltipContainer, { text: `NSFW Level ${guild?.nsfw_level}` },
                                React.createElement("img", { style: { height: "28px", borderRadius: "5px", objectFit: "contain" }, src: "https://discord.com/assets/ece853d6c1c1cd81f762db6c26fade40.svg" }))
                            : null,
                        // Invite Expiration
                        invite.expires_at != null ?
                            React.createElement(TooltipContainer, { text: `Expires in: ${expireTooltip}` },
                                React.createElement("img", { style: { height: "28px", borderRadius: "5px", objectFit: "contain" }, src: "https://discord.com/assets/630f5938948131784285d97d57a3e8a0.svg" }))
                            : null,
                    )
                );

                const contentDiv = component.props.children[2];

                if (guild?.description) {
                    contentDiv.props.children.push(
                        React.createElement("div", { className: `${GLOBAL_NAME}-guildDescription`, style: { marginTop: "1%" } },
                            React.createElement("div", { className: "markup-eYLPri" }, guild.description)
                        )
                    );
                }

                const joinButton = contentDiv.props.children[1];
                contentDiv.props.children.splice(1, 1);
                if (joinButton) 
                    joinButton.props.style = {
                        width: "100%",
                        margin: "3% 0 0 0",
                    };
                contentDiv.props.children.push(joinButton);


                if (guild?.banner) {
                    component.props.children.splice(2, 0, React.createElement("img", {
                        className: `${GLOBAL_NAME}-banner`,
                        src: `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.gif?size=1024`,
                        style: { width: "100%", height: "auto", maxHeight: "100px", borderRadius: "5px", objectFit: "cover" },
                        onError: (e) => { e.target.onError = null, e.target.src = `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png?size=1024` }
                    }));
                    if (guild.features.includes("INVITE_SPLASH")) component.props.children.splice(0, 1);
                }
            });
        }
        onStop() {
            Patcher.unpatchAll(GLOBAL_NAME);
            Styling.clearCSS(GLOBAL_NAME);
        }
    })(),
};