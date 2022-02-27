class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            audioButton: document.querySelector('.audio__button'),
            selectLang: document.querySelector('#langs'),
        }
        this.lang = "en-US";
        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton, audioButton, selectLang} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        audioButton.addEventListener('click', () => this.onAudioButton(chatBox))

        selectLang.addEventListener('change', (val) => {
            this.setLang(val.target.value);
        });

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    setLang(value) {
        this.lang = value;
        console.log(this.lang);
    }

    toggleState(chatbox) {
        this.state = !this.state;
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = {name: "User", message: text1}
        this.messages.push(msg1);

        fetch($SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({message: text1, lang: this.lang}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                let msg2 = {name: "Sam", message: r.answer};
                this.messages.push(msg2);
                this.printvideo(msg2.message);
                this.updateChatText(chatbox)
                textField.value = ''

            }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
        });
    }

    onAudioButton(chatbox) {
        fetch($SCRIPT_ROOT + '/audio', {
            method: 'POST',
            body: JSON.stringify({message: null, lang: this.lang}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                let question = {name: "User", message: r.question};
                let response = {name: "Sam", message: r.answer};
                this.messages.push(question);
                this.printvideo(response.message);
                this.messages.push(response);
                this.updateChatText(chatbox);
                textField.value = ''

            }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
        });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item, index) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }

    printvideo(message) {
        var video = document.getElementById('myVideo');
        var source = video.getElementsByTagName('source');
        if (message === "Hi Reda and Said" || message === "bonjour said et reda" || message === " اهلا يا اصدقائي رضا و سعيد " || message === " عليكم السلام يا اصدقائي رضا و سعيد ") {
            source[0].src = "../static/videos/hi.mp4";
            video.muted= !video.muted;
            video.load();
            setTimeout(() => {
                source[0].src = "../static/videos/idle.mp4";
                video.load();
            }, 3000);


        } else if (message === "See you later, thanks for visiting" || message === "Have a nice day" || message === "Bye! Come back again soon." || message === "الى اللقاء" || message === "وداعا" || message === "وداعا عد مجددا" || message === "طاب يومك" || message === "Au revoir" || message === "A dieu" || message === "Prends soin de toi") {
            source[0].src = "../static/videos/bye.mp4";
            video.load();
            setTimeout(() => {
                source[0].src = "../static/videos/end.mp4";
                video.muted = !video.muted;
                video.load();
            }, 3000);
        } else if (message === "من دواعي سروري" || message === "De rien" || message === "My pleasure") {
            source[0].src = "../static/videos/bye.mp4";
            video.load();
            setTimeout(() => {
                source[0].src = "../static/videos/idle.mp4";
                video.load();
            }, 1500);


        } else if (message === "سأل الأستاذ طلابه:هل الثعلب يبيض أم يلد قال الطالب: الثعلب مكّار يا أستاذ أتوقع منه كل شيء" || message === "Comment appelle-t-on un alligator qui enquête? Un investi gator." || message === "Why did the hipster burn his mouth? He drank the coffee before it was cool." || message === "What did the buffalo say when his son left for college? Bison.") {
            source[0].src = "../static/videos/explain.mp4";
            video.load();
            setTimeout(() => {
                source[0].src = "../static/videos/idle.mp4";
                video.load();
            }, 8000);
        } else if (message === "You must have a system privilege to administer the Resource Manager. " || message === "Vous devez disposer d'un privilège système pour administrer le gestionnaire de ressources." || message === "يجب أن يكون لديك احد امتيازات النظام لإدارة إدارة الموارد.") {
            source[0].src = "../static/videos/explain.mp4";
            video.load();
            setTimeout(() => {
                source[0].src = "../static/videos/idle.mp4";
                video.load();
            }, 4000);
        } else if (message === "there are 3 main elements which are: Resource consumer group, Resource plan and Resource plan directives" || message === "Il y a 3 éléments principaux qui sont : le groupe de consommateurs de ressources, le plan de ressources et les directives du plan de ressources" || message === "هناك 3 عناصر رئيسية وهي: مجموعة مستهلكي الموارد وخطة الموارد وتوجيهات خطة الموارد") {
            source[0].src = "../static/videos/explain.mp4";
            video.load();
            setTimeout(() => {
                source[0].src = "../static/videos/idle.mp4";
                video.load();
            }, 10000);
        }
        else if(message==="I did not understand what you said!") {
            source[0].src = "../static/videos/bzz.mp4";
            video.load();
            setTimeout(() => {
                source[0].src = "../static/videos/idle.mp4";
                video.load();
            }, 2000);


        }else {
            source[0].src = "../static/videos/explain.mp4";
            video.load();
            setTimeout(() => {
                source[0].src = "../static/videos/idle.mp4";
                video.load();
            }, 20000);


        }
    }
}

function

decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

const
    chatbox = new Chatbox();
chatbox
    .display();

