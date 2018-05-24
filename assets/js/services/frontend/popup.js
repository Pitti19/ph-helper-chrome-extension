export default class Popup {
    constructor(settings) {
        this.selectors = {
            content: 'main[class^="content"]',
            following: 'main#app header div[class^="social"] a[href$="/following"]',
            followers: 'main#app header div[class^="social"] a[href$="/followers"]',
            userCards: "div[class^='userCard']",
            content_header: "div[class^='header'] span"
        };

        this.bot = new Bot(this.selectors);
    }
    _doAction(action) {
        switch (action) {
            case "follow":
                this.bot._scrollToFinish(this.bot.follow);
                break;
            case "unfollow":
                this.bot._scrollToFinish(this.bot.unfollow);
                break;
            default:
                break;
        }
    }
}

class Bot {
    constructor(selectors) {
        this.users = [];
        this.selectors = selectors;
    }
    follow($users) {
        $users.forEach(($user) => {
            let $button = $user.querySelector('button');
            let $status = $button.querySelector('span');

            if ($status.innerText == "FOLLOW") {
                $button.click();
            }
        });
    }
    unfollow($users) {
        $users.forEach(($user) => {
            let $button = $user.querySelector('button');
            let $status = $button.querySelector('span');

            if ($status.innerText == "FOLLOWING") {
                $button.click();
            }
        });
    }
    _scrollToFinish(callback) {
        let $html = document.querySelector('html');
        let $content = document.querySelector(this.selectors.content);
        $html.scrollTop = $html.scrollHeight;

        let $users = $content.querySelectorAll(this.selectors.userCards);
        let $count = $content.querySelector(this.selectors.content_header);
        let count = $count.innerText.match(/(.+)\s/)[1];

        if ($users.length == count) {
            callback($users);
        } else {
            setTimeout(() => {
                this._scrollToFinish(callback);
            }, 1000);
        }
    }
}