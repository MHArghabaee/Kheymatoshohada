document.addEventListener('DOMContentLoaded', function () {
    const MESSAGE_TYPES = {
        SUCCESS: {
            bgColor: 'bg-[#30471F]',
            icon: `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />`
        },
        ERROR: {
            bgColor: 'bg-[#7F1D1D]',
            icon: `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />`
        }
    };

    let messageCount = 0;
    const messageGap = 16;

    window.showNotification = function (type, text) {
        const template = document.getElementById('message-template');
        if (!template) return;

        const clone = template.content.cloneNode(true);
        const messageElement = clone.querySelector('.message-item');
        const messageContent = clone.querySelector('.message-content');
        const messageIcon = clone.querySelector('.message-icon');
        const messageText = clone.querySelector('.message-text');
        const progressBar = clone.querySelector('.progress-bar');

        const messageType = MESSAGE_TYPES[type];
        messageIcon.innerHTML = messageType.icon;
        messageText.textContent = text;
        messageContent.classList.add(messageType.bgColor);

        document.body.appendChild(clone);
        messageCount++;

        // محاسبه موقعیت
        calculateMessagePosition(messageElement);

        // نمایش پیام
        setTimeout(() => {
            messageElement.classList.remove('opacity-0', '-translate-y-5');
            messageElement.classList.add('opacity-100', 'translate-y-0');

            // شروع انیمیشن نوار پیشرفت
            progressBar.style.transition = 'transform 3s linear';
            progressBar.style.transform = 'scaleX(0)';
        }, 10);

        // حذف خودکار
        const removeMessage = () => {
            messageElement.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateX(-50%) translateY(-20px)';

            setTimeout(() => {
                messageElement.remove();
                messageCount--;
                repositionMessages();
            }, 300);
        };

        setTimeout(removeMessage, 3000);
    };

    function calculateMessagePosition(messageElement) {
        const messages = document.querySelectorAll('.message-item');
        let totalHeight = 0;

        messages.forEach(msg => {
            if (msg !== messageElement) {
                totalHeight += msg.offsetHeight + messageGap;
            }
        });

        messageElement.style.top = `${totalHeight + 20}px`;
    }

    function repositionMessages() {
        const messages = document.querySelectorAll('.message-item');
        let currentTop = 20;

        messages.forEach(msg => {
            msg.style.top = `${currentTop}px`;
            currentTop += msg.offsetHeight + messageGap;
        });
    }
});