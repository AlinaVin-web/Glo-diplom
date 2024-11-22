import { animate } from "./helpers.js";

const documents = () => {
    const docs = document.querySelectorAll('a.sertificate-document');

    try {
        docs.forEach(doc => {
            doc.addEventListener('click', (e) => {
                e.preventDefault();

                const originDoc = document.createElement('div');
                const originImg = document.createElement('img');
                originImg.src = doc.href;
                originImg.alt = doc.href.match(/[^\\\/]*$/)[0];
                originDoc.className = "origin-document";
                originDoc.append(originImg);
                document.body.append(originDoc);

                if (screen.width >= 768) {
                    animate({
                        duration: 150,
                        timing(timeFraction) {
                            return timeFraction;
                        },
                        draw(progress) {
                            originImg.style = `transform: translateY(-${30 - progress * 30}%);`;
                            originDoc.style = `opacity: ${progress};`
                        }
                    });
                }

                originDoc.addEventListener('click', () => {
                    if (screen.width >= 768) {
                        animate({
                            duration: 150,
                            timing(timeFraction) {
                                return timeFraction;
                            },
                            draw(progress) {
                                originImg.style = `transform: translateY(-${progress * 30}%);`;
                                originDoc.style = `opacity: ${1 - progress};`
                            }
                        });
                    }
                    setTimeout(() => originDoc.remove(), 150);
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}

export default documents;