import ext from "./utils/ext";

const refresh = () => {
	fetch("http://www.minecraft-fr.net/utils/online")
	.then(response => {
		response.json()
		.then((json) => {
			if (json.roleplay.status === "online") {
				ext.browserAction.setBadgeBackgroundColor({ color: "#67bf65" });
				ext.browserAction.setBadgeText({text: json.roleplay.onlinePlayers.toString()});
			} else {
				ext.browserAction.setBadgeBackgroundColor({ color: "#EF1B1B" });
				ext.browserAction.setBadgeText({text: "OFF"});
			}
		})
	})
	.catch(err => {
		ext.browserAction.setBadgeBackgroundColor({ color: "#EF1B1B" });
		ext.browserAction.setBadgeText({text: "X"});
	});
} 

window.setInterval(refresh, 6000);
refresh();