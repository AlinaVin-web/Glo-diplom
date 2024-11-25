import { animate } from './helpers.js';
const reviews = (url) => {
    try {
        const container = document.querySelector('#reviews .comments-container');
        const loader = document.querySelector('.review-loading');
        const colors = ['review-green', 'review-gray', 'review-orange'];
        const position = ['review-arrow-left', 'review-arrow-right'];
        let reviewsList = [];
        let firstReview = 0;
        let nextReview = 3;

        const getAvatar = (img) => {
            let avatarHtml = `
                <div class="col-xs-3 col-sm-2">
                    <div class="review-user">
                        <img src="`;
            if (img) avatarHtml += `./images/users/${img}`;
            else avatarHtml += './images/users.png';
            avatarHtml += `" alt="" class="img-responsive avatar">
                    </div>
                </div>`;
            return avatarHtml;
        }
        const getText = (index, name, text) => {
            return `<div class="col-xs-9 col-sm-9">
							<div class="review-inner review-arrow ${colors[(index % 3)]} ${position[(index % 2)]}">
								<p class="text-normal">${name}</p>
								<p>${text}</p>
							</div>
						</div>`;
        }
        const reviewAnimation = (elem) => {
            animate({
                duration: 150,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    elem.style.transform = `scale(${0.9 + progress * 0.1})`;
                }
            });
        }
        const viewReviews = () => {
            loader.remove();
            for (let i = 0; i < nextReview; i++) {
                container.append(reviewsList[i]);
            }
            setInterval(() => {
                reviewsList[firstReview].remove();
                container.append(reviewsList[nextReview]);
                reviewAnimation(reviewsList[nextReview]);
                if (firstReview + 1 >= reviewsList.length) firstReview = 0;
                else firstReview++;
                if (nextReview + 1 >= reviewsList.length) nextReview = 0;
                else nextReview++;
            }, 20000);
        }

        const getReviews = async () => {
            const response = await fetch(url);
            return await response.json();
        }

        getReviews().then(list => {
            list.comments.forEach((review, key) => {
                const elem = document.createElement('div');
                elem.classList = 'row comment-item review-margin-bottom';
                if (key % 2 === 0) {
                    elem.innerHTML = getAvatar(review.image) + getText(key, review.author, review.comment);
                } else {
                    elem.innerHTML = getText(key, review.author, review.comment) + getAvatar(review.image);
                }
                reviewsList[key] = elem;
            });
            viewReviews();
        });
    } catch (error) {
        console.log(error);
    }
}
export default reviews;