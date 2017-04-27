import ext from "./utils/ext";

Number.prototype.padLeft = function (n,str) {
	return (this < 0 ? '-' : '') + 
		Array(n-String(Math.abs(this)).length+1)
		 .join(str||'0') + 
		(Math.abs(this));
}

document.addEventListener('DOMContentLoaded', function() {
	const avatarsWrapper = document.getElementsByClassName("players")[0];
	fetch("http://www.minecraft-fr.net/utils/online")
	.then(response => {
		response.json()
		.then((json) => {
			avatarsWrapper.innerHTML = "";
			avatarsWrapper.className = "players box";
			avatarsWrapper.innerHTML = "<h3>Joueurs connectés</h3>";
			const a = document.createElement("a");
			json.roleplay.players.forEach(player => {
				const a = document.createElement("a");
				a.setAttribute("href", `https://www.minecraft-fr.net/wiki/index.php?title=Utilisateur:${player.forum}`);
				a.style.marginLeft = "3px";
				a.style.marginRight = "3px";
				a.setAttribute("title", player.name);
				a.setAttribute("target", "_blank");
				const img = document.createElement("img");
				img.setAttribute("src", `https://www.minecraft-fr.net/utils/players/avatar/${player.minecraft}/30`);
				a.appendChild(img);
				avatarsWrapper.appendChild(a);

				a.onclick = () => {
					ext.tabs.create({url: a.href});
					window.close();
					return false;
				}
			});
			if (json.roleplay.onlinePlayers === 0) {
				avatarsWrapper.innerHTML = "<h3>Aucun joueur.</h3>";
			}
			document.body.style.display = "none";
			setTimeout(() => {
				document.body.style.display = null;
			}, 100);
		})
	})
	.catch(err => {
		avatarsWrapper.innerText = "Impossible de charger les joueurs.";
	});

	const postsWrapper = document.getElementsByClassName("posts")[0];
	fetch("http://www.minecraft-fr.net/utils/posts")
	.then(response => {
		response.json()
		.then((posts) => {
			postsWrapper.innerHTML = "";
			postsWrapper.className = "topics box";
			postsWrapper.innerHTML = "<h3>Derniers posts</h3>"
			const currentDate = new Date();
			posts.forEach(post => {
				const topicLink = document.createElement("a");
				topicLink.className = "topic";
				topicLink.setAttribute("target", "_blank");
				topicLink.setAttribute("href", `http://www.minecraft-fr.net/forum/viewtopic.php?f=${post.forum_id}&t=${post.topic_id}&view=unread#unread`);
				const topicTitle = document.createElement("div");
				topicTitle.innerText = post.topic_title;
				topicTitle.className = "topic-title";
				const topicContent = document.createElement("div");
				topicContent.innerText = `Par ${post.topic_last_poster_name}`;
				topicContent.className = "topic-content";

				const topicDate = new Date(post.topic_last_post_time * 1000);
				if (`${topicDate.getDate()}/${topicDate.getMonth()}/${topicDate.getFullYear()}` !== `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`) {
					topicContent.innerText = `${topicContent.innerText} le ${topicDate.getDate().padLeft(2)}/${(topicDate.getMonth()+1).padLeft(2)}`
				}
				topicContent.innerText = `${topicContent.innerText} à ${topicDate.getHours().padLeft(2)}h${topicDate.getMinutes().padLeft(2)}`

				const divider = document.createElement("div");
				divider.className = "divider";

				topicLink.appendChild(topicTitle);
				topicLink.appendChild(topicContent);
				topicLink.appendChild(divider);

				postsWrapper.appendChild(topicLink);

				topicLink.onclick = () => {
					ext.tabs.create({url: topicLink.href});
					window.close();
					return false;
				}
			});
			document.body.style.display = "none";
			setTimeout(() => {
				document.body.style.display = null;
			}, 100);
		})
	})
	.catch(err => {
		postsWrapper.innerText = "Impossible de charger les topics.";
	});
});