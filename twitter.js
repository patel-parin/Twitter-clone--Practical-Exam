

const tweetInput = document.getElementById('tweetInput');
const postTweetBtn = document.getElementById('postTweetBtn');
const tweetsContainer = document.getElementById('tweetsContainer');


let tweets = JSON.parse(localStorage.getItem('tweets')) || [];

function renderTweets() {
 
  tweetsContainer.innerHTML = '';

  
  tweets.forEach((tweet, index) => {
    const tweetElement = document.createElement('div');
    tweetElement.classList.add('tweet');

   
    tweetElement.innerHTML = `
      <p>${tweet.content}</p>
      <button class="like-btn" data-index="${index}">Like <span class="like-count">${tweet.likes}</span></button>
    `;

   
    tweetsContainer.appendChild(tweetElement);
  });
}

function saveTweets() {
  
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

postTweetBtn.addEventListener('click', () => {
  const tweetContent = tweetInput.value.trim();
  
  if (tweetContent) {
    const newTweet = {
      content: tweetContent,
      likes: 0
    };
    
    
    tweets.unshift(newTweet);
    
   
    saveTweets();
    renderTweets();

   
    tweetInput.value = '';
  }
});


tweetsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('like-btn')) {
    const tweetIndex = event.target.getAttribute('data-index');
    tweets[tweetIndex].likes += 1;  
     saveTweets();
    renderTweets();
  }
});


